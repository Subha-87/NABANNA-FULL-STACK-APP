import connectDB from "../../lib/database";
//import connectDB from '../../../../shared/database'
import Session from "../models/adminSession";
//import Session from '../../../../shared/models/adminSession'
import Session_IT_Personnel from "../models/itPersonnelSession";

// FOR AUTH IT ADMIN //
export async function getAuthUser(session_id) {
  if (!session_id) return null;
  await connectDB();
  try {
    const validSession = await Session.findOne({
      sessionId: session_id,
    }).lean();
    if (!validSession) return null;
    // session expiry check
    if (validSession.expiry < new Date()) {
      await Session.deleteOne({ sessionId: sid });
      return null;
    }
    const { userInfo, expiry } = validSession;
    return {
      ...userInfo,
      expiry,
    };
  } catch (error) {
    console.error("getAuthUser error:", error);
    return null;
  }
}

// FOR AUTH IT USER NABANNA //
export async function getAuth_ITUser(session_id) {
  if (!session_id) return null;
  await connectDB();
  try {
    const validItUserSession = await Session_IT_Personnel.findOne({
      sessionId: session_id,
    }).lean();

    if (!validItUserSession) return null;
    // session expiry check
    if (validItUserSession.expiry < new Date()) {
      await Session.deleteOne({ sessionId: sid });
      return null;
    }
    const { userInfo, expiry } = validItUserSession;
    return {
      ...userInfo,
      expiry,
    };
  } catch (error) {
    console.error("getAuthUser error:", error);
    return null;
  }
}
