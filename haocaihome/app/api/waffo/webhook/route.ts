import { NextResponse } from "next/server";
import { verifyWaffoWebhook } from "@/lib/waffo";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("x-waffo-signature");
  const rawBody = await request.text();

  if (!signature || !verifyWaffoWebhook(rawBody, signature)) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody) as {
    id: string;
    eventType: string;
    data?: {
      orderId?: string;
      orderMerchantExternalId?: string;
      buyerEmail?: string;
      amount?: string;
      currency?: string;
    };
  };

  console.log("Waffo webhook received", {
    id: event.id,
    eventType: event.eventType,
    orderId: event.data?.orderId,
    externalOrderId: event.data?.orderMerchantExternalId,
    buyerEmail: event.data?.buyerEmail,
    amount: event.data?.amount,
    currency: event.data?.currency,
  });

  return NextResponse.json({ received: true });
}
