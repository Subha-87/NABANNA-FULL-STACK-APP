export const HardwareCell = ({ device }) => {
  if (!device) return <span className="text-gray-400">-</span>;

  const devices = Array.isArray(device) ? device : [device];

  if (devices.length === 0) return <span className="text-gray-400">-</span>;

  const getStatus = (d) => {
    // Warranty still active
    if (d.remainingWarranty !== "Expired") {
      return {
        text: `Warranty : ${d.remainingWarranty}`,
        className: "text-green-600 font-semibold",
      };
    }

    // Warranty expired
    switch (d.amcStatus) {
      case "ON":
        return {
          text: "AMC : Active",
          className: "text-green-600 font-semibold",
        };

      case "EXPIRED":
        return {
          text: "AMC : Expired",
          className: "text-red-600 font-semibold",
        };

      case "REQUIRED":
      case "NONE":
      default:
        return {
          text: "Warranty : Expired",
          secondLine: "AMC : Required",
          className: "text-red-600 font-semibold",
        };
    }
  };

  return (
    <div className="space-y-2 text-xs">
      {devices.map((d, index) => {
        const status = getStatus(d);

        return (
          <div key={index} className="rounded border bg-gray-50 p-2">
            <div>
              <b>Make:</b> {d.make}
            </div>

            <div>
              <b>Model:</b> {d.model}
            </div>

            <div>
              <b>SN:</b>{" "}
              {Array.isArray(d.serial) ? d.serial.join(", ") : d.serial}
            </div>

            {d.installationDate ? (
              <div>
                {" "}
                <b>Installed:</b>{" "}
                {new Date(d.installationDate).toLocaleDateString("en-GB")}
              </div>
            ) : null}

            <div className={status.className}>{status.text}</div>

            {status.secondLine && (
              <div className="font-semibold text-orange-600">
                {status.secondLine}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const WarrantyColor = (device) => {
  if (!device) return "text-gray-500";

  if (device.remainingWarranty !== "Expired") {
    return "text-green-600";
  }

  switch (device.amcStatus) {
    case "ON":
      return "text-green-600";

    case "EXPIRED":
      return "text-red-600";

    case "REQUIRED":
    case "NONE":
    default:
      return "text-orange-600";
  }
};
