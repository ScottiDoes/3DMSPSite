import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string;
  message?: string;
  // Honeypot — bots fill this, humans never see it.
  company?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: silently accept and drop obvious bot submissions.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const status = (body.status ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!firstName || !email) {
    return NextResponse.json(
      { error: "First name and email are required." },
      { status: 400 }
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: missing SMTP environment variables.");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE !== "false", // true for 465, false for 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const to = CONTACT_TO || SMTP_USER;

  const lines = [
    `Name:    ${fullName}`,
    `Email:   ${email}`,
    status ? `Status:  ${status}` : null,
    "",
    "Message:",
    message || "(none provided)",
  ].filter((l) => l !== null);

  try {
    await transporter.sendMail({
      from: `"NJEP Website" <${SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `New discovery call request — ${fullName}`,
      text: lines.join("\n"),
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a2e;">
          <h2 style="margin: 0 0 12px;">New discovery call request</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${status ? `<p><strong>NinjaOne status:</strong> ${escapeHtml(status)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message) || "(none provided)"}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Contact form: failed to send email.", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
