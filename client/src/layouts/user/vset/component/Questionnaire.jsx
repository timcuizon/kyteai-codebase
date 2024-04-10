// @mui material components
import Divider from "@mui/material/Divider";
import React from "react";
import SoftButton from "components/SoftButton/index.js";
import SoftBox from "components/SoftBox/index.js";
import SoftTypography from "components/SoftTypography/index.js";

import Information from "examples/Icons/Information";
import Modal from "./Modal";
import { Switch, Icon } from "@mui/material";
import { PDFDownloadLink, Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import PDFVSET from "components/PDF/pdfVSET.js";

import { useState } from "react";
import { getCookie } from "helpers/CookieHelper";

import Preloader from "PreLoader";
import TellUsMoreModal from "layouts/user/vset/component/TellUsMoreModal.jsx";

import axios from "axios";
import { useEffect } from "react";

function Questionnaire({ drawingId, questions1, answers_value, interpretation_value, isEligible }) {
  const questions = questions1;

  // Initialize state for selected options
  const [selectedOptions, setSelectedOptions] = useState(questions.map(() => ""));
  const [isLoading, setIsLoading] = useState(false);

  // Interpretation
  const [interpret, setInterpret] = useState(false);

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [interpretation, setInterpretation] = useState(interpretation_value);
  // console.log("interpretation =" + interpretation);
  // Checking if the is just for viewing
  const updatedAnswers = [];

  //PDF
  const [pdfData, setData] = useState("");
  const [saveClicked, setSaveClicked] = useState(false);

  useEffect(() => {
    if (drawingId != "new") {
      answers_value.map((answer_val, index) => {
        console.log("Saving all answers: " + answer_val.answer);
        updatedAnswers[index] = answers_value[index].answer;
        setAnswers(updatedAnswers);
      });
    }
  }, []);

  // Function to handle checkbox selection
  const handleCheckboxChange = (questionIndex, optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedOptions);
  };

  // Function to save an answer for a question
  const saveAnswer = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };
  // Function to save the interpretation
  const handleInterpretationChange = (event) => {
    setInterpretation(event.target.value);
  };

  // Function to validate all the answers
  const validateAnswers = () => {
    for (const answer of answers) {
      if (!answer) {
        return false; // If any answer is empty, return false
      }
    }
    return true; // All answers are filled
  };

  // Function to clear all selected options and answers
  const clearAllAnswers = () => {
    setSelectedOptions(questions.map(() => ""));
    setAnswers(Array(questions.length).fill(""));
    setInterpretation("");
  };

  // Function that handles Submit behavior
  let handleVSETpdf;

  const handleSubmit = () => {
    setIsLoading(true);
    const allQuestionsAnswered = validateAnswers();
    if (allQuestionsAnswered) {
      // All questions have been answered, you can proceed with submission.

      // Define handleVSETpdf here
      handleVSETpdf = async () => {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        };
        var formData = new FormData();

        formData.append("id", drawingId);

        try {
          const response = await axios.post(
            localStorage.getItem("samwonAPI") + `/api/VSET/GetVSETpdf`,
            formData,
            {
              headers: headers,
            }
          );
          console.log(response.data);
          setData(response.data);
        } catch (err) {}
      };

      // Handle your submission logic here.
      console.log(interpretation);
      if (!interpretation) {
        // Handle the case when interpretation is blank
        swal({
          title: "Oopps..",
          text: "Please enter an interpretation before submitting.",
          icon: "error",
          dangerMode: true,
        });
        setIsLoading(false);
        return;
      }
      var drawing_object_questionnaire_ids = "'";
      var answers_str = "'";

      questions.forEach((question, index) => {
        drawing_object_questionnaire_ids += question.id + ",";
        answers_str += answers[index] + ",";
      });
      drawing_object_questionnaire_ids = replaceLastCharacter(drawing_object_questionnaire_ids);
      answers_str = replaceLastCharacter(answers_str);
      console.log("results of concat strings");
      console.log(drawing_object_questionnaire_ids);
      console.log(answers_str);
      console.log("Assesment ID: " + drawingId);

      // Saving all the answers
      saveAnswers(drawingId, drawing_object_questionnaire_ids, answers_str, interpretation).then(
        () => {
          setIsLoading(false);
          swal({
            icon: "success",
            title: "Success",
            text: "Changes saved.",
            showConfirmButton: false,
            timer: 1500,
          });
          // Call handleVSETpdf here
          handleVSETpdf();
          setSaveClicked(true);
        }
      );
    } else {
      swal({
        title: "Oopps..",
        text: "Please answer all questions before submitting.",
        icon: "error",
        dangerMode: true,
      });
      // alert("Please answer all questions before submitting.");
      setIsLoading(false);
    }
  };

  //open icon questionnaire
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function replaceLastCharacter(x) {
    if (x.length > 0) {
      const updatedString = x.slice(0, -1) + "'"; // Replace 'X' with the character you want
      return updatedString;
    }
  }

  async function saveAnswers(
    drawing_id,
    drawing_object_questionnaire_ids,
    answers_str,
    interpretation
  ) {
    // Creating a request
    // Web service for saving the answers url
    const url = localStorage.getItem("samwonAPI") + `/api/VSET/SaveAnswers`;

    const formData = new FormData();
    formData.append("drawing_id", drawing_id);
    formData.append("drawing_object_questionnaire_ids", drawing_object_questionnaire_ids);
    formData.append("answers", answers_str);
    formData.append("interpretation", interpretation);
    formData.append("updated_by", getCookie("email"));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getCookie("user_token"),
      },
    };
    console.log("answers are: " + answers_str);
    await axios
      .post(url, formData, {
        ...config, // Include other configuration options if needed
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("Error on Saving Results to Model: " + error);
      });
  }

  return (
    <>
      {!isLoading ? (
        <>
          <div className="flex-col w-full">
            {/* Process Title */}
            <section>
              <div className="lg:flex block justify-between">
                <div className="flex items-center">
                  <SoftBox p={1}>
                    <SoftTypography
                      variant="h6"
                      color="info"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                    >
                      Tell us more
                    </SoftTypography>
                  </SoftBox>
                  <button
                    className="flex items-center p-0 m-0"
                    type="button"
                    onClick={handleClickOpen}
                  >
                    <TellUsMoreModal
                      title="Tell Us More" // Title of the modal
                      content="Sam Won still needs your perspective. This section will help Sam Won to further understand and gain more insights about the drawing. Answering these questions will help Sam Won to further widen his capability." // Content Modal
                      open={open}
                      handleClose={handleClose}
                    />
                  </button>
                </div>
                {isEligible ? (
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                    <Switch checked={interpret} onChange={() => setInterpret(!interpret)} />{" "}
                    <SoftBox p={1}>
                      <SoftTypography variant="h6" color="info">
                        Interpret Image
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                ) : (
                  <></>
                )}
              </div>
              <Divider />
            </section>
            {interpret ? (
              <section className=" h-[32rem] overflow-x-hidden overflow-y-visible">
                <SoftBox p={1}>
                  <SoftTypography variant="h6" color="info">
                    Image Interpretation
                  </SoftTypography>
                </SoftBox>

                <textarea
                  id="message"
                  rows="4"
                  value={interpretation}
                  onChange={handleInterpretationChange}
                  className="block p-2.5 w-full h-[90%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-themeGreen4 focus:border-themeGreen4"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </section>
            ) : (
              <section className=" h-[32rem] overflow-x-hidden overflow-y-visible">
                {questions1.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-[#f8f9fa] w-full px-5 py-2 rounded-lg shadow-md my-5"
                  >
                    <span className="font-themeHeader text-black">
                      {question.question} <span className="text-red-600">*</span>
                    </span>
                    <hr></hr>{" "}
                    <fieldset className="flex lg:flex-row flex-col w-full lg:gap-5 mt-5 flex-wrap">
                      <legend className="sr-only">Image Versions</legend>
                      {JSON.parse(question.options).map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center mb-4">
                          <input
                            id={`q${question + 1}-option-${optionIndex + 1}`}
                            type="radio"
                            checked={option == answers[index]}
                            onChange={() => {
                              handleCheckboxChange(index, option);
                              saveAnswer(index, option);
                            }}
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-themeGreen4 focus:bg-themeGreen4 checked:bg-themeGreen4"
                          />
                          <label
                            htmlFor={`q${index + 1}-option-${optionIndex + 1}`}
                            className="block ml-2 font-medium text-gray-900 dark:text-gray-300"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </fieldset>
                  </div>
                ))}
              </section>
            )}
            {/* Navigation */}
            <hr></hr>
            <section className="mt-5 w-full flex flex-row justify-end items-end gap-5">
              <SoftBox>
                {pdfData ? (
                  <SoftButton variant="contained" color="info">
                    <Icon>download</Icon>&nbsp;
                    <PDFDownloadLink
                      document={<PDFVSET data={pdfData} />}
                      fileName={"VSET Result - " + drawingId}
                      onClick={handleVSETpdf}
                    >
                      Download
                    </PDFDownloadLink>
                  </SoftButton>
                ) : null}
              </SoftBox>
              <div className="w-auto mb-1">
                <SoftButton
                  variant="outlined"
                  color="error"
                  size="small"
                  type="button"
                  onClick={clearAllAnswers}
                >
                  Clear All
                </SoftButton>
              </div>
              <div className="w-auto mb-1">
                <SoftButton
                  variant="outlined"
                  color="info"
                  size="small"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save
                </SoftButton>
              </div>
              {/* <div className="w-auto mb-1">
                <SoftButton
                  variant="gradient"
                  color="info"
                  size="small"
                  type="button"
                  onClick={handleSubmit}
                >
                  Export
                </SoftButton>
              </div> */}
            </section>
          </div>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default Questionnaire;
