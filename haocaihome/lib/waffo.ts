import {
  type AuthenticatedCheckoutParams,
  type CashierLanguage,
  TaxCategory,
  WaffoPancake,
  verifyWebhook,
} from "@waffo/pancake-ts";

function getPrivateKey() {
  if (process.env.WAFFO_PRIVATE_KEY_BASE64) {
    return toPemPrivateKey(process.env.WAFFO_PRIVATE_KEY_BASE64);
  }

  const privateKey = process.env.WAFFO_PRIVATE_KEY?.replace(/\\n/g, "\n");
  return privateKey ? toPemPrivateKey(privateKey) : undefined;
}

function toPemPrivateKey(value: string) {
  if (value.includes("-----BEGIN")) {
    return value;
  }

  const keyBody = value.replace(/^"|"$/g, "").replace(/\s+/g, "");
  const wrappedKey = keyBody.match(/.{1,64}/g)?.join("\n") || keyBody;
  return `-----BEGIN PRIVATE KEY-----\n${wrappedKey}\n-----END PRIVATE KEY-----`;
}

export function getWaffoClient() {
  const merchantId = process.env.WAFFO_MERCHANT_ID;
  const privateKey = getPrivateKey();

  if (!merchantId || !privateKey) {
    throw new Error("Missing WAFFO_MERCHANT_ID or WAFFO_PRIVATE_KEY");
  }

  return new WaffoPancake({
    merchantId,
    privateKey,
    webhookPublicKey: process.env.WAFFO_WEBHOOK_PUBLIC_KEY?.replace(/\\n/g, "\n"),
  });
}

export async function createWaffoCheckout(input: AuthenticatedCheckoutParams) {
  return getWaffoClient().checkout.authenticated.create(input);
}

export function getWaffoCheckoutLanguage() {
  return (process.env.WAFFO_CHECKOUT_LANGUAGE || "zh-Hans") as CashierLanguage;
}

export function getWaffoTaxCategory() {
  return (process.env.WAFFO_TAX_CATEGORY || TaxCategory.ProfessionalService) as TaxCategory;
}

export function verifyWaffoWebhook(rawBody: string, signatureHeader: string | null) {
  return verifyWebhook(rawBody, signatureHeader, {
    environment: process.env.WAFFO_ENVIRONMENT === "prod" ? "prod" : "test",
    publicKey: process.env.WAFFO_WEBHOOK_PUBLIC_KEY?.replace(/\\n/g, "\n"),
  });
}
