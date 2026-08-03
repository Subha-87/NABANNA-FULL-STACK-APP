import { useState } from "react";

export const useDialog = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const openDialog = (data = null) => {
   
    setDialogData(data);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogData(null);
  };

  return {
    open,
    dialogData,
    openDialog,
    closeDialog,
  };
};
