import connectDB from "../../../lib/database";
import ItPerson from "../../../lib/models/itPersonnelModel";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/Auth/getAuthUser";
import bcrypt from "bcrypt";

/*export async function POST(request) {


  //console.log(request);
  //console.log("✅ NEXT API HIT");
  //const authorization_id = request.headers.get("session-auth_id");
  console.log(authorization_id);
  const auth_info = await getAuthUser(authorization_id);
  if (!auth_info)
    return NextResponse.json(
      {
        msg: "Authorization Failed!! You are not Authorized to make Registration ",
      },
      { status: 401 },
    );
  const payload = await request.json();
  const { name, username, rank, password, domain } = payload;
  await connectDB();
  try {
    // Create Hashed Password //
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create New Admin Info //
    const newItPersonInfo = {
      name,
      username,
      rank,
      password: hashedPassword,
      domain,
    };
    const db_result = await ItPerson.insertOne(newItPersonInfo);
    console.log(db_result);
    return NextResponse.json(
      {
        msg: "IT Person Registration Successfull",

        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    //console.log(error);
    if (error.code == 11000) {
      return NextResponse.json(
        { msg: "IT User Already Registered" },
        { status: 409 },
      ); // 409 conflict //
    }
    return NextResponse.json(
      { msg: `Server Error :${error.message}` },
      { status: 500 },
    );
  }
}*/

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, username, rank, password, domain } = payload;

    await connectDB();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newItPersonInfo = {
      name,
      username,
      rank,
      password: hashedPassword,
      domain,
    };

    const db_result = await ItPerson.insertOne(newItPersonInfo);

    return NextResponse.json(
      {
        msg: "IT Person Registration Successful",
        success: true,
      },
      { status: 201 }
    );

  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { msg: "IT User Already Registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { msg: `Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}