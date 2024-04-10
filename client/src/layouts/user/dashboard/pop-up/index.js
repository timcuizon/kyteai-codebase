// @mui material components
import { useState } from "react";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

//Cards
import Card from "@mui/material/Card";
import SoftButton from "../../../../components/SoftButton/index";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ReactQuill from "react-quill";
import Creatable, { useCreatable } from 'react-select/creatable';

import Select from "react-select";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { TextField } from "@mui/material";
import { WidthFull } from "@mui/icons-material";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const modality = [
  { value: "f2f", label: "Face to Face" },
  { value: "gmeet", label: "Online Consultation" },
];


const gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'lgbtq', label: 'LGBTQ' },

]

function PopUpProfileInformation({ open, onClose }) {
    const [userConcern, setUserConcern] = useState("");
    const [userModality, setUserModality] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
  
    const [noteValue, setNoteValue] = useState("");
    
    const [formData, setFormData] = useState({
      name: '',
      id: '',
      grade: '',
      section: '',
      email: '',
    });
  
    const [isRecordAdded, setIsRecordAdded] = useState(false);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleAdd = () => {
      // You can perform validation here if needed
      // For simplicity, let's assume all fields are required
      onAdd(formData);
      setIsRecordAdded(true); // Set the flag to indicate that the record has been added
        onClose();
    };

    const closeForm = () => {
        setIsFormOpen(false);
      };


  return (

    <Dialog open={open} onClose={onClose} fullWidth={ true } maxWidth={"lg"}>
      <DialogContent>
      <SoftBox>
      {/* FORM  */}
      <form action="" id="set-up-profile-form" method="post">
      <Card>
        <SoftBox position="relative" height="100%" p={2}>
          <SoftBox display="flex" flexDirection="column" height="100%" py={2} borderRadius="lg">
            <SoftBox mb={1}>
              <SoftTypography color="info" component="label" variant="h5" fontWeight="bold">
                Setup Account Details
              </SoftTypography>
            </SoftBox>
            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox mb={1}>
                  <SoftTypography
                    color="dark"
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    User Type
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} className="w-[90%]">
                  <SoftInput type="name" placeholder="Name" value="Student" readonly="readonly" />
                </SoftBox>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox mb={1}>
                  <SoftTypography
                    color="dark"
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Email Address
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} className="w-[90%]">
                  <SoftInput
                    type="email"
                    placeholder="email"
                    value="eg. juandelacruz.k11840583@ism.edu.ph"
                    readonly="readonly"
                    color="gray"
                  />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox mb={1}>
                  <SoftTypography
                    color="dark"
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Given Name
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} className="w-[90%]">
                  <SoftInput type="name" placeholder="Given Name" />
                </SoftBox>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox mb={1}>
                  <SoftTypography
                    color="dark"
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Family Name
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} className="w-[90%]">
                  <SoftInput type="name" placeholder="name" />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography
                    color="dark"
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Date of Birth
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} className="w-[90%]">
                    <SoftInput type="date" placeholder="Date" />
                  </SoftBox>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox mb={1}>
                  <SoftTypography
                    color="dark"
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Gender
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} className="w-[90%]">
                <Creatable
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? '#296b3b' : '#296b3b',
                      boxShadow: state.isFocused ? '0 0 0 1px #296b3b' :' null',
                      minHeight: '32px',  // Adjust the height to make it smaller
                      fontSize: '14px',   // Adjust the font size
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#1E4C2B' : '#ffffff',
                      color: state.isFocused ? '#ffffff' : '#000000',  // Corrected this line
                      minHeight: '32px',  // Adjust the height to make it smaller
                      fontSize: '14px',   // Adjust the font size
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: '#000000 !important',  // Set text color when an option is selected
                      
                    }),
                  }}

                  isClearable
                    options={gender}
                    value={selectedGender}
                    onChange={(selectedOption) => setSelectedGender(selectedOption)}
                    placeholder="Select a gender"
                    size="small"
                  />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox className="w-[90%]">
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Contact Number
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox>
                    <SoftInput type="tel" placeholder="Contact Number" />
                  </SoftBox>
                </SoftBox>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox className="w-[90%]" mb={2}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Address
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox>
                    <SoftInput type="name" placeholder="Address" />
                  </SoftBox>
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
              <Grid item lg={6} md={12} sm={12} xs={12}></Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox className="w-[90%]" justifyContent="right" display="flex" alignItems="center" >
                  <SoftButton variant="gradient" color="info" size="medium" onClick={onClose}>
                    Save Changes
                  </SoftButton>
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
        </SoftBox>
      </Card>
      </form>
    
    </SoftBox>

      </DialogContent>
    </Dialog>
  );
}

export default PopUpProfileInformation;
