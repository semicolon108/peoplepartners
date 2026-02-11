
import { google } from 'googleapis';
import { unstable_noStore as noStore } from 'next/cache';

export interface Candidate {
    id: string;
    role: string;
    location: string;
    experience: string;
    skills: string[];
    bio: string;
    availability: string;
    contractType: string;
    status?: string;
    salary?: string;
    age?: string;
    notPreferred?: string;
    travel?: string;
}

export async function getCandidates(): Promise<Candidate[]> {
    noStore(); // Opt out of static generation and caching
    try {
        const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
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
        // console.log(`Key length: ${privateKey.length}. Starts with valid header: ${privateKey.startsWith('-----BEGIN PRIVATE KEY-----')}`);

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
                range: 'Data!A2:R', // Extended to Column R (Index 17)
            });

            const rows = response.data.values;

            if (!rows || rows.length === 0) {
                console.warn('Google Sheets connected but returned no data (Range: Sheet1!A2:R).');
                return [];
            }

            console.log(`Successfully fetched ${rows.length} candidates.`);

            // Debug: Log the first row to see if status column is coming through
            if (rows.length > 0) {
                // Column 16 is Web_Status
                // console.log('DEBUG First Row Status (Col 16):', rows[0]?.[16]);
            }

            return rows.map((row) => {
                // Combine Qualification (Col 7) and Language (Col 9) into skills
                const qualification = row[7] ? [row[7].trim()] : [];
                const languages = row[9] ? row[9].split(',').map((s: string) => s.trim()) : [];
                const combinedSkills = [...qualification, ...languages];

                return {
                    id: row[0] || '',
                    // Fullname (1) and Phone (2) are skipped
                    gender: row[3] || '',
                    location: row[4] || 'Remote',
                    age: row[5] || '',
                    experience: row[6] || 'N/A',
                    // Qualification (7) -> used in skills
                    salary: row[8] || 'Negotiable',
                    // Language (9) -> used in skills
                    availability: row[10] || 'Negotiable',
                    bio: row[11] || '',
                    role: row[12] || 'Open Role',
                    contractType: row[13] || 'Full-time',
                    notPreferred: row[14] || '',
                    travel: row[15] || '',
                    status: row[16] || 'Inactive',
                    skills: combinedSkills,
                };
            })
                .filter(candidate => candidate.id && candidate.role)
                .filter(candidate => candidate.status?.trim().toLowerCase() === 'active'); // Only show Active candidates

        } catch (apiError: any) {
            if (apiError.code === 403) {
                console.error('PERMISSION ERROR (403): The Service Account does not have access to this Sheet.');
                console.error(`ACTION REQUIRED: Go to your Google Sheet > Share > Add "${clientEmail}" as Viewer/Editor.`);
            } else if (apiError.code === 404) {
                console.error('NOT FOUND ERROR (404): The Spreadsheet ID is incorrect.');
                console.error(`ACTION REQUIRED: Check GOOGLE_SHEET_ID in .env.local.`);
            }
            console.error('API ERROR fetching candidates:', apiError);
            throw apiError; // Re-throw to be caught by outer catch
        }

    } catch (error: any) {
        if (error.reason === 'unsupported' || error.code === 'ERR_OSSL_UNSUPPORTED') {
            console.error('CRITICAL SSL ERROR: The Private Key format is invalid.');
            console.error('ACTION REQUIRED: Ensure the GOOGLE_PRIVATE_KEY in .env.local is ONE SINGLE LINE wrapped in quotes, with \\n for newlines.');
            console.error('Example: GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIEv...\\n-----END PRIVATE KEY-----"');
        } else {
            console.error('CRITICAL ERROR inside getCandidates:', error);
        }
        return [];

    }
}

export async function appendRequest(data: {
    name: string;
    email: string;
    company: string;
    service: string;
    message: string;
}) {
    try {
        const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
        const sheetId = process.env.GOOGLE_SHEET_ID;
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        let privateKey = process.env.GOOGLE_PRIVATE_KEY;

        if (privateKey) privateKey = privateKey.replace(/\\n/g, '\n');

        if (!sheetId || !clientEmail || !privateKey) {
            console.error('Missing Google Sheets credentials for appendRequest');
            return;
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: scopes,
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const date = "'" + new Date().toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' });

        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: 'Requests!A:F',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: [
                    [date, data.name, data.email, data.company, data.service, data.message]
                ],
            },
        });
        console.log("Request saved to Google Sheets successfully.");

    } catch (error) {
        console.error("Failed to save request to Google Sheets:", error);
    }
}
