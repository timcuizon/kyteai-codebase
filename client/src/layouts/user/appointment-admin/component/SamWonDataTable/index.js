import { Collapse, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { Column, Row } from "jspdf-autotable";
import { useEffect, useRef, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ArrowDownward, ExpandMore, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from "@mui/icons-material";
import Creatable, { useCreatable } from "react-select/creatable";
import SameDataTable from "./component/SameDataTable";
import Preloader from "PreLoader";
import DataTableColumn from "./component/DataTableColumn";

export default function SamWonDataTable({Columns, Rows}){

    const [rows, setRows] = useState(Rows)

    const uniqueArray = Array.from(new Set(Rows.map(item => item.name))).map(name => Rows.find(item => item.name === name));
    const colsArray = Columns.filter((filter) => filter.topRow == true)
    
    const [defaultCollapseStates, setDefaultCollapseStates] = useState([]);
    const [defaultColumnStates, setDefaultColumnStates] = useState([]);
    const [collapseStates, setCollapseStates] = useState([]);
    const [columnStates, setColumnStates] = useState([]);
    const [rowArrays, setRowArrays] = useState([]);

    const [paginationSize, setPaginationSize] = useState({value: 5, label: 5});
    const [paginationStart, setPaginationStart] = useState(0);
    const [paginationEnd, setPaginationEnd] = useState(4);


    const [isLoading, setIsLoading] = useState(true);

    const [isHoveringHeader, setIsHoveringHeader] = useState(false);

    useEffect(() => {
        console.log("rows")
        console.log(rows)
        console.log("Unique Array");
        console.log(Array.from(new Set(rows.map(item => item.name))).map(name => rows.find(item => item.name === name)))

        const colStat = [];
        const rowArr = [];
        const colmStat = []

        uniqueArray.forEach((row) => {
            rowArr.push(
                rows.filter((filter) => filter.name == row.name)
            )
            colStat.push(false);
        })

        colsArray.forEach(() => {
            colmStat.push(0)
        })

        console.log("rowArr");
        console.log(rowArr);
        
        setDefaultCollapseStates(colStat);
        setDefaultColumnStates(colmStat);
        setCollapseStates(colStat);
        setColumnStates(colmStat);
        setRowArrays(rowArr);

        setIsLoading(false);
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

    const handleOnMouseOver = (ind) => {
        var columnStat = [...columnStates];

        columnStat[ind] = true;

        setColumnStates(columnStat);
        console.log("hover " + ind);
    };

    const handleOnMouseOut = (ind) => {
        var columnStat = [...columnStates];

        columnStat[ind] = false;
        
        setColumnStates(columnStat);
        console.log("hover out " + ind);
    };

    return isLoading ? (
        <Preloader />
    ) : (
        <SoftBox className="relative  border-slate-200 border-2 overflow-visible ">
            {/* {
                uniqueArray.map((row, ind) => ind < 5 ? (
                    <SoftBox className="relative overflow-x-auto ">
                        <SoftBox className="flex flex-row rounded-md w-full">
                            {row["name"]}
                        </SoftBox>
                    </SoftBox>
                ) : null )
            } */}
            <SoftBox className="relative overflow-x-auto ">
                <SoftBox 
                    className="flex flex-row rounded-md w-full border-slate-200 border-b-2 border-t-2"
                    //onMouseOver={() => setIsHoveringHeader(true)}
                    //onMouseOut={() => setIsHoveringHeader(false)}
                > 
                    {/* Column Headers */}
                    <SoftBox
                        sx={{ width: 100}} 
                        className={`flex flex-col text-ellipsis gap-x-4 items-center flex-shrink-0 h-12 `}
                    >
                    </SoftBox>
                    {Columns.map((row, ind) =>
                        row.topRow == undefined ? null : 
                        row["field"] == "id" ?
                        null :
                        (
                            <DataTableColumn
                                Data={row}
                                isClicked={columnStates[ind]}
                                onClick={() => {

                                    var colStates = [...defaultColumnStates];
                                    var colmStates = [...columnStates];
                                    
                                    console.log(ind)
                                    if(colmStates[ind] == 0){
                                        colmStates[ind]++;
                                        console.log(colmStates)
                                        setColumnStates(colmStates);
                                    } else if(colmStates <= 2){
                                        colStates[ind] = 0;
                                        console.log(colStates)
                                        setColumnStates(colStates);
                                    }
                                    
                                }}
                            />
                        ) 
                    )}
                </SoftBox>

                {
                    uniqueArray.map((rowA,ind) => ind >= paginationStart && ind <= paginationEnd ? (
                        <>
                            <SoftBox className="flex flex-row rounded-md w-full border-slate-200 border-b-2 h-16 cursor-pointer select-none"  onClick={() => handleCollapse(ind) }> 
                                <SoftBox
                                    sx={{ width: 100}} 
                                    className={`flex text-ellipsis items-center justify-center flex-shrink-0 `}
                                >
                                    {!collapseStates[ind] ? (<KeyboardArrowRight size={100}/>) : (<KeyboardArrowDown size={100}/>)}
                                </SoftBox>
                                {
                                    Columns.map((row) => 
                                    row.topRow == undefined ? null : 
                                    row["field"] == "id" ?
                                    null : (
                                        <SoftBox
                                            sx={{ minWidth: row["size"] }} 
                                            className={`flex flex-col text-ellipsis items-center flex-shrink-0 `}
                                        >
                                            <SoftBox
                                                sx={{ minWidth: row["size"] }} 
                                                className={`flex-1 flex justify-center p-4 items-center flex-shrink-0 text w-full`}
                                            >
                                                <Typography variant="body2" className={`${ row["field"] == "action" ? "overflow-visible" : "overflow-hidden"} text-ellipsis whitespace-nowrap`}>
                                                    { row["field"] == "action" ? (
                                                        <>
                                                            <SoftButton variant="outlined" color="colorISMgreen" onClick={() => {handleCollapse(ind)}}>
                                                                view
                                                            </SoftButton>
                                                        </>
                                                    ) : rowA[row["field"]]}
                                                </Typography>
                                            </SoftBox>
                                        </SoftBox>
                                    ))
                                }
                            </SoftBox>
                            <Collapse in={collapseStates[ind]} sx={{minHeight: 500}}>
                                <SameDataTable
                                    Columns={Columns}
                                    Rows={Rows.filter((filter) => filter.name == rowA.name)}
                                />
                            </Collapse>
                        </>
                    ) : null)
                }
            </SoftBox> 
            <SoftBox className="w-full h-16 flex justify-end items-center">
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

                        {paginationStart + 1}-{paginationEnd >= (uniqueArray.length - 1) ? uniqueArray.length : (paginationEnd + 1)} of {uniqueArray.length} 

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
                            color="white"
                        />
                    </SoftButton>
                    <SoftButton
                        className="cursor-pointer"
                        color={"colorISMgreen"}
                        disabled={paginationEnd >= uniqueArray.length - 1}
                        sx={{
                            marginRight: 2,
                        }}
                        onClick={() => {
                            setPaginationStart(paginationStart + paginationSize.value);
                            setPaginationEnd(paginationEnd + paginationSize.value);
                            setCollapseStates(defaultCollapseStates);
                        }}
                    >
                        <KeyboardArrowRight
                            size={50}
                            color="white"
                        />
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    )
}