import { NextResponse } from "next/server";
import { verifySession } from "./lib/Auth/sessionCookie";
import { redirect } from "next/navigation";

const routeAccess = {
  admin: {
    paths: ["/dashboard"],
    redirect: "/admin",
  },
  itUser: {
    paths: ["/nabanna", "/upanna"],
    redirect: "/subdivision/nabanna",
  },
};
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  //console.log(pathname)

  let matchedRoute = null;

  // detect which route group it belongs to
  for (const key in routeAccess) {
    const match = routeAccess[key].paths.some((path) =>
      pathname.startsWith(path),
    );

    if (match) {
      matchedRoute = routeAccess[key];
      break;
    }
  }
  // if not protected route → continue
  if (!matchedRoute) {
    return NextResponse.next();
  }

  // verify session
  const authInfo = await verifySession(request); // // Check For Valid Session ID //when user login its has valid encrypted session id //
  if (!authInfo?.sid || authInfo.exp * 1000 < Date.now()) {
    return NextResponse.redirect(new URL(matchedRoute.redirect, request.url));
  }

    // attach session id to request header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("session-auth_id", authInfo.sid);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });



 /* const protectedPath = [
    "/dashboard",
    "/dashboard/register",
    "/dashboard/estimate",
    "/dashboard/permission",
    "/dashboard/amc",
    "/dashboard/challan",
    "/dashboard/project",
  ];

  const protectedPath_ItPersonnel = [
    "/nabanna",
    "/nabanna/networking",
    "/nabanna/networking/report",
    "/nabanna/voice/Report",
    "/nabanna/voice",
    "/nabanna/cctv",
    "/nabanna/pc-hardware",
    "/nabanna/pc-hardware/Report",
    "/nabanna/pc-hardware",
    "/upanna/dashboard",
  ];

  //console.log("middleware Called")
  //console.log(pathname)

  const isProtected = protectedPath.includes(pathname);
  const isProtected_user = protectedPath_ItPersonnel.includes(pathname);

  // ADMIN ACCESSING DASHBOARD //
  if (isProtected) {
    //console.log({path_access:isProtected})
    const authInfo = await verifySession(request); // Check For Valid Session ID //when user login its has valid encrypted session id //
    //console.log({middleware:authInfo})
    if (!authInfo?.sid || authInfo.exp * 1000 < Date.now())
      return NextResponse.redirect(new URL("/admin", request.url));
    const { sid } = authInfo;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("session-auth_id", sid);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // IT USER ACCESSING THEIR RESPECTIVE DASHBOARD //
  if (isProtected_user) {
    //console.log({path_access:isProtected_user})
    const authInfo = await verifySession(request);
    if (!authInfo?.sid || authInfo.exp * 1000 < Date.now())
      return NextResponse.redirect(
        new URL("/subdivision/nabanna", request.url),
      );
    const { sid } = authInfo;
    //const response = await sessionCheck(sid)
    //console.log(response)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("session-auth_id", sid); // this auth id is set to pass with wiht HTTP request //
    return NextResponse.next({ request: { headers: requestHeaders } });
  }*/
}

/*export const config = {
  //matcher: ["/dashboard","/dashboard/:path*","/upanna/:path*"]
  matcher: ["/dashboard", "/dashboard/:path*", "/nabanna", "/nabanna/:path*"],
};*/
export const config = {
  matcher: [
    //"/admin",
    "/dashboard/:path*",
    "/nabanna/:path*",
    "/upanna/:path*",
  ],
};
