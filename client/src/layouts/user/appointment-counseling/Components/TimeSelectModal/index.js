import { Dialog, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Creatable, { useCreatable } from "react-select/creatable";
import SoftTypography from "components/SoftTypography";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  


export default function TimeSelectModal ({
    open,
    onClose,
    selectedDate,
    title,
    startHourOption,
    selectedStartHour,
    handleStartChange,
    startMinOption,
    selectedStartMin,
    handleStartMinChange,
    startAMPMoption,
    selectedStartAMPM,
    handleStartAMPMchange,
    endHourOption,
    selectedEndHour,
    handleEndHourChange,
    endMinOption,
    selectedEndMin,
    handleEndMinChange,
    endAMPMoption,
    selectedEndAMPM,
    handleEndAMPMchange,
    handleSubmitClick,
    isEndAmDisabled
}) {
    return (
        
      <BootstrapDialog
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true} //size
        maxWidth={"lg"}
        >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <SoftBox padding={3} mt={2} mb={2}sx={{height:"400px"}}>
            <SoftBox>
                <SoftTypography color="colorISMgreen" gutterBottom fontWeight="bold" textAlign="center">
                    You selected <span style={{color:"#FDB813"}}>"{selectedDate}"</span> to <span style={{color:"#FDB813"}}>{title}</span>
                </SoftTypography>

                {/* Start time setting */}
            </SoftBox>
            <SoftBox m={2} display="flex" justifyContent="center" alignItems="center"> 
                <SoftTypography color="colorISMgreen" gutterBottom fontWeight="bold" display="flex" justifyContent="center" alignItems="center">
                Start Time
                </SoftTypography>
            </SoftBox>
            <Grid container spacing={2} display={"center"} justifyContent={"center"} alignItems={"center"}>
                <Grid item lg={3} xs={12} md={12}>

                {/* Start Hour */}
                
                <Creatable
                    styles={{
                    control: (provided, state) => ({
                        ...provided,
                        borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                        boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                        minHeight: "32px", // Adjust the height to make it smaller
                        fontSize: "14px", // Adjust the font size
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
                    }),
                    menu: (provided) => ({
                        ...provided,
                        overflow: "auto",
                        maxHeight: "150px"
                    })
                    }}
                    //onWheel={handleWheel}
                    isClearable={false}
                    isSearchable={false}
                    options={startHourOption}
                    value={selectedStartHour}
                    onChange={handleStartChange}
                    placeholder="Hour"
                    size="smaller"
                />
                </Grid>
                <Grid  item lg={3} xs={12} md={12}>
                <Creatable
                    styles={{
                        control: (provided, state) => ({
                        ...provided,
                        borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                        boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                        minHeight: "32px", // Adjust the height to make it smaller
                        fontSize: "14px", // Adjust the font size
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
                        }),
                    }}
                    isClearable={false}
                    isSearchable={false}
                    options={startMinOption}
                    value={selectedStartMin}
                    onChange={handleStartMinChange}
                    placeholder="Minute"
                    size="smaller"
                    />
                </Grid>
                <Grid  item lg={3} xs={12} md={12}>
                <Creatable
                    styles={{
                        control: (provided, state) => ({
                        ...provided,
                        borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                        boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                        minHeight: "32px", // Adjust the height to make it smaller
                        fontSize: "14px", // Adjust the font size
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
                        }),
                    }}
                    options={startAMPMoption}
                    value={selectedStartAMPM}
                    isSearchable={false}
                    onChange={handleStartAMPMchange}
                    placeholder="AM / PM"
                    size="smaller"
                    />
                </Grid>
                
                
            </Grid>
          
            

            {/* END TIME */}

            { selectedStartHour != "" && selectedStartMin != "" ? (
                <>
                
                    <SoftBox m={2} display="flex" justifyContent="center" alignItems="center"> 
                        <SoftTypography color="colorISMgreen" gutterBottom fontWeight="bold" display="flex" justifyContent="center" alignItems="center">
                        End Time
                        </SoftTypography>
                    </SoftBox>
                    <Grid container spacing={2} display={"center"} justifyContent={"center"} alignItems={"center"} disabled={true}>
                        <Grid item lg={3} xs={12} md={12} >
                        <Creatable
                            styles={{
                            control: (provided, state) => ({
                                ...provided,
                                borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                                boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                                minHeight: "32px", // Adjust the height to make it smaller
                                fontSize: "14px", // Adjust the font size
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
                            }),
                            menu: (provided) => ({
                                ...provided,
                                overflow: "auto",
                                maxHeight: "150px"
                            })
                            }}
                            isClearable={false}
                            isSearchable={false}
                            options={endHourOption}
                            value={selectedEndHour}
                            onChange={handleEndHourChange}
                            placeholder="Hour"
                            size="smaller"
                        />
                        </Grid>
                        <Grid item lg={3} xs={12} md={12} >
                        <Creatable
                            styles={{
                                control: (provided, state) => ({
                                ...provided,
                                borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                                boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                                minHeight: "32px", // Adjust the height to make it smaller
                                fontSize: "14px", // Adjust the font size
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
                                }),
                            }}
                            isClearable={false}
                            isSearchable={false}
                            options={endMinOption}
                            value={selectedEndMin}
                            onChange={handleEndMinChange}
                            placeholder="Minute"
                            size="smaller"
                            />
                        </Grid>
                        <Grid item lg={3} xs={12} md={12} >
                        <Creatable
                            mb={2}
                            styles={{
                                control: (provided, state) => ({
                                ...provided,
                                borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                                boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                                minHeight: "32px", // Adjust the height to make it smaller
                                fontSize: "14px", // Adjust the font size
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
                                }),
                            }}
                            isDisabled={isEndAmDisabled}
                            options={endAMPMoption}
                            value={selectedEndAMPM}
                            isSearchable={false}
                            onChange={handleEndAMPMchange}
                            placeholder="AM / PM"
                            size="smaller"
                            />
                        </Grid>
                    </Grid>
                    <Divider/>
                </>
            ) : null}
            
            {selectedStartHour != "" && selectedStartMin != "" && selectedEndHour != "" && selectedEndMin != "" ? (
                <SoftBox display="flex" justifyContent="center" alignItems="center" style={{ marginBottom: '40px' }} >
                    <SoftButton variant="gradient" color={"info"} onClick={handleSubmitClick} style={{ marginBottom: '30px' }} >
                        Submit Schedule
                    </SoftButton>
                </SoftBox>

          
            ): null}
           
        </SoftBox>
     
        </BootstrapDialog>
    )
}