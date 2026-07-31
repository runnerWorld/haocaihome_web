import { NextResponse } from "next/server";
import { createWaffoCheckoutSession } from "@/lib/waffo";

export const runtime = "nodejs";

type CheckoutRequest = {
  orderId?: string;
  customer?: {
    name?: string;
    email?: string;
    address?: string;
    note?: string;
  };
  design?: {
    id?: string;
    intention?: string;
    theme?: string;
    size?: string;
    beadCount?: number;
    price?: number;
    pattern?: string[];
  };
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const productId = process.env.WAFFO_PRODUCT_ID;
    const currency = process.env.WAFFO_CURRENCY || "USD";
    const productType = process.env.WAFFO_PRODUCT_TYPE === "subscription" ? "subscription" : "onetime";

    if (!productId) {
      return NextResponse.json({ error: "Missing WAFFO_PRODUCT_ID" }, { status: 500 });
    }

    const body = (await request.json().catch(() => null)) as CheckoutRequest | null;
    if (!body?.design || !body.customer) {
      return NextResponse.json({ error: "Missing checkout details" }, { status: 400 });
    }

    const email = cleanString(body.customer.email).toLowerCase();
    const name = cleanString(body.customer.name);
    const address = cleanString(body.customer.address);
    const note = cleanString(body.customer.note);
    const orderId = cleanString(body.orderId) || `order-${Date.now()}`;

    if (!name || !email || !address) {
      return NextResponse.json({ error: "Name, email, and address are required" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const successUrl = `${siteUrl}/crystal-necklace-builder/checkout/success?order=${encodeURIComponent(orderId)}`;
    const usePriceSnapshot = process.env.WAFFO_USE_PRICE_SNAPSHOT === "true";

    const session = await createWaffoCheckoutSession({
      productId,
      productType,
      currency,
      buyerEmail: email,
      successUrl,
      language: process.env.WAFFO_CHECKOUT_LANGUAGE || "zh-Hans",
      darkMode: false,
      orderMerchantExternalId: orderId,
      metadata: {
        orderId,
        designId: cleanString(body.design.id),
        customerName: name,
        shippingAddress: address,
        note,
        theme: cleanString(body.design.theme),
        intention: cleanString(body.design.intention),
        size: cleanString(body.design.size),
        beadCount: body.design.beadCount || 0,
        pattern: body.design.pattern?.join(" / ") || "",
      },
      priceSnapshot: usePriceSnapshot
        ? {
            amount: Number(body.design.price || 0).toFixed(2),
            taxIncluded: process.env.WAFFO_TAX_INCLUDED !== "false",
            taxCategory: process.env.WAFFO_TAX_CATEGORY || "professional_service",
          }
        : undefined,
    });

    return NextResponse.json({
      orderId,
      sessionId: session.sessionId,
      checkoutUrl: session.checkoutUrl,
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create Waffo checkout session" },
      { status: 502 },
    );
  }
}
