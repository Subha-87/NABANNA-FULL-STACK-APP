
import "../../TableStyle.css"
import {
  WarrantyColor,
  HardwareCell,
  systemConditionColor,
  getEffectiveAmcStatus,
} from "./Resuable/portableFunction";
import { EditSystem } from "../Button/NabannaSystemBtn";
import MachineTable from "./MachineTable";
import pageLoading from "../../../../../public/Loading/omw-coming.gif";
import Image from "next/image";
import { ErrorDisplay } from "@/app/utils/axiosError";

const MachineDetails = ({ data = [], onRefresh, loading, tableError }) => {
  return (
    <>
      {loading ? (
        <div className="flex flex-column text-center  text-2xl font-bold">
          <div className="flex justify-content-center">
            <Image
              src={pageLoading}
              alt="Loading animation"
              width={300}
              height={300}
              unoptimized={true} // Optional: Bypasses Next.js image optimization for the GIF
            />
          </div>
        </div>
      ) : tableError ? (
        <ErrorDisplay err={tableError} />
      ) : (
        <MachineTable showdata={data} refreshData={onRefresh} />
      )}
    </>
  );
};

export default MachineDetails;
