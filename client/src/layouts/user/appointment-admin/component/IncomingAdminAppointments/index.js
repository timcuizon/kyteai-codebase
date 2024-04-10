import { Card } from "@mui/material";
import axios from "axios";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import AppointmentCard from "layouts/user/appointment-admin/appointment-list/component/AppointmentCard/index.js";
import NoActiveAppointment from "assets/images/Events-rafiki.svg";
import dayjs from "dayjs";
import Preloader from "PreLoader";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import { getCookie } from "helpers/CookieHelper";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export default function IncomingAdminAppointments({isDashboard, filter}){    
    const [incomingApp, setIncomingApp] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect( () => {

        var currentFilter = "default";

        if (filter != ""){
            currentFilter = filter;
        }

        const formData = new FormData();
  
        formData.append("email", getCookie("email"));

        const headers = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getCookie("user_token"),
          },
        };
        
        var appointmentFetch = axios.post(localStorage.getItem("samwonAPI") + `/api/Appointment/GetProfessionalAppointment`, formData, headers);
  
        if(getCookie("ie") == 1){
          appointmentFetch = axios.get(localStorage.getItem("samwonAPI") + `/api/Appointment/GetAppointment`);
        }
            
        appointmentFetch
            .then((response) => {
                const appArray = [];

                response.data.forEach((row) => {

                    const rawDate = parseInt(dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("YYYYMMDD"));

                    const rowDate = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY");
                    const rowTimeStart = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("hh:mm a");
                    const rowTimeEnd = dayjs(row["scheduleEnd"], "DD/MM/YYYY hh:mm a").format("hh:mm a");

                    const referenceNum = row["id"] + "";

                    const rawToday = parseInt(dayjs().format("YYYYMMDD"));

                    var rowFilter = true;
                    if(currentFilter == "Approved"){
                        rowFilter = row["status"] == "Approved";
                    }
                    else if(currentFilter == "Pending"){
                        rowFilter = row["status"] == "Pending";
                    }

                    if (
                        rawToday <= rawDate &&
                        row.status != "Cancelled" &&
                        row.status != "Archived" && 
                        rowFilter
                    ) {
                        appArray.push({
                            id: row["id"],
                            rawDate: rawDate,
                            refNum: referenceNum,
                            role: row["role"],
                            picture: row["picture"],
                            name: row["name"],
                            email: row["email"],
                            scheduleDate: rowDate,
                            scheduleTime: rowTimeStart + "-" + rowTimeEnd,
                            status: row["status"],
                        });
                    }
                });
                appArray.sort((a, b) => a.rawDate - b.rawDate);

                setIncomingApp(appArray);

                setLoading(false)
            }).catch(error => {
                console.log(error)
            })
    }, [setIncomingApp])

    const navigate = useNavigate();

    return loading ? (
        <Preloader />
    ) : (
        <>
            {isDashboard ? null : (
                <Card sx={{ height: "10%", padding: "20px", marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                    <SoftButton
                        variant={"contained"}
                        color={"info"}
                        onClick={() => {
                            navigate("/appointments/schedule-form")
                        }}
                    >
                        Create Appointment
                    </SoftButton>
                </Card>
            )}
            <Card sx={{ width: "100%", padding: "20px 20px 0px 20px", marginBottom: "2rem" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <SoftTypography
                color="info"
                component="label"
                variant="h6"
                fontWeight="bold"
                sx={{ borderBottom: "3px #FDB813 solid" }}
                >
                Upcoming {filter} Appointment
                </SoftTypography>
            </SoftBox>
            {incomingApp != "" ? (
                incomingApp.map((app, index) => (
                <>
                    {index < (filter != "" ? 7 : 6)
                    
                    ? (
                    <AppointmentCard
                        key={app.id}
                        Role={app.role}
                        Image={app.picture}
                        Title={app.name}
                        Email={app.email}
                        Date={app.scheduleDate}
                        Time={app.scheduleTime}
                        Status={app.status}
                        refNum={app.id}
                        // Image={getCookie("picture")}
                    />
                    ) : null}
                </>
                ))
            ) : (
                // Edit Barcos : ADD SVG
                <>
                <SoftBox>
                    <SoftBox
                    component="img"
                    src={NoActiveAppointment}
                    alt="waves"
                    left={0}
                    width="100%"
                    height="380px"
                    py={2}
                    pr={0.5}
                    />

                    <SoftTypography
                    variant="h6"
                    color="info"
                    fontWeight="bold"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                    "No Active Appointment"
                    </SoftTypography>
                </SoftBox>
                </>
            )}
            </Card>
        </>
    )
}