import * as crypto from "crypto";
const { app_id, secret_key, api_endpoint, redirect_url } = process.env;
class AeonPayService {
  static generateSignature(data: Record<string, string>, key: string): string {
    // Convert data to query string format
    const sortedKeys = Object.keys(data).sort();
    const queryString = sortedKeys.map((k) => `${k}=${data[k]}`).join("&");

    // Append the secret key
    const queryStringWithKey = `${queryString}&key=${key}`;

    // Generate SHA-512 hash
    const signature = crypto
      .createHash("sha512")
      .update(queryStringWithKey, "utf8")
      .digest("hex")
      .toUpperCase();

    return signature;
  }

  static async createOrder(userId: string, amount: string, orderNo?: string) {
    if (!orderNo) {
      orderNo = this.randomOrderNo();
    }
    if (!app_id || !secret_key || !api_endpoint || !redirect_url) {
      console.error("Missing environment variables");
      return null;
    }
    const data: Record<string, string> = {
      appId: app_id as string,
      merchantOrderNo: orderNo,
      orderAmount: amount,
      payCurrency: "USD",
      paymentExchange:
        "16f021b0-f220-4bbb-aa3b-82d423301957,47624467-e52e-4938-a41a-7926b6c27acf,9226e5c2-ebc3-4fdd-94f6-ed52cdce1420",
      paymentTokens: "USDT",
      userId: userId,
    };
    const signature = this.generateSignature(data, secret_key as string);
    data["sign"] = signature;
    data["orderModel"] = "ORDER";
    data["expiredTime"] = "60";
    data["redirectURL"] = (redirect_url as string) + "/wallet";
    data["callbackURL"] = (redirect_url as string) + "/wallet";
    // console.log(
    //   { amount: amount, userId: userId , orderNo: orderNo},
    //   "AeonPayService.createOrder"
    // );
    try {
      const response = await fetch(`${api_endpoint}/open/api/payment/V2`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static randomOrderNo() {
    return Math.random().toString(36).substring(7);
  }
}

export default AeonPayService;
