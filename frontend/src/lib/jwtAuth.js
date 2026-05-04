import jwt from "jsonwebtoken";
import { SignJWT, jwtVerify } from "jose"; // jose library for JWT verification is edge-compatible//

//const JWT_SECRET = process.env.JWT_SECRET || "subhajit_ae";
const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);

// Sign a JWT with session ID //

export function signJWT(ses_id) {
  return jwt.sign({ sid: ses_id }, JWT_SECRET, { expiresIn: "7hr" });
}

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7.5hr")
    .sign(secret);
}

export async function decrypt(input) {
  /*const {payload} = await jwtVerify(input,secret,{
    algorithms:['HS256']
  } )
  
  return payload*/
  try {
    const decode = jwtVerify(input, secret);
    return decode;
  } catch (error) {
    console.log(`JWT VERIFICATION FAILED:${error.code}`);
    return null;
  }
}

// verify JWT and return decoded Payload //

export function verifyJWT(token) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  try {
    const decode = jwtVerify(token, secret);
    return decode;
  } catch (error) {
    console.log("JWT VERIFICATION FAILED");
    return null;
  }
}
