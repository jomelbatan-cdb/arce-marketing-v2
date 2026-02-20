import cron from "node-cron";
import https from "https";

// URL to ping
const url = process.env.BACKEND_URL!;

// Function to ping the endpoint
export function pingAPI() {
  https
    .get(url, (res) => {
      console.log(
        `Pinged ${url} - status: ${res.statusCode} - ${new Date().toISOString()}`,
      );
    })
    .on("error", (err) => {
      console.error("Ping failed:", err.message);
    });
}

// Cron schedule: every 14 minutes
cron.schedule("0 */14 * * * *", () => {
  pingAPI();
  console.log("Cron triggered ping every 14 minute");
});
