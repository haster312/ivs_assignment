import { Secret, sign, SignOptions, verify } from "jsonwebtoken";
import variable from "../config/Variable";
type TokenPayload = {
	id: number;
	email: string;
};

const secret: Secret = variable.JWTSecret as Secret;

export function generateToken(payload: TokenPayload) {
	const signInOptions: SignOptions = {
		expiresIn: "24h",
	};

	return sign(payload, secret, signInOptions);
}

export async function validateToken(token: string): Promise<TokenPayload | null> {
	try {
		const payload = verify(token, secret);

		return payload as TokenPayload;
	} catch (e) {
		return null;
	}
}
