"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Button } from "@mui/material";
export default function Error({ error, reset }) {
  console.log(error.digest);
  const router = useRouter();
  return (
    <div className="d-flex flex-column justify-content-center">
      <p className="text-2xl">Something Went Wrong Please Click Below</p>
      <div>
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
    </div>
  );
}
