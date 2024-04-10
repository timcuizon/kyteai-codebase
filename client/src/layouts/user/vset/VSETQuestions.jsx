import * as React from "react";
// @mui material components
import Card from "@mui/material/Card";
import wavesWhite from "assets/images/shapes/waves-white.svg";
import tree from "assets/images/illustrations/tree.png";
import house from "assets/images/illustrations/house.png";
import person from "assets/images/illustrations/person.png";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

// Data
import SoftInput from "components/SoftInput";
import SoftButton from "../../../components/SoftButton/index";
import QuestionnaireModal from "layouts/user/vset/component/QuestionnaireModal.jsx";

import Grid from "@mui/material/Grid";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "hooks/useDebounce";

//Helpers
import { isLoggedIn, replaceLastCharacter } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { Controls } from "@dotlottie/react-player";
import Preloader from "PreLoader";
import { Question } from "react-bootstrap-icons";
import { red } from "@mui/material/colors";
import swal from "sweetalert";

function VSETQuestions() {
  // All Questionnaire Records
  const [typeOfObject, setTypeOfObject] = useState("Tree");
  const [objectId, setObjectId] = useState(1);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [options, setOptions] = useState([]);

  // utilities
  const [isLoading, setIsLoading] = useState();

  // Check if there's a user logged in &
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      //Fetch all students
      console.log("Fetching");
      // Call the fetchData function when the component mounts
      setIsLoading(true);
      fetchQuestionnaires();
    }
  }, []);

  //Request to fetch all the questionnaires
  async function fetchQuestionnaires() {
    // Web service for getting the drawing details
    const url = localStorage.getItem("samwonAPI") + `/api/VSET/GetObjectQuestionnaires`;

    const formData = new FormData();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getCookie("user_token"),
      },
    };

    try {
      await axios
        .post(url, formData, {
          ...config, // Include other configuration options if needed
        })
        .then((response) => {
          // Save all records of questionnaires
          console.log(response.data);
          setQuestionnaires(response.data.drawingObjectQuestionnaires);

          const updatedOptions = response.data.drawingObjectQuestionnaires.map((questions) => {
            try {
              const parsedOptions = JSON.parse(questions.options.replace(/\\/g, ""));
              return { id: questions.id, options: parsedOptions };
            } catch (error) {
              console.error(
                `Error parsing options for questionnaire with ID ${questions.id}:`,
                error
              );
              return null; // or handle the error in some way
            }
          });

          console.log("This is the result of the options: " + JSON.stringify(updatedOptions));
          setOptions(updatedOptions);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Catch Error: " + error);
          // Handle the error response
          if (error.response) {
            // The server responded with an error status code (e.g., 400, 404, 500, etc.)
            console.error("Error fetching data:", error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
          } else {
            // Something else went wrong
            console.error("Error fetching data:", error.message);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // function that will update the questionnaire upon editting
  function editQuestion(id, question) {
    // Checking the initial value of options
    // console.log(questionnaires[id].question);
    // saving the new edited value
    questionnaires[id].question = question;
    // Checking the new values
    // console.log("The Updated Questionnaire is: " + questionnaires[id].question);
  }

  // function that will update the questionnaire upon editting
  function editOptions(question_id, options_id, option) {
    // Checking the initial value of options
    // console.log(options[question_id].options[options_id]);
    // saving the new edited value
    options[question_id].options[options_id] = option;
    // Checking the new values
    // console.log("The Updated Option is: " + options[question_id].options[options_id]);
  }

  const handleVSETQuestionnaires = (object) => {
    setTypeOfObject(object);
    if (object == "Tree") {
      setObjectId(1);
    } else if (object == "House") {
      setObjectId(2);
    } else if (object == "Person") {
      setObjectId(3);
    }
  };

  //======
  //  Questionnaire Modal
  //======

  //state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Adding the new questionnaire to the array
  const handleNewQuestion = (new_question, new_options) => {
    setQuestionnaires((prevQuestionnaires) => {
      const nextId = prevQuestionnaires.length + 2;
      const newQuestion = {
        id: nextId,
        drawingObjectId: objectId,
        question: new_question,
        sequence: nextId,
      };
      return [...prevQuestionnaires, newQuestion];
    });

    setOptions((prevOptions) => {
      const nextId = prevOptions.length + 2;
      const newOptions = {
        id: nextId,
        options: new_options,
      };
      return [...prevOptions, newOptions];
    });

    swal({
      icon: "success",
      title: "Success",
      text: "New question added.",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  // Removing the questionnaire to the array
  const handleRemoveQuestion = (questionId, id) => {
    // confirmation
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this question.",
      dangerMode: true,
      buttons: ["Cancel", "Delete"],
    }).then((response) => {
      if (response) {
        const newArray_questionnaires = questionnaires.filter((_, i) => i !== questionId);
        setQuestionnaires(newArray_questionnaires);
        const newArray_options = options.filter((_, i) => i !== questionId);
        setOptions(newArray_options);
        //Delete question
        // alert(questionId + " | " + id);
        deleteQuestion(id);
      }
    });
  };

  async function deleteQuestion(questionId) {
    // Web service for getting the drawing details
    const url = localStorage.getItem("samwonAPI") + `/api/VSET/DeleteObjectQuestionnaires`;

    const formData = new FormData();
    // Append the fields to the FormData object
    formData.append("id", questionId);
    formData.append("updated_by", getCookie("email"));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getCookie("user_token"),
      },
    };

    try {
      await axios
        .post(url, formData, {
          ...config, // Include other configuration options if needed
        })
        .then((response) => {
          if (response.data.success) {
            swal({
              icon: "success",
              title: "Success",
              text: "Question deleted.",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
        .catch((error) => {
          console.log("Catch Error: " + error);
          // Handle the error response
          if (error.response) {
            // The server responded with an error status code (e.g., 400, 404, 500, etc.)
            console.error("Error fetching data:", error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
          } else {
            // Something else went wrong
            console.error("Error fetching data:", error.message);
          }
        });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  // Handler for adding new option in a question
  const handleNewOption = (questionIndex) => {
    // alert(questionIndex);
    // console.log(questionnaires[questionIndex]);
    // console.log(options[questionIndex]);
    // console.log(options[questionIndex].options);
    setOptions(
      (prevOptions) => {
        const updatedOptions = [...prevOptions];
        const nextId = updatedOptions[questionIndex]?.options.length || 0;
        updatedOptions[questionIndex].options = [
          ...(updatedOptions[questionIndex]?.options || []),
          `New option added ${nextId + 1}`,
        ];
        return updatedOptions;
      }
      // console.log(options[questionIndex].options);
    );
  };

  // Handler for removing option in a question
  const handleRemoveOption = (questionIndex, optionIndex) => {
    // alert(questionIndex + " | " + optionIndex);
    // confirmation
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this option!",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Delete"],
    }).then((response) => {
      if (response) {
        // Removing the option
        const newArrayOptions = options.map((question, index) => {
          if (index === questionIndex) {
            // If this is the question where we want to remove an option
            const updatedOptions = question.options.filter((_, i) => i !== optionIndex);
            return { ...question, options: updatedOptions };
          }
          return question;
        });

        setOptions(newArrayOptions);
        swal({
          icon: "success",
          title: "Success",
          text: "Option removed.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  };

  async function handleSaveQuestionnaires() {
    var id_str = "'";
    var drawing_id_str = "'";
    var questions_str = "'";
    var sequence_str = "'";
    var options_str = "'";

    questionnaires.forEach((question, index) => {
      id_str += question.id + ",";
      drawing_id_str += question.drawingObjectId + ",";
      questions_str += question.question + ",";
      sequence_str += question.sequence + ",";
      options_str += JSON.stringify(options[index]?.options || []) + "|";
    });
    id_str = replaceLastCharacter(id_str);
    drawing_id_str = replaceLastCharacter(drawing_id_str);
    questions_str = replaceLastCharacter(questions_str);
    sequence_str = replaceLastCharacter(sequence_str);
    options_str = replaceLastCharacter(options_str);
    console.log(id_str);
    console.log(drawing_id_str);
    console.log(questions_str);
    console.log(sequence_str);
    console.log(options_str);

    // const id_arr = questionnaires.map((question) => question.id);
    // const drawing_id_arr = questionnaires.map((question) => question.drawingObjectId);
    // const questions_arr = questionnaires.map((question) => question.question);
    // const sequence_arr = questionnaires.map((question) => question.sequence);

    // Web service for saving the questionnaires
    const url = localStorage.getItem("samwonAPI") + `/api/VSET/SaveObjectQuestionnaires`;

    const formData = new FormData();
    // Append the fields to the FormData object
    formData.append("id", id_str);
    formData.append("drawing_object_id", drawing_id_str);
    formData.append("question", questions_str);
    formData.append("options", options_str);
    formData.append("sequence", sequence_str);
    formData.append("updated_by", getCookie("email"));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getCookie("user_token"),
      },
    };

    try {
      await axios
        .post(url, formData, {
          ...config, // Include other configuration options if needed
        })
        .then((response) => {
          if (response.data.success) {
            swal({
              icon: "success",
              title: "Success",
              text: "Questionnaires saved successfully",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
        .catch((error) => {
          console.log("Catch Error: " + error);
          // Handle the error response
          if (error.response) {
            // The server responded with an error status code (e.g., 400, 404, 500, etc.)
            console.error("Error fetching data:", error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
          } else {
            // Something else went wrong
            console.error("Error fetching data:", error.message);
          }
        });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {!isLoading ? (
          <SoftBox py={3}>
            <SoftBox mb={3}>
              <Card>
                <SoftBox display="flex" justifyContent="start" alignItems="center" p={3}>
                  <Grid container lg={12} item xs={12} xl={12} md={12} sm={12}>
                    <Grid
                      display="flex "
                      justify="center"
                      alignItems="center"
                      item
                      lg={4}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <SoftBox p={2}>
                        <SoftTypography
                          variant="h5"
                          color="info"
                          sx={{ borderBottom: "3px #FDB813 solid" }}
                          className={"text-center"}
                        >
                          <b>Visual Self-Expression Tool (VSET) Questionnaires </b>
                        </SoftTypography>
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>

                {/* Drawing Options */}
                <SoftBox p={2}>
                  <Grid container spacing={3} className="w-full flex justify-center items-center">
                    {/* Draw-A-Tree */}
                    <Grid item xs={12} lg={3} sx={{ position: "relative" }}>
                      <SoftButton
                        color={typeOfObject == "Tree" ? "lightGreen" : "info"}
                        sx={{
                          width: "100%",
                          height: "100% !important",
                          paddingY: "30px",
                        }}
                        onClick={() => handleVSETQuestionnaires("Tree")}
                      >
                        <SoftBox>
                          <SoftBox
                            component="img"
                            src={wavesWhite}
                            alt="waves"
                            display="block"
                            position="absolute"
                            left={0}
                            width="100%"
                            height="100%"
                          />
                          <SoftBox alt="tree" width="100%" pt={3}>
                            <Player
                              autoplay
                              loop
                              src="https://lottie.host/9c494771-52d5-40a1-8483-d2ccc6fad7eb/0lhKv4auih.json"
                              style={{ height: "160px", width: "100%" }}
                            />
                          </SoftBox>
                          <SoftTypography
                            className="antialiased hover:subpixel-antialiased"
                            component="label"
                            variant="body2"
                            fontWeight="bold"
                            fontSize="base"
                            color="white"
                            m={1.5}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textTransform: "uppercase",
                            }}
                          >
                            Edit Draw-A-Tree Questionnaires
                          </SoftTypography>
                        </SoftBox>
                      </SoftButton>
                    </Grid>
                    {/* Draw-A-House */}
                    <Grid item xs={12} lg={3} sx={{ position: "relative", m: "5" }}>
                      <SoftButton
                        color={typeOfObject == "House" ? "lightGreen" : "info"}
                        sx={{
                          width: "100%",
                          height: "100% !important",
                          paddingY: "30px",
                        }}
                        onClick={() => handleVSETQuestionnaires("House")}
                      >
                        <SoftBox>
                          <SoftBox
                            component="img"
                            src={wavesWhite}
                            alt="waves"
                            display="block"
                            position="absolute"
                            left={0}
                            width="100%"
                            height="100%"
                          />
                          <SoftBox alt="house" width="100%" pt={3}>
                            <Player
                              autoplay
                              loop
                              src="https://lottie.host/a5cc7c8a-4893-4a02-9c86-2f94a883c74b/7ljSvbyZII.json"
                              style={{ height: "160px", width: "100%" }}
                            />
                          </SoftBox>
                          <SoftTypography
                            className="antialiased hover:subpixel-antialiased"
                            component="label"
                            variant="body2"
                            fontWeight="bold"
                            fontSize="base"
                            color="white"
                            m={1.5}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textTransform: "uppercase",
                            }}
                          >
                            Edit Draw-A-House Questionnaires
                          </SoftTypography>
                        </SoftBox>
                      </SoftButton>
                    </Grid>
                    {/* Draw-A-Person */}
                    <Grid item xs={12} lg={3} sx={{ position: "relative", m: "5" }}>
                      <SoftButton
                        color={typeOfObject == "Person" ? "lightGreen" : "info"}
                        sx={{
                          width: "100%",
                          height: "100% !important",
                          paddingY: "30px",
                        }}
                        onClick={() => handleVSETQuestionnaires("Person")}
                      >
                        <SoftBox>
                          <SoftBox
                            component="img"
                            src={wavesWhite}
                            alt="waves"
                            display="block"
                            position="absolute"
                            left={0}
                            width="100%"
                            height="100%"
                          />
                          <SoftBox alt="person" width="100%" pt={3}>
                            <Player
                              autoplay
                              loop
                              src="https://lottie.host/ea459919-abd0-41c8-8170-438a1b4f9eb6/8hg2FcbBNs.json"
                              style={{ height: "160px", width: "100%" }}
                            />
                          </SoftBox>
                          <SoftTypography
                            className="antialiased hover:subpixel-antialiased"
                            component="label"
                            variant="body2"
                            fontWeight="bold"
                            fontSize="base"
                            color="white"
                            m={1.5}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textTransform: "uppercase",
                            }}
                          >
                            Edit Draw-A-Person Questionnaires
                          </SoftTypography>
                        </SoftBox>
                      </SoftButton>
                    </Grid>
                  </Grid>
                </SoftBox>

                {/* Questionnaires */}
                <SoftBox display="flex" justifyContent="center" alignItems="center" p={3}>
                  <Grid
                    container
                    lg={12}
                    item
                    xs={12}
                    xl={12}
                    md={12}
                    sm={12}
                    justifyContent="start"
                  >
                    <Grid
                      display="flex "
                      justify="center"
                      alignItems="center"
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <SoftBox p={2} className={"block md:flex w-full"}>
                        <SoftTypography
                          variant="h5"
                          color="info"
                          sx={{ borderBottom: "3px #FDB813 solid" }}
                          className={"text-center mr-10"}
                        >
                          <b>Questionnaires ({typeOfObject})</b>
                        </SoftTypography>
                        <SoftBox className="my-5 md:my-0">
                          <SoftButton
                            variant="outlined"
                            color="info"
                            size="small"
                            onClick={() => setIsModalOpen(true)}
                            sx={{ marginLeft: "20px" }}
                          >
                            Add Question
                            <lord-icon
                              src="https://cdn.lordicon.com/zrkkrrpl.json"
                              trigger="hover"
                            ></lord-icon>
                          </SoftButton>
                        </SoftBox>
                        <SoftBox>
                          <SoftButton
                            variant="gradient"
                            color="info"
                            size="small"
                            onClick={() => handleSaveQuestionnaires()}
                            sx={{ marginLeft: "20px" }}
                          >
                            Save Changes
                            <lord-icon
                              src="https://cdn.lordicon.com/wwmtsdzm.json"
                              trigger="hover"
                              colors="primary:#ffffff,secondary:#ffffff"
                            ></lord-icon>
                          </SoftButton>
                        </SoftBox>
                        {/* Modal for adding question */}
                        {isModalOpen ? (
                          <>
                            <QuestionnaireModal
                              object={typeOfObject} // Title of the modal
                              isOpen={isModalOpen}
                              onClose={handleCloseModal}
                              onAddQuestion={handleNewQuestion}
                            />
                          </>
                        ) : null}
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>
                {/* Questionnaires */}
                <SoftBox className={"flex md:mx-20 mx-0 mb-10"} justifyContent="center">
                  <div className="md:w-3/4 w-full">
                    {questionnaires.map((question, index0) =>
                      question.drawingObjectId == objectId ? (
                        <>
                          {/* Question */}
                          <SoftBox pl={2} pr={2} key={question.id}>
                            <Accordion
                              disabledGutter="true"
                              id="panel1a-header"
                              sx={{
                                "&:before": {
                                  display: "none",
                                },
                                borderBottom: "2px white solid",
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon color="white" />}
                                aria-controls="panel1a-content"
                                style={{
                                  backgroundColor: "#1E4C2B",
                                  color: "white",
                                  borderColor: "2px white",
                                }}
                              >
                                <SoftTypography color={"white"}>
                                  <b className="ml-5">Q{question.sequence}: </b>
                                  <span
                                    contentEditable={true}
                                    // the on blur dom will run the function right after the element loses focus, which is typically after the user finishes entering their input.
                                    onBlur={(e) => editQuestion(index0, e.target.textContent)}
                                  >
                                    {question.question}
                                  </span>
                                </SoftTypography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <SoftTypography>
                                  {options.map((option, index) =>
                                    option.id == question.id ? (
                                      <>
                                        {option.options.map((opt, index2) => (
                                          <div className="flex mb-5">
                                            <SoftButton
                                              variant="outlined"
                                              color="error"
                                              size="small"
                                              onClick={() => handleRemoveOption(index0, index2)}
                                              sx={{ padding: "0px" }}
                                            >
                                              <lord-icon
                                                src="https://cdn.lordicon.com/drxwpfop.json"
                                                trigger="hover"
                                                colors="primary:#911710,secondary:#c71f16"
                                              ></lord-icon>
                                            </SoftButton>
                                            <li
                                              contentEditable={true}
                                              className="font-normal ml-5"
                                              onBlur={(e) =>
                                                editOptions(index, index2, e.target.textContent)
                                              }
                                            >
                                              {opt}
                                            </li>
                                          </div>
                                        ))}
                                      </>
                                    ) : null
                                  )}
                                  <SoftBox className={"flex justify-center"}>
                                    <SoftButton
                                      variant="outlined"
                                      color="info"
                                      size="small"
                                      onClick={() => handleNewOption(index0)}
                                      sx={{ marginLeft: "20px" }}
                                    >
                                      Add Option
                                      <lord-icon
                                        src="https://cdn.lordicon.com/zrkkrrpl.json"
                                        trigger="hover"
                                      ></lord-icon>
                                    </SoftButton>
                                    <SoftButton
                                      variant="gradient"
                                      color="error"
                                      size="small"
                                      onClick={() => handleRemoveQuestion(index0, question.id)}
                                      sx={{ marginLeft: "20px" }}
                                    >
                                      Delete Question
                                      <lord-icon
                                        src="https://cdn.lordicon.com/drxwpfop.json"
                                        trigger="hover"
                                        colors="primary:#ffffff,secondary:#ffffff"
                                      ></lord-icon>
                                    </SoftButton>
                                  </SoftBox>
                                </SoftTypography>
                              </AccordionDetails>
                            </Accordion>
                          </SoftBox>
                        </>
                      ) : null
                    )}
                  </div>
                </SoftBox>
              </Card>
            </SoftBox>
          </SoftBox>
        ) : (
          <Preloader />
        )}
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default VSETQuestions;
