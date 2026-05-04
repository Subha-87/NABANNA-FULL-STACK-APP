"use client"
import { AddAMC,SearchAMC } from '../../component/ActionButton/AmcOrderBtn'

const ButtonAMC = () => {
  return (
    <div className="w-full flex flex-1 justify-content-evenly p-2" style={{backgroundColor:"#EEFABD"}}>
      <AddAMC/>
      <SearchAMC/>
    </div>
  )
}

export default ButtonAMC
