import crypto from "node:crypto";

export class JsonWebToken {
  static base64UrlEncode(val) {
    return btoa(val);
  }

  static base64UrlDecode(val) {
    return atob(val);
  }

  static generateToken(algorithm, payload, secret) {
    const header = {
      alg: algorithm,
      typ: "JWT",
    };

    const header64 = this.base64UrlEncode(JSON.stringify(header));

    const payload64 = this.base64UrlEncode(JSON.stringify(payload)).split(
      "="
    )[0];
    const signiture64 = this.generateSigniture(header64, payload64, secret);
    return header64 + "." + payload64 + "." + signiture64;
  }

  static generateSigniture(header, payload, secret) {
    return crypto
      .createHmac("sha256", secret)
      .update(header + "." + payload)
      .digest("base64url")
      .split("=")[0];
  }
  static verify(token, secret) {
    const [header, payload, signiture] = token.split(".");
    if (signiture === this.generateSigniture(header, payload, secret)) {
      return true;
    } else {
      return false;
    }
  }

  static extractToken(request) {
    return request.headers.get("Authorization").split(" ")[1];
  }
  static extractUserID(token) {
    return JSON.parse(this.base64UrlDecode(token.split(".")[1])).user_id;
  }
}
