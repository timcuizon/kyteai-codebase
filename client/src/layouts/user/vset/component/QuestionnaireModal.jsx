import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Information from "examples/Icons/Information.js";
import Icon from "@mui/material/Icon";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import { Divider, Grid } from "@mui/material";
import SoftButton from "components/SoftButton";
import { useState, useRef } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function QuestionnaireModal({ object, isOpen, onClose, onAddQuestion }) {
  const [question, setQuestion] = useState("New Question");
  const [options, setOptions] = useState(["Option 1", "Option 2"]);

  const addOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  const handleAddQuestion = () => {
    console.log("This is from child's " + question);
    console.log("This is from child's " + options);
    onAddQuestion(question, options);
    onClose();
  };

  const handleAddOption = (index, option_value) => {
    options[index] = option_value;
  };

  const handleRemoveOption = (optionId) => {
    alert(optionId);
    const newArrayOptions = options.filter((_, i) => i !== optionId);
    setOptions(newArrayOptions);
  };

  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        fullWidth={true} //size
        maxWidth={"md"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Question for Draw-A-{object}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {/* Forms */}
          <SoftTypography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {/*==== Question */}
              <SoftBox>
                <SoftBox mb={1}>
                  <SoftTypography
                    color="dark"
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Question
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} className="w-full">
                  <SoftInput
                    type="name"
                    placeholder={question}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </SoftBox>
              </SoftBox>
              <Divider />
              {/*==== Options Section */}
              <SoftBox>
                {/* Option */}
                <SoftBox>
                  {/* Options Section */}
                  {options.map((option, index) => (
                    <SoftBox mb={1}>
                      <div className="flex my-5">
                        <SoftButton
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleRemoveOption(index)}
                          sx={{ padding: "0px" }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            colors="primary:#911710,secondary:#c71f16"
                          ></lord-icon>
                        </SoftButton>
                        <SoftBox key={index} className={"ml-3"}>
                          <SoftTypography
                            color="dark"
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                          >
                            Option {index + 1} <span className="text-red-600">*</span>
                          </SoftTypography>
                        </SoftBox>
                      </div>
                      <SoftBox mb={1} className="w-full">
                        <SoftInput
                          type="name"
                          placeholder={option}
                          onChange={(e) => handleAddOption(index, e.target.value)}
                          required
                        />
                      </SoftBox>
                    </SoftBox>
                  ))}
                </SoftBox>
                {/* Add More option button */}
                <SoftBox className={"flex justify-center"}>
                  <SoftButton
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={addOption}
                    sx={{ marginLeft: "20px" }}
                  >
                    Add Option
                    <lord-icon
                      src="https://cdn.lordicon.com/zrkkrrpl.json"
                      trigger="hover"
                    ></lord-icon>
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </Grid>
          </SoftTypography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddQuestion}>
            Add Question
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
export default QuestionnaireModal;
