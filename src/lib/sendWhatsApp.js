import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., 'whatsapp:+14155238886'

export async function sendWhatsAppMessage(to, message) {
    if (!accountSid || !authToken || !fromNumber) {
        console.warn('Twilio credentials missing. WhatsApp message not sent.');
        return { success: false, error: 'Twilio credentials missing' };
    }

    if (!accountSid.startsWith('AC')) {
        console.warn('Invalid Twilio Account SID. WhatsApp message not sent.');
        return { success: false, error: 'Invalid Twilio Account SID' };
    }

    try {
        const client = twilio(accountSid, authToken);
        
        // Ensure 'to' number has 'whatsapp:' prefix
        const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

        const result = await client.messages.create({
            body: message,
            from: fromNumber,
            to: formattedTo
        });

        console.log('WhatsApp message sent:', result.sid);
        return { success: true, sid: result.sid };
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return { success: false, error: error.message };
    }
}