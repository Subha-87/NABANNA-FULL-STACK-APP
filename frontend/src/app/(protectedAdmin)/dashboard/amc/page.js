import AmcTab from "./AmcTab";
import ButtonAMC from "./ButtonAMC";
export default function Page() {
  return (
    <div
      className="flex flex-col w-full h-full overflow-auto"
      style={{ backgroundColor: "#D9EAFD" }}
    >
      <div>
        <ButtonAMC/>
      </div>
      <AmcTab />
    </div>
  );
}
