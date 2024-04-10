import { ArrowDownward } from "@mui/icons-material";
import { Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { useRef, useState } from "react";

export default function DataTableColumn({Data, isClicked, onClick}) {

    const [isHovering, setIsHovering] = useState(false);

    return (
        
        <SoftBox
            sx={{ width: Data["size"] }} 
            className={`flex-shrink-0 select-none flex justify-center ${isClicked ? "border-2 border-black" : ""}`}
            //onMouseOver={() => setIsHovering(true)}
            //onMouseOut={() => setIsHovering(false)}
            //onClick={onClick}
        >
            <SoftBox className={`flex flex-row text-ellipsis items-center justify-center h-full`}>
                <Typography variant="h6" className="flex justify-center items-center h-full">
                    {Data["headerName"]}
                </Typography>
                <SoftBox className={`${isHovering || isClicked ? "" : "hidden"} pl-[5px]`}>
                    <ArrowDownward 
                        color="colorISMgreen"
                    />
                </SoftBox>
            </SoftBox>
        </SoftBox>
    )
}