import { Request, Response, NextFunction } from "express";
import {
  ajPublic,
  ajSensitive,
  ajWebhookSafe,
  ajAdmin, // ✅ NEW
} from "../config/arcjet";
import { isSpoofedBot } from "@arcjet/inspect";

/* ✅ Route Classifiers */
const ADMIN_ROUTES = ["/api/admin"];

const SENSITIVE_ROUTES = [
  "/api/auth",
  "/api/cart",
  "/api/checkout",
  "/api/orders",
];

const WEBHOOK_ROUTES = ["/api/webhooks"];

function matchesRoute(req: Request, routes: string[]) {
  return routes.some((route) => req.path.startsWith(route));
}

/* ✅ Token Weighting (per request type) */
function getRequestedTokens(req: Request) {
  if (matchesRoute(req, ADMIN_ROUTES)) return 5; // Heavy cost
  if (matchesRoute(req, SENSITIVE_ROUTES)) return 3; // Medium cost
  return 1; // Public
}

export async function arcjetMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let aj = ajPublic;

    if (matchesRoute(req, WEBHOOK_ROUTES)) {
      aj = ajWebhookSafe;
    } else if (matchesRoute(req, ADMIN_ROUTES)) {
      aj = ajAdmin; // ✅ ADMIN OVERRIDE
    } else if (matchesRoute(req, SENSITIVE_ROUTES)) {
      aj = ajSensitive;
    }

    const decision = await aj.protect(req, {
      requested: getRequestedTokens(req),
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too many requests" });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bots not allowed" });
      }

      return res.status(403).json({ error: "Forbidden" });
    }

    if (decision.results?.some?.(isSpoofedBot)) {
      return res.status(403).json({ error: "Spoofed bot detected" });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    return res.status(503).json({ error: "Security service unavailable" });
  }
}
