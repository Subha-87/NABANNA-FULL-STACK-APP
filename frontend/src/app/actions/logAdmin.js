"use server";

import connectDB from "../../lib/database";
//import connectDB from '../../../../shared/database'
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import Session from "@/lib/models/adminSession";
//import Session from "../../../../shared/models/adminSession"
import Admins from "@/lib/models/adminModel";
//import Admins from "../../../../shared/models/adminModel"
import { createNewSession, deleteSession } from "@/lib/Auth/sessionCookie";
import { headers } from "next/headers";

// LOG IN SERVER ACTION //

export async function loginUser(loginData) {
  const cookieStore = await cookies();
  await connectDB();
  //console.log(loginData)

  try {
    // Find User in the Database by email //
    const result = await Admins.findOne({ email: loginData.email });
    // Check For User Exist or not
    //console.log(result)
    if (!result) return { error: "No User Exsist" };

    // User Found Then Compare Password //
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      result.password,
    );
    if (!isPasswordValid) return { error: "Invalid Password" };

    // All User Login Validation are Ok then Proceed to Make Session & Cookies //

    // Make a User Information What is need to be Integrated In New Session //
    const { name, email, rank } = result;
   

    // check if user already logged in
    const existingSession = await Session.findOne({
      "userInfo.email":email,
       expiry: { $gt: new Date() } // only active sessions
    })

    if(existingSession){
      return {
        error:"User Already Logged in From Another Device"
      }
    }
    const userDetails = {
      username: name,
      rank: rank,
      email: email,
    };
    // Set Session & Cookies Created & Expiry Time //
    const createdTime = new Date(Date.now());
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // set session expiry seperately :1hr //
    //for test 1mint
    //const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // set session expiry seperately :1 minute //

    // Make a New Session Information after Successfull login //
    const newSessionInfo = {
      sessionId: uuidv4(), // make a random session id //
      userInfo: userDetails,
      createdAt: createdTime,
      expiry: expiresAt, // set session expiry time
    };

    // 1.Create A User Session in DataBase //
    const sessionInfo = await Session.create(newSessionInfo);
    //console.log(sessionInfo);

    const { sessionId } = sessionInfo; // get a newly created session id //
    const userSession = { sid: sessionId }; //--> create payload(only session id) for jwt function //

    //2. Create new encrypted Session ID = JWT + Session Id //
    const session_id = await createNewSession(userSession); // sessionId + JWT ~ session_id(Token) //

    // 3. Set Encrypted Session Id as a Cookie
    cookieStore.set("Auth", session_id, {
      // session_id ~ token //
      expires: expiresAt, // cookie expiry time same as session expiry time //
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true when using real domain with HTTPS // f secure=true on HTTP site: cookie will NOT appear
      path: "/dashboard",
    });

    return {
      success: true,
      message: "Login Successful",
    };
  } catch (error) {
    console.error(error);
    return { error: `Something Went Wrong : ${error.message}` };
  }
}

// LOG OUT SERVER ACTION //
//the main goal of logout is clearing the cookie, not DB deletion.
export async function logOutUser() {
  // When Logout Button Clicked Called Server Action -> LogoutUser()

  const headerList = await headers();
  // extaract session_id from http response header //
  const sessionId = headerList.get("session-auth_id"); // after session expires this session id is not available then gets logout error

  // now use this id to delete session from session database // what if the session id expries already // ???
  await connectDB();
  try {
    if (sessionId) {
      await Session.deleteOne({ sessionId: sessionId });
    }
    await deleteSession();
    return {
      success: true,
      message: "Logout Successful",
    };
    
  } catch (error) {
    console.error(error);
     // even if DB fails → clear cookie
    await deleteSession();
    //return { error: `something went wrong: ${error.message}` };
    return {success:true}
  }
}
