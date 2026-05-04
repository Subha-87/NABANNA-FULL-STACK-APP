import jwt from "jsonwebtoken";
import { SignJWT, jwtVerify } from "jose"; // jose library for JWT verification is edge-compatible//

//const JWT_SECRET = process.env.JWT_SECRET || "subhajit_ae";
const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);

// Sign a JWT with session ID //

export function encrypt(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });  // Set JWT Token Expirty  Seperatly (Admin+IT user) // Here Actual Time is varrying //
}



// Verify JWT & Return Decoded Payload //
export async function decrypt(token) {
  
  try {
    const {payload} = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    //console.log(`JWT VERIFICATION FAILED:${error.code}`);
    console.warn("JWT verification failed:", error.code);
    return null;
  }
}

// verify JWT and return decoded Payload //

export function verifyJWT(token) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  try {
    const decode = jwtVerify(token, secret);
    return decode; // session id like-> "2d62a172-ea3b-451e-9a87-e1d15bee486b"
  } catch (error) {
    console.log("JWT VERIFICATION FAILED or Expired");
    return null;
  }
}
