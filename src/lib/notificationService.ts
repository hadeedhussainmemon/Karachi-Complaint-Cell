export async function sendEmailNotification(to: string, subject: string, body: string) {
  // Simulate sending an email (To be replaced with Nodemailer/Resend in production)
  console.log(`\n=========================================`);
  console.log(`📧 [EMAIL NOTIFICATION TRIGGERED]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: \n${body}`);
  console.log(`=========================================\n`);
  return true;
}

export async function sendSMSNotification(phone: string, message: string) {
  // Simulate sending an SMS (To be replaced with Twilio or PK SMS Gateway)
  console.log(`\n=========================================`);
  console.log(`📱 [SMS NOTIFICATION TRIGGERED]`);
  console.log(`Phone: ${phone}`);
  console.log(`Text: ${message}`);
  console.log(`=========================================\n`);
  return true;
}
