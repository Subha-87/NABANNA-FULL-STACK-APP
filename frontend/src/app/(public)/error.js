"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Button } from "@mui/material";
export default function Error({ error, reset }) {
  console.log(error.digest);
  const router = useRouter();
  return (
    <div className="d-flex justify-content-center">
      <p>Something Went Wrong Please Click Below</p>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset;
          });
        }}
      >
        Rest Error
      </Button>
    </div>
  );
}
