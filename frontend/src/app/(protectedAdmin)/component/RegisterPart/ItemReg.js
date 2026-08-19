import AddItemBtn from "../ActionButton/AddItemBtn";
import MaterialTable from "../TableFormat/MaterialTable";
import ItemSearchBtn from "../SearchButton/ItemSearchBtn";
import { useState, useEffect } from "react";

import { handleAxiosError } from "@/app/utils/axiosError";
import { useAxios } from "@/app/Hook/useAxios";


const ItemReg = () => {
  const [searchItem, setsearchItem] = useState("");

  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [itItemData, setItItemData] = useState([]);
  const [open, setOpen] = useState(false); // for edit modal purpose //
  const axios = useAxios(); 
  // GET DATA FROM SERVER //
  const getItItemsData = async () => {
    //console.log(axios)
    try {
      const response = await axios.get("/itemNabanna/showincoming");
      setItItemData(response.data?.data);
    } catch (error) {
      //console.error(error);
      const { generalError } = handleAxiosError(error);
      setError(generalError || "Something is Wrong");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getItItemsData();
  }, []);
  const makeClear = () => {
    setsearchItem("");
  };

  return (
    <>
      <div className="flex flex-row justify-content-around p-3">
        <AddItemBtn onSuccess={getItItemsData} />
        <div>
          <label className="mr-2 font-bold text-xl">Search :</label>
          <input
            type="text"
            placeholder="Challan/ITEM/Sender/Serial/Room/Allocation"
            value={searchItem}
            className="searchInput"
            onChange={(e) => setsearchItem(e.target.value)}
            style={{width:"350px"}}
          />{" "}
          <ItemSearchBtn searchData={searchItem} clearData={makeClear} />
        </div>
      </div>
      <div className="overflow-auto grow border-3 border-success">
        <MaterialTable
          data={itItemData}
          loading={isloading}
          isError={error}
          onRefresh={getItItemsData}
        />
      </div>
    </>
  );
};

export default ItemReg;
