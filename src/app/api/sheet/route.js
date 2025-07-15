import { google } from 'googleapis';

export async function POST(req) {
    try {
        const { name, email, message } = await req.json()

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_EMAIL,
                private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATEKEY?.replace(/\\n/g, "\n"),
            },
            scopes: [
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets"
            ]
        });

        const sheets = google.sheets({
            auth,
            version: "v4"
        });

        const timestamp = new Date().toLocaleString("en-CA", { month: 'short', day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
            range: "A1:D1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [name, email, message, timestamp]
                ]
            }
        });

        console.log('response?.data', response?.data)

        return Response.json({ success: true, message: 'Query submit successfully' });
    } catch (err) {
        console.log('err', err);
        return Response.json({ success: false, message: 'Failed to submit query!' });
    }
}
