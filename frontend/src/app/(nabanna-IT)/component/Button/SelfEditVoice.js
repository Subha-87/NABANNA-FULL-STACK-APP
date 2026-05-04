import { MdBrowserUpdated } from "react-icons/md";
import { useState } from "react";
import SelfEditVoiceModal from "../Modal/SelfEditVoiceModal";

const SelfEditVoice = ({data}) => {
    const [open, setopen] = useState(false);
  return (
    <>
       <MdBrowserUpdated
        style={{ color: "purple", fontSize: "28px" }}
        onClick={() => setopen(true)}
      />
      <SelfEditVoiceModal editData ={data} isModalOpen={open} isModalClose={() => setopen(false)}/>
    </>
  )
}

export default SelfEditVoice
