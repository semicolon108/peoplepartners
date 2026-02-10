
import { google } from 'googleapis';

export interface Candidate {
    id: string;
    role: string;
    location: string; // e.g., "Vientiane, Laos"
    experience: string; // e.g., "5+ Years"
    skills: string[]; // e.g., ["Project Management", "React", "Accounting"]
    bio: string; // Short professional summary
    availability: string; // e.g., "Immediate", "2 Weeks Notice"
    contractType: string; // e.g., "Full-time", "Contract"
}

// ... (imports remain)

// ... (imports remain)

// ... (imports remain)

export async function getCandidates(): Promise<Candidate[]> {
    try {
        const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        const sheetId = process.env.GOOGLE_SHEET_ID;
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

        // Robust key cleaning
        let privateKey = process.env.GOOGLE_PRIVATE_KEY;
        if (privateKey) {
            // Handle both literal \n characters and actual newlines
            privateKey = privateKey.replace(/\\n/g, '\n');

            // Ensure compatibility with GoogleAuth
            if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
                console.warn('WARNING: Private Key does not start with "-----BEGIN PRIVATE KEY-----". Check your .env.local file.');
            }
        }

        if (!sheetId || !clientEmail || !privateKey) {
            console.error('SERVER ERROR: Google Sheets credentials are missing in .env.local');
            return [];
        }

        // Debug log (masked)
        console.log(`Attempting to connect with Email: ${clientEmail.slice(0, 5)}...`);
        console.log(`Key length: ${privateKey.length}. Starts with valid header: ${privateKey.startsWith('-----BEGIN PRIVATE KEY-----')}`);

        // Use GoogleAuth for better compatibility
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: scopes,
        });

        const sheets = google.sheets({ version: 'v4', auth });

        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: sheetId,
                range: 'Sheet1!A2:H',
            });

            const rows = response.data.values;

            if (!rows || rows.length === 0) {
                console.warn('Google Sheets connected but returned no data (Range: Sheet1!A2:H).');
                return [];
            }

            console.log(`Successfully fetched ${rows.length} candidates.`);

            return rows.map((row) => ({
                id: row[0] || '',
                role: row[1] || 'Open Role',
                location: row[2] || 'Remote',
                experience: row[3] || 'N/A',
                skills: row[4] ? row[4].split(',').map((s: string) => s.trim()) : [],
                bio: row[5] || '',
                availability: row[6] || 'Negotiable',
                contractType: row[7] || 'Full-time',
            })).filter(candidate => candidate.id && candidate.role);

        } catch (apiError: any) {
            if (apiError.code === 403) {
                console.error('PERMISSION ERROR (403): The Service Account does not have access to this Sheet.');
                console.error(`ACTION REQUIRED: Go to your Google Sheet > Share > Add "${clientEmail}" as Viewer.`);
            } else if (apiError.code === 404) {
                console.error('NOT FOUND ERROR (404): The Spreadsheet ID is incorrect.');
                console.error(`ACTION REQUIRED: Check GOOGLE_SHEET_ID in .env.local.`);
            }
            throw apiError; // Re-throw to be caught by outer catch
        }

    } catch (error: any) {
        if (error.reason === 'unsupported' || error.code === 'ERR_OSSL_UNSUPPORTED') {
            console.error('CRITICAL SSL ERROR: The Private Key format is invalid.');
            console.error('ACTION REQUIRED: Ensure the GOOGLE_PRIVATE_KEY in .env.local is ONE SINGLE LINE wrapped in quotes, with \\n for newlines.');
            console.error('Example: GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIEv...\\n-----END PRIVATE KEY-----"');
        } else {
            console.error('CRITICAL ERROR fetching candidates from Google Sheets:', error);
        }
        return [];
    }
}
