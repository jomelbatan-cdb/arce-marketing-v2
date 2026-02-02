import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

/* Base config */
const base = {
  key: process.env.ARCJET_KEY!,
};

/* 🟢 PUBLIC: Products, Categories, Search */
export const ajPublic = arcjet({
  ...base,
  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 120, // 120 req/min
      interval: 60,
      capacity: 200,
    }),
  ],
});

/* 🔴 SENSITIVE: Auth, Cart, Checkout */
export const ajSensitive = arcjet({
  ...base,
  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      deny: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:AI"],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // 10 req/min
      interval: 60,
      capacity: 20,
    }),
  ],
});

/* 🟡 WEBHOOK SAFE: Payments, External APIs */
export const ajWebhookSafe = arcjet({
  ...base,
  rules: [
    shield({ mode: "LIVE" }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 500,
      interval: 60,
      capacity: 1000,
    }),
  ],
});

/* 🛡️ ADMIN: Backoffice, CMS, Order Management */
export const ajAdmin = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      deny: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:AI"],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // 5 requests per minute
      interval: 60,
      capacity: 10, // small burst
    }),
  ],
});
