"use client"
import { AddWorkOrderBtn,SearchOrderBtn } from "../../component/ActionButton/WorkOrderBtn"

const ButtonPage = () => {
  return (
    <div className="w-full flex flex-1 justify-content-evenly p-2" style={{backgroundColor:"#EEFABD"}}>
      <AddWorkOrderBtn/>
      <SearchOrderBtn/>
    </div>
  )
}

export default ButtonPage
