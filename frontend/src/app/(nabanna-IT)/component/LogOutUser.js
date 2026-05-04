"use client";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut_IT_User } from "@/app/actions/itPersonLog";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogOutUser() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await LogOut_IT_User(); // Call Server Action //
    } catch (error) {
      //console.error("Logout error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
      setOpen(false)
      router.push("/subdivision/nabanna");
      router.refresh();
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => !loading && setOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to Logout?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      {/* Full Screen Loader */}
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(5px)",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
