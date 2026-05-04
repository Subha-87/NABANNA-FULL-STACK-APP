"use server";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "../Auth/jwtAuth";
import { headers } from "next/headers";
//import Session from "../models/adminSession";

// Create a Encrypted Session ID //

export async function createNewSession(payload) {
  return encrypt(payload);
}

// Verify Session For Middleware // -->when user log in then verify session id //
export async function verifySession(request) {
  // request parameter coming from middleware //
  const authToken = request.cookies.get("Auth")?.value; // Read Cookie //
  if (!authToken) return null;
  // decode auth token //
  //console.log( {session_cookie_token : authToken})
  const decode = await decrypt(authToken); // GET TOKEN & Verify JWT
  //console.log({decoded_token:decode})
  return decode; // Session Id // "2d62a172-ea3b-451e-9a87-e1d15bee486b"
}

//  Get a Valid Session for accessing - >Admin & IT User Layout //
export async function getSession() {
  //  Extract session id from request Headers what is set in middleware //
  //console.log("getSession Called")
  const headerList = await headers();
  const validSessionId = headerList.get("session-auth_id");
  //console.log({getSessionid:validSessionId })
  if (!validSessionId) return null;
  return validSessionId;
}

/*export const sessionCheck = async(id) => {
   try {
    const result = await Session.findOne({sessionId:id})
    if(!result) throw error
    return result
   } catch (error) {
      return null
   }
}*/

// Delete Session Cookie for Admin User //
export async function deleteSession() {
  const cookieStore = await cookies();
  //cookieStore.delete('Auth')
  cookieStore.set("Auth", "", {
    path: "/dashboard", //path: "/",
    maxAge: 0,
  });

  return { success: true };
}

// Delete Session Cookie for IT User //
export async function deleteITUserSession() {
  const cookieStore = await cookies();
  cookieStore.set("Auth", "", {
    path: "/nabanna",
    maxAge: 0,
  });

  return { success: true };
}

