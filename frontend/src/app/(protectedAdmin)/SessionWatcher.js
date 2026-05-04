"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SessionWatcher({ expiry }) {
  const router = useRouter();

  useEffect(() => {
    const expiryTime = new Date(expiry).getTime();
    const now = Date.now();
    const remainingTime = expiryTime - now;
 
    //Session already expired when component loads
    if (remainingTime <= 0) {
      toast.error("Session expired. Please login again.");
      //router.push("/admin");
      setTimeout(() => {
        router.replace("/admin?session=expired"); //Use router.replace() instead of push() so the user can't go back to dashboard with the browser back button.
      }, 1500);
      return;
    }
    //Session will expire in the future (timer)
    const timer = setTimeout(() => {
      toast.error("Session expired. Please login again.");
      //router.push("/admin");
      setTimeout(() => {
        router.replace("/admin?session=expired");
      }, 1500);
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [expiry, router]);

  return null;
}
