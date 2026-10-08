/**
 * One-time script to get a Google OAuth2 Refresh Token.
 * 
 * Prerequisites:
 *   1. Go to Google Cloud Console → APIs & Services → Credentials
 *   2. Create an OAuth 2.0 Client ID (type: Web application)
 *   3. Add "http://localhost:3333/callback" as an Authorized Redirect URI
 *   4. Copy the Client ID and Client Secret
 * 
 * Usage:
 *   node scripts/get-refresh-token.js YOUR_CLIENT_ID YOUR_CLIENT_SECRET
 */

const http = require("http");
const { URL } = require("url");

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];
const REDIRECT_URI = "http://localhost:3333/callback";
const SCOPES = "https://www.googleapis.com/auth/drive";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("\n❌ Usage: node scripts/get-refresh-token.js <CLIENT_ID> <CLIENT_SECRET>\n");
  console.error("Get these from: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs\n");
  process.exit(1);
}

// Step 1: Generate the authorization URL
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&access_type=offline` +
  `&prompt=consent`;

console.log("\n🔗 Open this URL in your browser to authorize:\n");
console.log(authUrl);
console.log("\n⏳ Waiting for authorization callback on http://localhost:3333 ...\n");

// Step 2: Start a local server to catch the callback
const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, "http://localhost:3333");

  if (reqUrl.pathname === "/callback") {
    const code = reqUrl.searchParams.get("code");
    const error = reqUrl.searchParams.get("error");

    if (error) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end(`<h1>Error: ${error}</h1><p>Please try again.</p>`);
      console.error(`\n❌ Authorization failed: ${error}`);
      server.close();
      process.exit(1);
      return;
    }

    if (!code) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("<h1>No authorization code received</h1>");
      return;
    }

    // Step 3: Exchange authorization code for tokens
    try {
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(`<h1>Token Error: ${tokenData.error}</h1><p>${tokenData.error_description}</p>`);
        console.error(`\n❌ Token exchange failed: ${tokenData.error_description}`);
        server.close();
        process.exit(1);
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>✅ Success!</h1><p>You can close this window. Check your terminal for the refresh token.</p>");

      console.log("✅ Authorization successful!\n");
      console.log("=".repeat(60));
      console.log("Add these to your .env.local file:");
      console.log("=".repeat(60));
      console.log(`\nGOOGLE_CLIENT_ID=${CLIENT_ID}`);
      console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`);
      console.log(`GOOGLE_REFRESH_TOKEN=${tokenData.refresh_token}`);
      console.log("\n" + "=".repeat(60));

      server.close();
      process.exit(0);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`<h1>Error exchanging code</h1><p>${err.message}</p>`);
      console.error(`\n❌ Error: ${err.message}`);
      server.close();
      process.exit(1);
    }
  }
});

server.listen(3333, () => {
  // Try to open the URL in the default browser
  const { exec } = require("child_process");
  exec(`start "" "${authUrl}"`);
});
