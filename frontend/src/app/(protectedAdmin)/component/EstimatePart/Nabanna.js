

import { AddEstimateNabanna,AddChallan } from "../ActionButton/AddEstimate";
import { NabannaEstimateTable } from "../TableFormat/EstimateTable";
import SearchEstimateBtn from "../ActionButton/SearchEstimateBtn";
import { useState } from "react";


const Nabanna = () => {
  const [searchKey, setsearchKey] = useState("");
  return (
    <>
      <div className="flex flex-row justify-content-around p-3">
        <AddEstimateNabanna/>
        <AddChallan/>
        <div>
          <label htmlFor="" className="mr-2 font-bold text-2xl">
            Search Estimate :
          </label>
          <input
            type="search"
            placeholder="Memo/Work/Cost/Dept/Room"
            value={searchKey}
            onChange={(e) => setsearchKey(e.target.value)}
            
            className="border-4 border-gray-950 p-2  w-[250px] rounded-2 text-center text-blue-700 font-bold h-[50px] focus:outline-none focus:border-blue-800"
          />
          <SearchEstimateBtn findKey ={searchKey} clearInput = {() => setsearchKey("")}/>
        </div>
      </div>
      <div className="overflow-auto grow"><NabannaEstimateTable/></div>
    </>
  );
};

export default Nabanna;
