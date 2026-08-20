import "server-only";

import nodemailer from "nodemailer";

// Gmail SMTP. GMAIL_APP_PASSWORD must be a 16-character App Password
// (Google Account → Security → 2-Step Verification → App passwords),
// not the normal account password.
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

let transporter = null;

function getTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;

  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  return transporter;
}

// Wording for each place an OTP is used
const copy = {
  "email-verification": {
    subject: "Verify your Tickify email",
    heading: "Verify your email",
    intro: "Use this code to finish setting up your Tickify account.",
  },
  "sign-in": {
    subject: "Your Tickify sign-in code",
    heading: "Sign in to Tickify",
    intro: "Use this code to sign in. If you didn't try to sign in, you can ignore this email.",
  },
  "forget-password": {
    subject: "Reset your Tickify password",
    heading: "Reset your password",
    intro: "Use this code to choose a new password. If you didn't ask for this, ignore this email.",
  },
  "change-email": {
    subject: "Confirm your new Tickify email",
    heading: "Confirm your new email",
    intro: "Use this code to confirm your new email address.",
  },
};

function buildHtml({ heading, intro, otp, minutes }) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f9fafb;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
            <tr><td style="height:4px;background:linear-gradient(to right,#34d399,#14b8a6,#2563eb);"></td></tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 24px;font-size:20px;font-weight:800;color:#0d9488;">Tickify</p>
                <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#111827;">${heading}</h1>
                <p style="margin:0 0 24px;font-size:14px;line-height:22px;color:#6b7280;">${intro}</p>
                <div style="padding:20px;background:#f0fdfa;border:1px solid #99f6e4;border-radius:12px;text-align:center;">
                  <span style="font-size:34px;font-weight:800;letter-spacing:10px;color:#0f766e;">${otp}</span>
                </div>
                <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">
                  This code expires in ${minutes} minutes. Never share it with anyone —
                  Tickify staff will never ask you for it.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; Tickify — ticket booking for buses, trains, launches and flights.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Sends a one-time code. Falls back to logging the code on the server when
// Gmail credentials are missing, so local development still works.
export async function sendOtpEmail({ email, otp, type, expiresInSeconds = 300 }) {
  const text = copy[type] ?? copy["email-verification"];
  const minutes = Math.max(1, Math.round(expiresInSeconds / 60));
  const mail = getTransporter();

  if (!mail) {
    console.warn(
      `[email] GMAIL_USER / GMAIL_APP_PASSWORD not set — OTP for ${email} (${type}): ${otp}`,
    );
    return;
  }

  try {
    await mail.sendMail({
      from: `Tickify <${GMAIL_USER}>`,
      to: email,
      subject: text.subject,
      text: `${text.heading}\n\n${text.intro}\n\nYour code: ${otp}\n\nThis code expires in ${minutes} minutes.`,
      html: buildHtml({ heading: text.heading, intro: text.intro, otp, minutes }),
    });
  } catch (err) {
    // Never leak SMTP internals to the caller — the auth endpoints answer the
    // same way whether or not the address exists.
    console.error("[email] Failed to send OTP:", err.message);
  }
}
