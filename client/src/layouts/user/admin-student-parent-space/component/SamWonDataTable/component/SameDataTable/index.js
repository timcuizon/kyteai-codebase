import { Collapse, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { Row } from "jspdf-autotable";
import { useEffect, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ExpandMore, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from "@mui/icons-material";
import Creatable, { useCreatable } from "react-select/creatable";
import { useNavigate } from "react-router-dom";

export default function SameDataTable({Columns, Rows}){

    const uniqueArray = Rows;
    
    const [collapseStates, setCollapseStates] = useState([]);
    const [rowArrays, setRowArrays] = useState([]);

    const [paginationSize, setPaginationSize] = useState({value: 5, label: 5});
    const [paginationStart, setPaginationStart] = useState(0);
    const [paginationEnd, setPaginationEnd] = useState(4);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Rows")
        console.log(Rows)
        console.log("Unique Array");
        console.log(Array.from(new Set(Rows.map(item => item.name))).map(name => Rows.find(item => item.name === name)))

        const colStat = [];
        const rowArr = [];

        uniqueArray.forEach((row) => {
            rowArr.push(
                Rows.filter((filter) => filter.name == row.name)
            )
            colStat.push(false);
        })

        console.log("rowArr");
        console.log(rowArr);

        setCollapseStates(colStat);
        setRowArrays(rowArr);
    },[])

    const handleCollapse = (ind) => {
        const collapseSt = [...collapseStates];

        if(collapseSt[ind]) {
            collapseSt[ind] = false;
        } else if (!collapseStates[ind]) {
            collapseSt[ind] = true;
        }

        setCollapseStates(collapseSt);
    }

    return (
        <SoftBox className="relative overflow-x-auto">
            <SoftBox className="relative overflow-x-auto overflow-y-hidden">
                <SoftBox className="flex flex-row rounded-md w-full border-slate-200 border-b-2 border-t-2"> 
                    {/* Column Headers */}
                    <SoftBox
                        sx={{ width: 100}} 
                        className={`flex text-ellipsis items-center justify-center flex-shrink-0 `}
                    >
                    </SoftBox>
                    {Columns.map((rowB, ind) =>
                        rowB.topRow != undefined ? null : 
                        rowB["field"] == "id" ?
                        null :
                        (
                            <>
                                <SoftBox
                                    sx={{ width: rowB["size"] }} 
                                    className={`flex flex-col text-ellipsis items-center flex-shrink-0 `}
                                >
                                    <Typography variant="h6" className="h-12 flex justify-center p-4 items-center w-full">
                                        {rowB["headerName"]}
                                    </Typography>
                                </SoftBox>
                            </>
                        ) 
                    )}
                </SoftBox>

                {
                    uniqueArray.map((rowB,ind) => ind >= paginationStart && ind <= paginationEnd ? (
                        <>
                            <SoftBox className="flex flex-row rounded-md w-full border-slate-200 border-b-2 h-16"> 
                                <SoftBox
                                    sx={{ width: 100}} 
                                    className={`flex text-ellipsis items-center justify-center flex-shrink-0 `}
                                >
                                </SoftBox>
                                {
                                    Columns.map((rowC) => 
                                    rowC.topRow != undefined ? null : 
                                    rowC["field"] == "id" ?
                                    null : (
                                        <SoftBox
                                            sx={{ width: rowC["size"] }} 
                                            className={`flex flex-col text-ellipsis flex-shrink-0 `}
                                        >
                                            <SoftBox
                                                sx={{ width: rowC["size"] }} 
                                                className={`flex-1 flex justify-center p-4 items-center flex-shrink-0 text w-full h-full`}
                                            >
                                                <Typography variant="body2" className={`overflow-hidden text-ellipsis whitespace-nowrap`}>
                                                    { rowC["field"] == "view" ? (
                                                        <>
                                                            <SoftButton variant="outlined" color="colorISMgreen"
                                                                onClick={() => {
                                                                    
                                                                    navigate("/user-student-parent-space/report-records-view?id=" + rowB.id)
                                                                }}
                                                            >
                                                                view
                                                            </SoftButton>
                                                        </>
                                                    ) : rowB[rowC["field"]]}
                                                </Typography>
                                            </SoftBox>
                                        </SoftBox>
                                    ))
                                }
                            </SoftBox>
                        </>
                    ) : null)
                }
            </SoftBox> 
            <SoftBox className="w-full h-16 flex justify-end items-center border-b-[4px] border-colorISMgreen">
                <SoftBox>
                    <Typography 
                        variant="body2" 
                        className="inline select-none"
                    >
                        Rows per page:  
                        <Creatable
                          styles={{
                            control: (provided, state) => ({
                              ...provided,  
                              borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                              boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                              minHeight: "32px", // Adjust the height to make it smaller
                              fontSize: "14px", // Adjust the font size"
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused ? "#1E4C2B" : "#ffffff",
                              color: state.isFocused ? "#ffffff" : "#000000", // Corrected this line
                              minHeight: "32px", // Adjust the height to make it smaller
                              fontSize: "14px", // Adjust the font size
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "#000000 !important", // Set text color when an option is selected
                            })
                          }}
                          options={[
                            {value: 5, label: 5},
                            {value: 10, label: 10},
                            {value: 20, label: 20},
                          ]}
                          value={paginationSize}
                          isSearchable={false}
                          onChange={(option) => {
                            setPaginationSize()
                          }}
                          placeholder="Start"
                          size="smaller"
                          className="inline-block ml-5 mr-5"
                        />

                        {paginationStart + 1}-{paginationEnd >= (Rows.length - 1) ? Rows.length : (paginationEnd + 1)} of {Rows.length} 

                    </Typography>
                    <SoftButton
                        className="cursor-pointer"
                        disabled={paginationStart == 0}
                        color={"colorISMgreen"}
                        sx={{
                            marginLeft: 2,
                            marginRight: 1,
                        }}
                        onClick={() => {
                            setPaginationStart(paginationStart - paginationSize.value);
                            setPaginationEnd(paginationEnd - paginationSize.value);
                        }}
                    >
                        <KeyboardArrowLeft
                            size={50}
                        />
                    </SoftButton>
                    <SoftButton
                        className="cursor-pointer"
                        color={"colorISMgreen"}
                        disabled={paginationEnd >= Rows.length - 1}
                        sx={{
                            marginRight: 2,
                        }}
                        onClick={() => {
                            setPaginationStart(paginationStart + paginationSize.value);
                            setPaginationEnd(paginationEnd + paginationSize.value);
                        }}
                    >
                        <KeyboardArrowRight
                            size={50}
                        />
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    )
}