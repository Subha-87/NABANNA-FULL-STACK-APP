import { Button, TextField, InputAdornment } from "@mui/material";
import { AiOutlineVideoCameraAdd, AiOutlineSearch } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useModal } from "@/app/Hook/useModal";
import { AddModal,EditMeetingModal } from "../ModalForm/MeetingModal";
import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { useRef } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ConfirmDialog_two from "@/components/ui/ConfirmDialog_two";
import { useDialog } from "@/app/Hook/useDialog";

export const AddMeetingBtn = ({ onSuccess }) => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button
        startIcon={<AiOutlineVideoCameraAdd />}
        variant="contained"
        color="error"
        onClick={() => handleOpen(true)}
        sx={{ textTransform: "none", fontWeight: 600 }} // Makes text look cleaner
      >
        Meeting
      </Button>
      <AddModal
        isOpen={open}
        isClose={() => handleClose(true)}
        onSuccess={onSuccess}
      />
    </>
  );
};

export const SearchBtn = () => {
  const [searchWord, setSearchWord] = useState("");

  const handleSearchMeeting = async () => {
    if (!searchWord.trim()) return; // Prevent empty searches

    try {
      // API call here
      console.log("Searching for:", searchWord);
    } catch (error) {
      console.log(error);
    }
    setSearchWord("");
  };

  // Allow pressing "Enter" to search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchMeeting();
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Search meetings..."
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AiOutlineSearch style={{ color: "rgba(0,0,0,0.54)" }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary" // Changed to primary for better harmony with the search UI
        onClick={handleSearchMeeting}
        sx={{ textTransform: "none", fontWeight: 600 }}
      >
        Search
      </Button>
    </div>
  );
};

export const EditBtn = ({ editData,onRefresh }) => {
  const { open, handleOpen, handleClose } = useModal();
  return (
    <>
      <GrEdit
        style={{ color: "green", fontSize: "25px" }}
        onClick={() => handleOpen(true)}
      />
      <EditMeetingModal isOpen={open} isClose={() => handleClose(true)} onSuccess={onRefresh} editInfo={editData}/>
    </>
  );
};
export const DeleteBtn = ({ delId, onRefresh }) => {
  const axios = useAxios();

  const { isOpen, openDialog, closeDialog } = useDialog();

  const handleDeleteMeeting = async () => {
    try {
      const response = await axios.delete(`/VIP/delete/${delId}`);

      if (response.data.success) {
        toast.success("Data deleted");
        closeDialog();
        onRefresh();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete data");
    }
  };
  return (
    <>
      {/* Delete icon */}
      <MdDeleteForever
        className="cursor-pointer text-red-500"
        style={{ fontSize: "25px" }}
        onClick={openDialog}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog_two
        isOpen={isOpen}
        onClose={closeDialog}
        onConfirm={handleDeleteMeeting}
      />
    </>
  );
};
