import jwt from "jsonwebtoken";
export class TokenService {
  private secret = process.env.JWT_SECRET || "supersecret";

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "2h" });
  }
  regenerateRefreshToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "7d" });
  }
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      throw new Error("Token không hợp lệ hoặc đã hết hạn");
    }
  }
}
