/*import { NextResponse } from "next/server";
import connectDB from "../../../lib/database";
import Admins from "@/lib/models/adminModel";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import Session from "@/lib/models/adminSession";
//import { signCookie } from "@/lib/cookieAuth"
import { signCookie } from "@/lib/hmacCookieAuth";

import { cookies } from "next/headers";
import { encrypt, signJWT } from "@/lib/jwtAuth";
import { SetSession } from "@/lib/sessionManagement";

export async function POST(request) {
  const cookieStore = await cookies()
  await connectDB();
  try {
    const { email, password } = await request.json();

    // Find User in the Database by email //
    const result = await Admins.findOne({ email: email });
    // Check For User Exist or not
    if (!result)
      return NextResponse.json({ msg: "No Admin Found" }, { status: 404 });

    // User Found Then Compare Password //
    const isPasswordValid = await bcrypt.compare(password, result.password);
    if (!isPasswordValid)
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 401 });
    // All ok create session & cookies //
    // 1.First Create Session & Session ID//
    const createdTime = new Date(Date.now())
    const expiresAt = new Date(Date.now() + 60*60*1000) // set expiry :1hr in millisecond 
    const user = {
      username: result.name,
      rank: result.rank,
    }
    // creat a encrypted session in jwt token with userinfo and expiry date //
    const session = await encrypt({user,expiresAt})

    console.log({new_session:session})            
    const newSessionInfo = {
      sessionId: uuidv4(),
      userId: result._id,
      username: result.name,
      rank: result.rank,
      created:createdTime,
      expiry:expiresAt

    };
    const sessionInfo = await Session.create(newSessionInfo);
    //console.log(sessionInfo);
    const{sessionId} = sessionInfo

    // Create JWT with Session ID //
    const token = signJWT(sessionId)
    // Create SignedValue for Cookie with Session ID //
    const signedValue = signCookie(sessionId) // function call //
    //console.log(signedValue)

    /*cookieStore.set({
      name:"Auth",
      value:token, // alternatibe cookies signature signed value //
      secure:process.env.NODE_ENV === "production",
      sameSite:"strict",
      maxAge:60*60,// 1hr //
      httpOnly:true,
      //101 PWDpath:"/dashboard"
    })
    return NextResponse.json({ msg: "Login Successfull With token",success:true }, { status: 200 });*/
    /*const sessionValue = await SetSession()
    console.log({s:sessionValue})
    cookieStore.set({
      name:"Auth_Cookie",
      value:session,
      secure:process.env.NODE_ENV === "production",
      sameSite:"Lax",
      maxAge:60*60,// 1hr //
      httpOnly:true,
      path:"/dashboard"
    })
    return NextResponse.json({ msg: "Login Successfull With Signed Value",Auth_Token:token,success:true }, { status: 200 })
    //cookieStore.set('session',session,{expiresAt,httpOnly:true})
    //return NextResponse.json({ msg: "Login Successfull With Signed Value",Auth_Token:token,success:true }, { status: 200 });
    
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: `Server Error:${error.message}` },
      { status: 500 }
    );
  }
}*/
