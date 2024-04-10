import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftAlert from "components/SoftAlert";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

function AddStudentForm({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    grade: "",
    section: "",
    email: "",
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"lg"}>
      <DialogContent>
        <SoftBox>
          <Card>
            <SoftBox position="relative" height="100%" p={2}>
              <SoftBox display="flex" flexDirection="column" height="100%" py={2} borderRadius="lg">
                <SoftBox mb={1}>
                  <SoftTypography color="info" component="label" variant="h5" fontWeight="bold">
                    Add Student
                  </SoftTypography>
                </SoftBox>
                <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                  <Grid item lg={6}>
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
                      <SoftInput
                        type="name"
                        placeholder="Name"
                        value="Student"
                        readonly="readonly"
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item lg={6}>
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
                  <Grid item lg={6}>
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
                  <Grid item lg={6}>
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
                  <Grid item lg={6}>
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
                  <Grid item lg={6}>
                    <SoftBox mb={1}>
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Sex
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftInput type="name" placeholder="Sex" />
                    </SoftBox>
                  </Grid>
                </Grid>
                <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                  <Grid item lg={6}>
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
                  <Grid item lg={6}>
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
                <Grid item lg={4} display="flex" justifyContent="end" alignItems="center">
                  <SoftBox mr={1}>
                    <SoftButton
                      variant="gradient"
                      color="error"
                      size="medium"
                      onClick={onClose}
                    >
                      Cancel
                    </SoftButton>
                  </SoftBox>
                  <SoftBox mr={5} > 
                    <SoftButton variant="gradient" color="info" size="medium" >
                      Save
                    </SoftButton>
                  </SoftBox>
                </Grid>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentForm;
