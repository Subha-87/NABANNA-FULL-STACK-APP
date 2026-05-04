import crypto from "crypto"

const SECRET = process.env.COOKIE_SECRET || "fallback_secret"

export function signCookie(value){
    const hmac = crypto.createHmac("sha256",SECRET).update(value)
    const signature = hmac.digest("base64url")
    return `${value}.${signature}`
}

export function verifyCookie(token){
    const[value,signature] = token.split(".")
    if(!value || !signature) return false

    const hmac = crypto.createHmac("sha256",SECRET).update(value)
    const expectedSig = hmac.digest("base64url")

    const isValid = crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expectedSig))

    return isValid? value : false
}
    