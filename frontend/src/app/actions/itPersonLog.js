"use server";
import connectDB from "../../lib/database";
//import connectDB from "../../../../shared/database"
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import ItPerson from "@/lib/models/itPersonnelModel";
import Session_IT_Personnel from "@/lib/models/itPersonnelSession";
import {
  createNewSession,
  deleteITUserSession,
} from "@/lib/Auth/sessionCookie";
import { headers } from "next/headers";

export async function Login_IT_User(loginData) {
  //console.log(loginData)
  const cookieStore = await cookies();
  //await connectDB();
  const { fusername, fpassword, fdomain } = loginData;
  //console.log(fdomain)
  try {
    // Find User in the Database by username //
    await connectDB();
    const result = await ItPerson.findOne({ username: fusername });
    if (!result) return { error: "No User Exsist" };
    // User Found Then Compare Password //
    const isPasswordValid = await bcrypt.compare(fpassword, result.password);
    if (!isPasswordValid) return { error: "Invalid Password" };
    if (isPasswordValid && result.domain === fdomain) {
      // All User Login Validation are Ok then Proceed to Make Session & Cookies //

      // Make a User Information What is need to be Integrated In New Session //
      const { name, rank, domain } = result;
      // check if user already logged in
      const existingSession = await Session_IT_Personnel.findOne({
        "userInfo.username": name, // Check by Name
        expiry: { $gt: new Date() }, // only active sessions
      });

      if (existingSession) {
        return {
          error: "User Already Logged in From Another Device",
        };
      }

      const itUserDetails = {
        username: name,
        rank: rank,
        domain: domain,
      };
      // SESSION & COOKIES CREATION //
      // Set Session & Cookies Created & Expiry Time //
      const createdTime = new Date(Date.now());
      const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // set expiry :1hr in millisecond
      //const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // set expiry :1mint for test

      // Make a New Session Information after Successfull login //
      const newSessionInfo = {
        sessionId: uuidv4(), // make a random session id //
        userInfo: itUserDetails,
        createdAt: createdTime,
        expiry: expiresAt, // set session expiry time //
      };
      // 1.Create A User Session in DataBase //
      const itUser_sessionInfo =
        await Session_IT_Personnel.create(newSessionInfo);
      //console.log(itUser_sessionInfo);
      const { sessionId } = itUser_sessionInfo; // get a newly created session id //
      const userSession = { sid: sessionId }; //--> create payload(only session id) for jwt function //
      //2. Create new encrypted Session ID = JWT + Session Id //
      const session_id = await createNewSession(userSession);
      //const set_cookie_path = domain;
      cookieStore.set("Auth", session_id, {
        expires: expiresAt, // cookie expiry time set as session expiry time //
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/nabanna",
      });
      return {
        success: true,
        message: "Login Successful",
        data: domain,
      };
    } else {
      return { error: "Invalid Domain" };
    }
  } catch (error) {
    console.error(error);
    return { error: `Something Went Wrong : ${error.message}` };
  }
}

// IT USER LOGOUT SEVER ACTION //
export async function LogOut_IT_User() {
  const headerList = await headers();
  const sessionId = headerList.get("session-auth_id");
  await connectDB();
  try {
    if (sessionId) {
      await Session_IT_Personnel.deleteOne({ sessionId: sessionId });
    }
    await deleteITUserSession();
    return {
      success: true,
      message: "Logout Successful",
    };
    /* const result = await Session_IT_Personnel.deleteOne({
      sessionId: sessionId,
    });
    //console.log(result)
    const { acknowledged, deletedCount } = result;
    if (acknowledged && deletedCount == 1) {
      await deleteITUserSession();
      return { success: true, message: "Logout SuccessFul" };
    } else {
      return { error: "Error Something" };
    }*/
  } catch (error) {
    console.error(error);
    await deleteITUserSession();
    return {success:true}
    //return { error: `something went wrong: ${error.message}` };
  }
}
