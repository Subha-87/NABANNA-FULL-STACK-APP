
import EstimateTab from "./EstimateTab";
import { Container } from "react-bootstrap";

export default function Page() {
    return (
       <div className="flex flex-col w-full h-full overflow-auto" style={{backgroundColor:"#D9EAFD"}}>
        <EstimateTab/>
       </div>
    );
}