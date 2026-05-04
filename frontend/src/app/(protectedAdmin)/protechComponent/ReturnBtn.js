"use client";
import { Button } from "@mui/material";
import { deleteSession } from "@/lib/Auth/sessionCookie";
import { useRouter } from "next/navigation";

export default function ReturnBtn() {
  const router = useRouter();
  const handleReturn = async () => {
    const result = await deleteSession();
    //console.log({result:result})
    if (result.success) router.push("/admin");
  };

  return (
    <Button variant="contained" color="error" onClick={handleReturn}>
      Return to Login
    </Button>
  );
}
