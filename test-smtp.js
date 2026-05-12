
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

async function testSMTP() {
  console.log("🚀 Testing SMTP connection...");
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Vérifier la connexion
    await transporter.verify();
    console.log("✅ SMTP connection verified!");

    // Envoyer un mail de test
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.SMTP_USER, // S'envoyer un mail à soi-même
      subject: "Test SMTP - Site Vitrine",
      text: "Ceci est un test de la configuration SMTP.",
      html: "<b>Ceci est un test de la configuration SMTP.</b>",
    });

    console.log("✅ Test email sent: %s", info.messageId);
    process.exit(0);
  } catch (error) {
    console.error("❌ SMTP test failed:", error);
    process.exit(1);
  }
}

testSMTP();
