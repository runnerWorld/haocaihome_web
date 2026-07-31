import { createHash, createSign, createVerify } from "crypto";

const WAFFO_API_BASE_URL = "https://api.waffo.ai";

type WaffoApiResponse<T> = {
  data?: T | null;
  errors?: Array<{ message?: string; layer?: string }>;
};

type WaffoCheckoutSession = {
  sessionId: string;
  checkoutUrl: string;
  expiresAt: string;
};

type WaffoCheckoutInput = {
  productId: string;
  currency: string;
  productType?: "onetime" | "subscription";
  buyerEmail?: string;
  successUrl?: string;
  metadata?: Record<string, string | number | boolean | null>;
  orderMerchantExternalId?: string;
  priceSnapshot?: {
    amount: string;
    taxIncluded: boolean;
    taxCategory: string;
  };
  language?: string;
  darkMode?: boolean;
};

function getPrivateKey() {
  if (process.env.WAFFO_PRIVATE_KEY_BASE64) {
    return Buffer.from(process.env.WAFFO_PRIVATE_KEY_BASE64, "base64").toString("utf-8");
  }

  return process.env.WAFFO_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

async function parseWaffoResponse<T>(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as WaffoApiResponse<T>;

  if (!response.ok || !payload.data) {
    const message = payload.errors?.map((error) => error.message).filter(Boolean).join("; ");
    throw new Error(message || `Waffo request failed with status ${response.status}`);
  }

  return payload.data;
}

async function signedWaffoRequest<T>(path: string, body: unknown) {
  const merchantId = process.env.WAFFO_MERCHANT_ID;
  const privateKey = getPrivateKey();

  if (!merchantId || !privateKey) {
    throw new Error("Missing WAFFO_MERCHANT_ID or WAFFO_PRIVATE_KEY");
  }

  const bodyString = JSON.stringify(body);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const bodyHash = createHash("sha256").update(bodyString).digest("base64");
  const canonicalRequest = `POST\n${path}\n${timestamp}\n${bodyHash}`;
  const signature = createSign("sha256").update(canonicalRequest).sign(privateKey, "base64");

  const response = await fetch(`${WAFFO_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Merchant-Id": merchantId,
      "X-Timestamp": timestamp,
      "X-Signature": signature,
    },
    body: bodyString,
  });

  return parseWaffoResponse<T>(response);
}

async function storeSlugWaffoRequest<T>(path: string, body: unknown) {
  const storeSlug = process.env.WAFFO_STORE_SLUG;
  const environment = process.env.WAFFO_ENVIRONMENT || "test";

  if (!storeSlug) {
    throw new Error("Missing WAFFO_STORE_SLUG");
  }

  const response = await fetch(`${WAFFO_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Store-Slug": storeSlug,
      "X-Environment": environment,
    },
    body: JSON.stringify(body),
  });

  return parseWaffoResponse<T>(response);
}

export async function createWaffoCheckoutSession(input: WaffoCheckoutInput) {
  const path = "/v1/actions/checkout/create-session";
  const canUseApiKey = Boolean(process.env.WAFFO_MERCHANT_ID && getPrivateKey());

  if (canUseApiKey) {
    return signedWaffoRequest<WaffoCheckoutSession>(path, input);
  }

  const publicInput = {
    productId: input.productId,
    currency: input.currency,
    productType: input.productType,
    buyerEmail: input.buyerEmail,
    billingDetail: undefined,
    successUrl: input.successUrl,
    darkMode: input.darkMode,
    language: input.language,
  };

  return storeSlugWaffoRequest<WaffoCheckoutSession>(path, publicInput);
}

function parseSignatureHeader(header: string) {
  return Object.fromEntries(
    header
      .split(",")
      .map((pair) => pair.split("="))
      .filter(([key, value]) => key && value)
      .map(([key, ...value]) => [key.trim(), value.join("=").trim()]),
  );
}

export function verifyWaffoWebhook(rawBody: string, signatureHeader: string) {
  const publicKey = process.env.WAFFO_WEBHOOK_PUBLIC_KEY?.replace(/\\n/g, "\n");
  if (!publicKey) {
    throw new Error("Missing WAFFO_WEBHOOK_PUBLIC_KEY");
  }

  const { t, v1 } = parseSignatureHeader(signatureHeader);
  if (!t || !v1) {
    return false;
  }

  const toleranceMs = 5 * 60 * 1000;
  if (Math.abs(Date.now() - Number(t)) > toleranceMs) {
    return false;
  }

  const verifier = createVerify("RSA-SHA256");
  verifier.update(`${t}.${rawBody}`);
  return verifier.verify(publicKey, v1, "base64");
}
