import { NextResponse } from "next/server";
import { headers } from "next/headers";
import connectDB from "../../../lib/database"
import Admins from "@/lib/models/adminModel";
import bcrypt from "bcrypt";
import {getAuthUser} from "@/lib/Auth/getAuthUser";


export async function POST(request) {
  //const headerList = await headers();
  //const validSessionId = headerList.get("session-auth_id");
  const authorization_id = request.headers.get("session-auth_id")
  console.log(authorization_id )
  const auth_info = await getAuthUser(authorization_id )
  if(!auth_info) return NextResponse.json({msg:"Authorization Failed"},{status:401})
  await connectDB();
  try {
    const payload = await request.json();
    const { name, email, rank, subdivision, mobile, password } = payload;
    
    // Create Hashed Password //
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create New Admin Info //
    const newAdmininfo = {
      name,
      email,
      rank,
      subdivision,
      mobile,
      password:hashedPassword,
    };

    

    const result = await Admins.insertOne(newAdmininfo);
    return NextResponse.json({msg:"Admin Registration Successfull",data:result,success:true},{status:201})
  } catch (error) {
    //console.error(error)
    if(error.code == 11000){
        return NextResponse.json({msg:"Admin Already Registered"},{status:409})
    }
    return NextResponse.json({msg:`Server Error :${error.message}`},{status:500})
    
  }
}
