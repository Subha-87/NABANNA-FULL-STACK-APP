import WorkOrderTab from "./WorkOrderTab";
import ButtonPage from "./ButtonPage";

export default function Page() {
  return (
    <div
      className="flex flex-column w-full h-full overflow-auto"
      style={{ backgroundColor: "#D9EAFD" }}
    >
      <div>
        <ButtonPage />
      </div>
      <WorkOrderTab />
    </div>
  );
}
