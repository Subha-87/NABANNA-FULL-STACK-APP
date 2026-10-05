const ItemDetails = ({ itemDetails }) => {
  if (!itemDetails || itemDetails.length === 0) {
    return "-";
  }

  return (
    <div className="min-w-[420px] space-y-3">
      {itemDetails.map((section, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 overflow-hidden"
        >
          {/* Category Header */}
          <div className="bg-blue-600 text-white px-3 py-2 font-semibold text-sm">
            {section.category}
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-2 py-1 text-left w-[45%]">
                  Item Name
                </th>
                <th className="border border-gray-200 px-2 py-1 text-center w-[15%]">
                  Qty
                </th>
                <th className="border border-gray-200 px-2 py-1 text-left w-[40%]">
                  Specification
                </th>
              </tr>
            </thead>

            <tbody>
              {section.items?.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-2 py-1">
                    {item.itemName}
                  </td>

                  <td className="border border-gray-200 px-2 py-1 text-center font-medium">
                    {item.qty}
                  </td>

                  <td className="border border-gray-200 px-2 py-1">
                    {item.specification || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ItemDetails;