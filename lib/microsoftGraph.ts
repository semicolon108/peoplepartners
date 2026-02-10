
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';

/**
 * Interface for email data
 */
interface EmailData {
    to: string;
    subject: string;
    body: string;
    replyTo?: string;
}

/**
 * Get an access token for Microsoft Graph API using Client Credentials Flow
 */
async function getAccessToken(): Promise<string> {
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;

    if (!tenantId || !clientId || !clientSecret) {
        throw new Error('Azure App Registration credentials (AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET) are missing.');
    }

    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('scope', 'https://graph.microsoft.com/.default');
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'client_credentials');

    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            body: params,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch access token: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

/**
 * Send an email using Microsoft Graph API
 */
export async function sendEmailGraph(emailData: EmailData): Promise<void> {
    try {
        const accessToken = await getAccessToken();
        const senderEmail = process.env.AZURE_SENDER_EMAIL || process.env.SMTP_USER; // Fallback for backward compatibility

        if (!senderEmail) {
            throw new Error('Sender email (AZURE_SENDER_EMAIL) is not configured.');
        }

        const client = Client.init({
            authProvider: (done: (error: Error | null, accessToken: string | null) => void) => {
                done(null, accessToken);
            },
        });

        const sendMail = {
            message: {
                subject: emailData.subject,
                body: {
                    contentType: 'HTML',
                    content: emailData.body,
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: emailData.to,
                        },
                    },
                ],
                // Add Reply-To if provided
                ...(emailData.replyTo && {
                    replyTo: [
                        {
                            emailAddress: {
                                address: emailData.replyTo,
                            },
                        },
                    ],
                }),
            },
            saveToSentItems: false,
        };

        // Send the email on behalf of the user
        await client.api(`/users/${senderEmail}/sendMail`)
            .post(sendMail);

        console.log(`Email sent successfully via Microsoft Graph API to ${emailData.to}`);

    } catch (error: any) {
        console.error('Error sending email via Microsoft Graph:', error);

        // Enhance error message if it's a permission issue
        if (error.statusCode === 403 || (error.body && error.body.code === 'ErrorAccessDenied')) {
            console.error('⚠️ PERMISSION ERROR: The App Registration needs "Mail.Send" Application Permission granted by Admin.');
        }

        throw error;
    }
}
