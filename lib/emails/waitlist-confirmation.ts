export function waitlistConfirmationHtml(): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>You're on the PlainCost waitlist</title>
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 24px;">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="width:40px;height:40px;background:#059669;border-radius:10px;text-align:center;vertical-align:middle;color:#ffffff;font-weight:700;font-size:16px;">
                      PC
                    </td>
                    <td style="padding-left:12px;font-size:18px;font-weight:700;color:#0f172a;">
                      PlainCost Insights
                    </td>
                  </tr>
                </table>
                <h1 style="margin:24px 0 12px;font-size:24px;line-height:1.3;color:#0f172a;">
                  You're on the waitlist
                </h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#475569;">
                  Thanks for joining. We'll email you when your early-access spot opens.
                </p>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#475569;">
                  When invited, you'll connect your AWS account with read-only access — a quick, guided setup — and receive your first plain-English cost report based on your actual billing data.
                </p>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#475569;">
                  After that, PlainCost sends weekly reports showing what you spent, what changed, and where you can save.
                </p>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#64748b;">
                  No spam. Unsubscribe anytime by replying to this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;border-top:1px solid #e2e8f0;background:#f8fafc;">
                <p style="margin:0;font-size:13px;line-height:1.5;color:#94a3b8;">
                  PlainCost Insights · <a href="https://plaincost.ai" style="color:#047857;text-decoration:none;">plaincost.ai</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export function waitlistConfirmationText(): string {
  return [
    "You're on the PlainCost waitlist.",
    "",
    "Thanks for joining. We'll email you when your early-access spot opens.",
    "",
    "When invited, you'll connect your AWS account with read-only access — a quick, guided setup — and receive your first plain-English cost report based on your actual billing data.",
    "",
    "After that, PlainCost sends weekly reports showing what you spent, what changed, and where you can save.",
    "",
    "No spam. Unsubscribe anytime by replying to this email.",
    "",
    "https://plaincost.ai",
  ].join("\n");
}