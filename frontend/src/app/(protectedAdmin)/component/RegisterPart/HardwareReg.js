import MachineDetails from "@/app/(nabanna-IT)/component/Table/MachineDetails";
import {
  AddSystemBtn,
  SystemStatusView,
  SearchSystem,
  SystemFind,
} from "@/app/(nabanna-IT)/component/Button/NabannaSystemBtn";

const HardwareReg = () => {
  return (
    <>
      <div className="h-[50px] flex justify-evenly items-center">
        <AddSystemBtn/>
        <SystemStatusView />
        <SearchSystem/>
        <SystemFind/>
      </div>
      <div className="overflow-auto grow">
        <MachineDetails />
      </div>
    </>
  );
};

export default HardwareReg;
