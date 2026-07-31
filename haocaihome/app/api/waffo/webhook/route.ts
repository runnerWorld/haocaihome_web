import { NextResponse } from "next/server";
import { verifyWaffoWebhook } from "@/lib/waffo";
import { WebhookEventType } from "@waffo/pancake-ts";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("x-waffo-signature");
  const rawBody = await request.text();

  try {
    const event = verifyWaffoWebhook(rawBody, signature);

    switch (event.eventType) {
      case WebhookEventType.OrderCompleted:
      case WebhookEventType.SubscriptionActivated:
      case WebhookEventType.SubscriptionCanceled:
        console.log("Waffo webhook received", {
          id: event.id,
          eventType: event.eventType,
          eventId: event.eventId,
          storeId: event.storeId,
          mode: event.mode,
          data: event.data,
        });
        break;
      default:
        console.log("Waffo webhook ignored", {
          id: event.id,
          eventType: event.eventType,
        });
    }

    return NextResponse.json({ received: true });
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }
}
