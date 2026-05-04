"use client";
import { logOutUser } from "@/app/actions/logAdmin";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

export default function LogoutBtn() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      await logOutUser();
    } catch (error) {
      //console.error("Logout error:", error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
      router.push("/admin");
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
      <Dialog open={open} onClose={() => !loading && setOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Logout"
            )}
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
