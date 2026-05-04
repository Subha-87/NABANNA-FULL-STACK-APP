import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ItemEditModal from "../ModalForm/ItemEditModal";

const ItemEditBtn = ({ selectData, btnClicked, makeModalOff,onRefresh }) => {
  //console.log(modStat);
  const [open, setOpen] = useState(false);
  //const [isBtnClicked, setisBtnClicked] = useState(btnClicked);
  //console.log(btnClicked);
  const handleEditBtn = () => {
    setOpen(true);
    //if (btnClicked == undefined) return;
    //makeModalOff(true);
  };
  return (
    <>
      <FaRegEdit
        style={{ color: "green", fontSize: "25px" }}
        onClick={handleEditBtn}
      />
      <ItemEditModal
        isOpen={open}
        isClose={() => setOpen(false)}
        editInfo={selectData}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default ItemEditBtn;
