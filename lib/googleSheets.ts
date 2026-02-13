
import { google } from 'googleapis';
import { unstable_noStore as noStore } from 'next/cache';

export interface Candidate {
    createdAt?: string;
    id: string;
    role: string;
    location: string;
    experience: string;
    skills: string[];
    bio: string;
    availability: string;
    contractType: string;
    status?: string;
    manatalLink?: string;
    salary?: string;
    age?: string;
    notPreferred?: string;
    travel?: string;
    gender?: string;
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
                range: 'Data_local!A2:S', // Extended to Column S (Index 18)
            });

            const rows = response.data.values;

            if (!rows || rows.length === 0) {
                console.warn('Google Sheets connected but returned no data (Range: Data_local!A2:R).');
                return [];
            }

            console.log(`Successfully fetched ${rows.length} candidates.`);

            // Debug: Log the first row to see if status column is coming through
            if (rows.length > 0) {
                // Column 16 is Web_Status
                // console.log('DEBUG First Row Status (Col 16):', rows[0]?.[16]);
            }

            return rows.map((row) => {
                // Combine Qualification (Col 8) and Language (Col 10) into skills
                const qualification = row[8] ? [row[8].trim()] : [];
                const languages = row[10] ? row[10].split(',').map((s: string) => s.trim()) : [];
                const combinedSkills = [...qualification, ...languages];

                return {
                    createdAt: row[0] || '', // Timestamp
                    id: row[1] || '',        // ID
                    // Fullname (2) and Phone (3) are skipped in this view
                    gender: row[4] || '',
                    location: row[5] || 'Remote',
                    age: row[6] || '',
                    experience: row[7] || 'N/A',
                    // Qualification (8) -> used in skills
                    salary: row[9] || 'Negotiable',
                    // Language (10) -> used in skills
                    availability: row[11] || 'Negotiable',
                    bio: row[12] || '',
                    role: row[13] || 'Open Role',
                    contractType: row[14] || 'Full-time',
                    notPreferred: row[15] || '',
                    travel: row[16] || '',
                    status: row[17] || 'Inactive',
                    manatalLink: row[18] || '', // Column S
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

export interface CandidateFormInput {
    fullName: string;
    phone: string;
    gender: string;
    location: string;
    age: string;
    experience: string;
    qualification: string;
    salary: string;
    languages: string;
    availability: string;
    bio: string;
    role: string;
    contractType: string;
    notPreferred: string;
    travel: string;
    manatalLink: string;
}

export async function addCandidate(data: CandidateFormInput): Promise<{ success: boolean; message: string }> {
    noStore();
    try {
        const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
        const sheetId = process.env.GOOGLE_SHEET_ID;
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        let privateKey = process.env.GOOGLE_PRIVATE_KEY;

        if (privateKey) privateKey = privateKey.replace(/\\n/g, '\n');

        if (!sheetId || !clientEmail || !privateKey) {
            console.error('Missing Google Sheets credentials for addCandidate');
            return { success: false, message: 'Server Configuration Error' };
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: scopes,
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // 1. Get existing data to find the last ID
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Data_local!B:B', // Column B contains IDs now
        });

        const rows = response.data.values || [];

        // Generate new ID
        let newId = 'PPL_INST-0001';
        if (rows.length > 0) { // Check if any rows exist
            const lastRow = rows[rows.length - 1];
            const lastId = lastRow ? lastRow[0] : null; // Safe access
            if (lastId && typeof lastId === 'string' && lastId.startsWith('PPL_INST-')) {
                const parts = lastId.split('-');
                if (parts.length > 1) {
                    const numberPart = parseInt(parts[1] || '0');
                    if (!isNaN(numberPart)) {
                        newId = `PPL_INST-${String(numberPart + 1).padStart(4, '0')}`;
                    }
                }
            }
        }

        const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' });

        // 2. Append new row
        // Structure: Timestamp(0), ID(1), Name(2), Phone(3), Gender(4), Location(5), 
        // Age(6), Exp(7), Qual(8), Salary(9), Lang(10), Avail(11), Bio(12), Role(13), 
        // Contract(14), NotPref(15), Travel(16), Status(17)

        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: 'Data_local!A:S',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: [[
                    timestamp,              // A: Timestamp
                    newId,                  // B: ID
                    data.fullName,          // C: Name
                    data.phone,             // D: Phone
                    data.gender,            // E: Gender
                    data.location,          // F: Location
                    data.age,               // G: Age
                    data.experience,        // H: Experience
                    data.qualification,     // I: Qualification
                    data.salary,            // J: Salary
                    data.languages,         // K: Languages
                    data.availability,      // L: Availability
                    data.bio,               // M: Bio
                    data.role,              // N: Role
                    data.contractType,      // O: Contract Type
                    data.notPreferred,      // P: Not Preferred
                    data.travel,            // Q: Travel
                    'Inactive',             // R: Status (Default Inactive)
                    data.manatalLink        // S: Manatal Link
                ]],
            },
        });

        return { success: true, message: 'Application submitted successfully' };

    } catch (error) {
        console.error("Failed to add candidate:", error);
        return { success: false, message: 'Failed to submit application' };
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
