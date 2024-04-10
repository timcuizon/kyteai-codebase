// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftButton from "components/SoftButton/index.js";
import Footer from "examples/Footer";

import UserInfo from "./component/UserInfo.jsx";
import DrawingInfo from "./component/DrawingInfo.jsx";
import DrawingTypeInfo from "./component/DrawingTypeInfo.jsx";
import Modal from "./component/Modal.jsx";
import Questionnaire from "./component/Questionnaire.jsx";
import Stats from "./component/Stats.jsx";
import { isLoggedIn } from "helpers/helpers.js";
import axios from "axios";
import { getCookie } from "helpers/CookieHelper.js";

import Information from "examples/Icons/Information.js";
import Preloader from "PreLoader.js";

import React, { useState, useRef, useEffect } from "react";
import { json, useLocation } from "react-router-dom";
import io from "socket.io-client";

import SoftTypography from "components/SoftTypography/index.js";
import SoftBox from "components/SoftBox/index.js";
import StatsModal from "./component/StatsModal.jsx";
import ConfidenceModal from "layouts/user/vset/component/ConfidenceRateModal.jsx";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SamWonGreat from "assets/images/logos/Artboard 5.png";

function VSET() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const object = searchParams.get("object");
  const email = searchParams.get("email");

  const [studentData, setStudentData] = useState(null);
  const [isEligible, setIsEligible] = useState(false);

  // Drawing Images
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);
  const [detectedFilteredImage, setDetectedFilteredImage] = useState(null);

  // Questionnaires
  const [assessment_id, setAssessment_id] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [interpretation, setInterpretation] = useState("");

  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDetected, setIsDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showStatistics, setShowStatistics] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");

  // Model Results
  const [stats, setStats] = useState([]);
  const [confidenceDetection, setConfidenceDetection] = useState(0);
  const [confidenceFilteredDetection, setConfidenceFilteredDetection] = useState(0);

  const fileInputRef = useRef(null);

  const socket = io("http://127.0.0.1:5000");

  const [currentLoadingTextIndex, setCurrentLoadingTextIndex] = useState(0);

  const loadingTexts = [
    "Analyzing the image...",
    "Just a moment longer...",
    "Fetching the latest data...",
    "Hold on for a second...",
    "Stay with us...",
    "Gathering information for you...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 10000); // Change the interval duration as needed (in milliseconds)

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  const currentLoadingText = loadingTexts[currentLoadingTextIndex];

  // Check if there's a user logged in & Fetch student's record
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      // Fetch the student record
      fetchStudentRecord();

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      socket.on("loading_percentage", (data) => {
        setLoadingPercentage(data.percentage);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  //=========== Get student's Detail
  // Create a new FormData object
  const formData = new FormData();
  // Append the fields to the FormData object
  formData.append("Email", email);
  formData.append("Professional_Email", getCookie("email"));

  // Make a POST request to the API endpoint with FormData as the request body
  const fetchStudentRecord = async () => {
    try {
      const response = await axios.post(
        localStorage.getItem("samwonAPI") + `/api/VSET/StudentDetails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getCookie("user_token"),
          },
        }
      );

      if (response.data !== "") {
        // Success return
        setStudentData(response.data.vsetRecords);

        if (response.data.isEligible == "1") {
          setIsEligible(true);
        }

        // Getting the existing drawing details if this is not a new drawing record
        if (id != "new") {
          getDrawingDetails(id).then(() => {
            setIsLoading(false);
            setShowStatistics(true);
          });
        } else {
          setIsLoading(false);
        }
      } else {
        // No return means there's an anomaly in email
        window.location.replace("/pre-vset");
      }
    } catch (error) {
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
    }
  };

  let loadingAnimation;
  if (isLoading) {
    // Replace this with your actual loading animation component or logic
    loadingAnimation = (
      <SoftBox
        style={{
          display: "flex",
          flexDirection: "column", // Display items in a column layout
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Set the height of the container to full viewport height
        }}
      >
        <SoftBox style={{ width: 150, height: 150 }}>
          {" "}
          {/* Adjust the dimensions of the container */}
          <CircularProgressbar
            value={loadingPercentage}
            text={typeof loadingPercentage === "number" ? `${Math.round(loadingPercentage)}%` : ""} // Conditionally render numeric value only
            strokeWidth={8} // Adjust the thickness of the progress bar
            styles={{
              // Customize the root svg element
              root: { width: "100%", height: "100%" },
              // Customize the path, trail, and text
              path: { stroke: "#FDB813" },
              trail: { stroke: "#1E4C2B" },
              text: { fontSize: "20px", fill: "#1E4C2B" },
            }}
          />
        </SoftBox>
        {!isNaN(loadingPercentage) && (
          <SoftTypography style={{ fontSize: 16, color: "#1E4C2B", marginTop: "10px" }}>
            {currentLoadingText}
          </SoftTypography>
        )}{" "}
        {/* Display the current loading text */}
        {typeof loadingPercentage === "string" && (
          <SoftTypography style={{ fontSize: 16, color: "#1E4C2B", marginTop: "10px" }}>
            {loadingPercentage}
          </SoftTypography>
        )}{" "}
        {/* Render loadingPercentage if it's a string */}
      </SoftBox>
    );
  } else {
    loadingAnimation = null; // No loading animation when not loading
  }

  async function getDrawingDetails(drawing_id) {
    // Web service for getting the drawing details
    const url = localStorage.getItem("samwonAPI") + `/api/VSET/GetDrawingDetails`;

    const formData = new FormData();
    formData.append("id", drawing_id);

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
          console.log(response.data);
          console.log(response.data.interpretation);
          // Displaying the assessment Id
          setAssessment_id(response.data.details[0].id);

          // Displaying New Versions of Images
          setOriginalImage(response.data.details[0].original_image);
          setDetectedImage(response.data.details[0].detected_original_image);
          setFilteredImage(response.data.details[0].filtered_image);
          setDetectedFilteredImage(response.data.details[0].detected_filtered_image);
          setSelectedImage(response.data.details[0].detected_original_image);

          // Saving the Statistics
          setStats(JSON.parse(response.data.details[0].measurements));

          // Saving the Detection Confidence
          setConfidenceDetection(response.data.details[0].confidence_detection);
          setConfidenceFilteredDetection(response.data.details[0].confidence_filteredDetection);

          // Saving the questionnaires
          // Setting all the questionnaires and options
          setQuestions(response.data.questions);
          // Setting the answers if there's one
          console.log("Saving answers" + response.data.answers);
          setAnswers(response.data.answers);
          // Setting the interpretations
          setInterpretation(response.data.interpretation);
          setIsDetected(true);
          console.log("Set Variables Done");
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

  // ======================
  //  Analyzing Image
  // ======================
  const handleAnalyzeImage = () => {
    // Set loading to true
    setIsLoading(true);

    // Web service for Detection url
    const url = localStorage.getItem("samwonServices") + "/detection";

    const formData = new FormData();
    formData.append("media", uploadedFile);
    formData.append("object", object);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // alert("Processing");
    axios
      .post(url, formData, {
        ...config, // Include other configuration options if needed
      })
      .then((response) => {
        setLoadingPercentage("Preparing the statistics...");
        // Assessment Id
        setAssessment_id(response.data.id);

        // Displaying New Versions of Images
        setDetectedImage(response.data.detected_image_dir);
        setFilteredImage(response.data.filtered_dir);
        setDetectedFilteredImage(response.data.detected_filterImage_dir);
        setSelectedImage(response.data.detected_image_dir);

        // Saving the Statistics
        setStats(response.data.results);

        // Saving the Detection Confidence
        setConfidenceDetection(formatter.format(response.data.detection_confidence));
        setConfidenceFilteredDetection(
          formatter.format(response.data.detection_filtered_confidence)
        );

        // Saving all the results to database
        saveModelResult(
          response.data.results,
          formatter.format(response.data.detection_confidence),
          formatter.format(response.data.detection_filtered_confidence),
          originalImage,
          response.data.detected_image_dir,
          response.data.filtered_dir,
          response.data.detected_filterImage_dir
        ).then((res) => {
          setIsLoading(false);
          setIsDetected(true);
        });
      });
  };

  // Function that will save the results of the ai models
  async function saveModelResult(
    results,
    confidence_detection,
    confidence_filteredDetection,
    originalImg,
    detectedImg,
    filteredImg,
    detectedFilteredImg
  ) {
    console.log("Saving in the model");
    try {
      var objectId = 1;
      if (String(object) == "Tree") {
        objectId = 1;
      } else if (String(object) == "House") {
        objectId = 2;
      } else if (String(object) == "Person") {
        objectId = 3;
      }

      // Web service for saving the detection url
      const url = localStorage.getItem("samwonAPI") + `/api/VSET/SaveResults`;

      const formData = new FormData();
      formData.append("stud_email", email);
      formData.append("object_type", objectId);
      formData.append("original_image", originalImg);
      formData.append("detected_original_image", detectedImg);
      formData.append("filtered_image", filteredImg);
      formData.append("detected_filtered_image", detectedFilteredImg);
      formData.append("measurements", JSON.stringify(results));
      formData.append("confidence_detection", parseFloat(confidence_detection));
      formData.append("confidence_filteredDetection", parseFloat(confidence_filteredDetection));
      formData.append("created_by", getCookie("email"));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      };

      await axios
        .post(url, formData, {
          ...config, // Include other configuration options if needed
        })
        .then((response) => {
          // Get and display the Assessment Id
          console.log(response.data);
          // Setting all the questionnaires and options
          setAssessment_id(response.data.latestId);

          // Extract and set the drawingObjectQuestionnaires
          const questionnaires = response.data.drawingObjectQuestionnaires;
          setQuestions(questionnaires);

          // Log that the data has been successfully processed
          // console.log("Data successfully processed:", questionnaires);

          //send an email
          sendEmail(email, objectId, response.data.latestId);

          // Indicate success
          return true;
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
      console.log("Error on Saving Results to Model: " + error);
    }
  }

  function sendEmail(email, objectId, latestId) {
    // Web service for saving the detection url
    const url = localStorage.getItem("samwonAPI") + `/api/VSET/SendEmailVSETAnalysis`;

    const formData = new FormData();
    formData.append("stud_email", email);
    formData.append("object_type", objectId);
    formData.append("created_by", getCookie("email"));
    formData.append("latestId", latestId);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getCookie("user_token"),
      },
    };

    axios
      .post(url, formData, {
        ...config, // Include other configuration options if needed
      })
      .then((response) => {
        return true;
      });
  }

  // ====================== End ==================

  // ======================
  //  Event Handlers
  // ======================
  // Function to trigger file input click when the image is clicked

  // Function to handle image Uploading
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Saving the uploaded file
      setUploadedFile(file);

      // Assuming you only want to display images of specific types (e.g., PNG, JPG)
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Convert the image to Base64 before setting it in variables
          const base64Image = e.target.result.split(",")[1];
          setOriginalImage(base64Image);
          setSelectedImage(base64Image);
        };
        reader.readAsDataURL(file);
      } else {
        // Handle unsupported file type
        alert("Unsupported file type. Please select a PNG or JPG image.");
      }
    }
  };

  // Function to handle image selection
  const handleChangeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    // console.log("change Image");
  };

  // Function for full screen
  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  // Function to toggle fullscreen when the image is clicked
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Function to toggle the "Statistics Section"
  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
    // console.log(showStatistics);
  };

  // Function for toggling image versions
  const handleImageVersion = (version) => {
    if (version === "origVersion") {
      setSelectedImage(originalImage);
    } else if (version === "detectedVersion") {
      setSelectedImage(detectedImage);
    } else if (version === "detectedFilteredVersion") {
      setSelectedImage(detectedFilteredImage);
    } else if (version === "gaborFilteredVersion") {
      setSelectedImage(filteredImage);
    }
  };

  // Function to handle confidence color indicator
  const confidence_color_indicator = (confidence) => {
    if (parseFloat(confidence) < 75) {
      return "text-[#DC3545]";
    } else if (parseFloat(confidence) < 80) {
      return "text-colorISMyellow";
    } else {
      return "text-themeGreen4";
    }
  };

  // Function to handle confidence color indicator
  const confidence_interpretation_indicator = (confidence) => {
    if (parseFloat(confidence) == 0) {
      return "Lowest";
    } else if (parseFloat(confidence) < 75) {
      return "Low";
    } else if (parseFloat(confidence) < 80) {
      return "Moderate";
    } else if (parseFloat(confidence) < 94) {
      return "High";
    } else {
      return "Highest";
    }
  };

  // Function for formatting into 2 decimal places
  const formatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function FullScreenImage({ image, onCloseFullScreen }) {
    return (
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center"
        style={{
          zIndex: 9999, // Set a high z-index value to keep it on top
          position: "fixed", // Use fixed position to keep it in front
        }}
        onClick={onCloseFullScreen}
      >
        <img src={image} alt="Full Screen" className="max-h-screen max-w-screen" />
      </div>
    );
  }

  //open icon upload image
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ====================== End ==================

  return (
    <div className="h-screen">
      <DashboardLayout>
        <DashboardNavbar />
        {!isLoading ? (
          <>
            <section name="general-info">
              <Grid container spacing={3}>
                {/* User Info Component */}
                <UserInfo
                  name={studentData[0].name}
                  gender={studentData[0].sex}
                  birthday={studentData[0].dob}
                  age={studentData[0].age}
                  image={studentData[0].picture}
                />
                {/* Drawing Info Component */}
                <DrawingInfo object={object} assessment_id={assessment_id} email={email} />
              </Grid>
            </section>
            <section name="vset" className="my-5 h-full">
              <Grid container spacing={3}>
                {/* Drawing Component */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  xl={showStatistics ? 8 : 6}
                  className={`transition-all duration-300 ${
                    showStatistics ? "xl:w-8/12" : "xl:w-6/12"
                  }`}
                >
                  <div className="lg:flex block w-full bg-[#FFFFFF] text-themeGreen5 border rounded-lg md:p-5 p-3 items-center shadow-lg h-full">
                    {/* === Image Section === */}
                    <section className={`w-full px-5`}>
                      <form onSubmit={handleAnalyzeImage}>
                        {/* Process Title */}
                        <div className="w-full flex justify-between">
                          <div className="flex items-center">
                            <SoftBox p={1}>
                              <SoftTypography
                                variant="h6"
                                color="info"
                                sx={{ borderBottom: "3px #FDB813 solid" }}
                              >
                                Upload Image
                              </SoftTypography>
                            </SoftBox>

                            <button
                              className="flex items-center p-0 m-0"
                              type="button"
                              onClick={handleClickOpen}
                            >
                              <Modal
                                title="Upload image" // Title of the modal
                                content="test" // Content Modal
                                open={open}
                                handleClose={handleClose}
                              />
                            </button>
                          </div>
                          {isDetected ? (
                            <div className={`flex ${showStatistics ? "hidden" : ""}`}>
                              <div className="flex items-center">
                                <SoftBox p={1}>
                                  <SoftTypography
                                    variant="h6"
                                    color="info"
                                    sx={{ borderBottom: "3px #FDB813 solid" }}
                                  >
                                    Stats Result
                                  </SoftTypography>
                                </SoftBox>

                                <button
                                  className="flex items-center p-0 m-0"
                                  type="button"
                                  onClick={handleClickOpen}
                                >
                                  <StatsModal
                                    title="Stats Result" // Title of the modal
                                    content="This 'Statistical Results' section provides precise measurements for various elements in your uploaded freehand drawings, including width, height, and area. These quantitative values are crucial for determining confidence rates in the evaluation process and forming a foundation for informed decision-making."
                                    open={open}
                                    handleClose={handleClose}
                                  />
                                </button>
                              </div>
                              <button type="button" onClick={toggleStatistics}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xgeyogar.json"
                                  trigger="hover"
                                  colors="primary:#3aa88b,secondary:#08a88a"
                                  stroke="100"
                                ></lord-icon>
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <Divider />
                        {/* Image Part */}
                        <section
                          name="image-component"
                          className={`my-5 ${selectedImage ? "h-[26rem]" : "h-[32rem]"}`}
                        >
                          <div className="flex items-center justify-center w-full h-full">
                            {selectedImage ? (
                              <div>
                                <img
                                  src={`data:image/png;base64,${selectedImage}`}
                                  alt="Uploaded"
                                  className="max-h-[26rem] w-auto"
                                  onClick={toggleFullScreen}
                                />
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  accept="image/jpeg, image/png, image/gif"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                  ref={fileInputRef}
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor="dropzone-file"
                                className="h-full flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-themeGreen1 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                  >
                                    {/* Your SVG icon */}
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span>
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                  </p>
                                </div>
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  accept="image/jpeg, image/png, image/gif"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                  ref={fileInputRef}
                                />
                              </label>
                            )}
                          </div>
                        </section>
                        <hr></hr>
                        {/* Image Nav*/}
                        <section
                          name="image-nav-component"
                          className="mt-5 h-auto flex lg:flex-row flex-col"
                        >
                          {selectedImage ? (
                            <>
                              <Grid item xs={12} sm={12} xl={9}>
                                {/* start */}
                                <div className="w-full flex flex-col">
                                  {isDetected ? (
                                    <>
                                      <SoftBox p={1}>
                                        <SoftTypography variant="h6" color="info">
                                          Image Version
                                        </SoftTypography>
                                      </SoftBox>

                                      <fieldset className="flex lg:flex-row flex-col w-full lg:gap-5 mt-2">
                                        <legend className="sr-only">Image Versions</legend>
                                        <div className="flex items-center mb-4">
                                          <input
                                            id="imageVersion-option-2"
                                            type="radio"
                                            name="imageVersions"
                                            value="detectedVersion"
                                            onClick={() => handleImageVersion("detectedVersion")}
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-themeGreen4 focus:bg-themeGreen4 checked:bg-themeGreen4"
                                            defaultChecked
                                          ></input>
                                          <label
                                            htmlFor="imageVersion-option-2"
                                            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                          >
                                            Detected Version
                                          </label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                          <input
                                            id="imageVersion-option-4"
                                            type="radio"
                                            name="imageVersions"
                                            value="detectedFilteredVersion"
                                            onClick={() =>
                                              handleImageVersion("detectedFilteredVersion")
                                            }
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-themeGreen4 focus:bg-themeGreen4 checked:bg-themeGreen4"
                                          ></input>
                                          <label
                                            htmlFor="imageVersion-option-4"
                                            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                          >
                                            Detected Filtered Version
                                          </label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                          <input
                                            id="imageVersion-option-3"
                                            type="radio"
                                            name="imageVersions"
                                            value="gaborFilteredVersion"
                                            onClick={() =>
                                              handleImageVersion("gaborFilteredVersion")
                                            }
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-themeGreen4 focus:bg-themeGreen4 checked:bg-themeGreen4"
                                          ></input>
                                          <label
                                            htmlFor="imageVersion-option-3"
                                            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                          >
                                            Filtered Version
                                          </label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                          <input
                                            id="imageVersion-option-1"
                                            type="radio"
                                            name="imageVersions"
                                            value="origVersion"
                                            onClick={() => handleImageVersion("origVersion")}
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-themeGreen4 focus:bg-themeGreen4 checked:bg-themeGreen4"
                                          ></input>
                                          <label
                                            htmlFor="imageVersion-option-1"
                                            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                          >
                                            Original Image
                                          </label>
                                        </div>
                                      </fieldset>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={12} xl={3}>
                                {/* start */}
                                {!isDetected ? (
                                  <div className="w-full flex flex-col lg:items-end items-start">
                                    <div className="w-auto mb-1">
                                      <SoftButton
                                        variant="gradient"
                                        color="info"
                                        size="small"
                                        type="submit"
                                      >
                                        Analyze Image
                                      </SoftButton>
                                    </div>
                                    <div className="w-auto my-1">
                                      <SoftButton
                                        variant="outlined"
                                        color="info"
                                        size="small"
                                        type="button"
                                        onClick={handleChangeImage}
                                      >
                                        Change Image
                                      </SoftButton>
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </Grid>
                            </>
                          ) : (
                            <></>
                          )}
                          {/* <div className="flex flex-col w-full items-end justify-start">
                  </div> */}
                          {isFullScreen && (
                            <div
                              className="fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center"
                              onClick={toggleFullScreen}
                            >
                              <img
                                src={`data:image/png;base64,${selectedImage}`}
                                alt="Full Screen"
                                className="max-h-screen max-w-screen"
                              />
                            </div>
                          )}
                        </section>
                      </form>
                    </section>
                    {/* === Statistics Section === */}
                    <section
                      id="drawer-navigation"
                      className={`lg:w-4/12 w-full lg:border-l-2 lg:h-full h-auto px-3 mt-5 lg:mt-0 ${
                        showStatistics
                          ? "translate-x-0 transition-all duration-300"
                          : "-translate-x-full hidden"
                      }`}
                    >
                      <hr className="lg:hidden"></hr>
                      {/* Process Title */}
                      <div className="w-full flex justify-between">
                        <div className={`flex mt-5 lg:mt-0 ${showStatistics ? "" : "hidden"}`}>
                          <div className="flex items-center">
                            <SoftBox p={1}>
                              <SoftTypography
                                variant="h6"
                                color="info"
                                sx={{ borderBottom: "3px #FDB813 solid" }}
                              >
                                Stats Result
                              </SoftTypography>
                            </SoftBox>

                            <button
                              className="flex items-center p-0 m-0"
                              type="button"
                              onClick={handleClickOpen}
                            >
                              <StatsModal
                                title="Stats Result" // Title of the modal
                                content="This 'Statistical Results' section provides precise measurements for various elements in your uploaded freehand drawings, including width, height, and area. These quantitative values are crucial for determining confidence rates in the evaluation process and forming a foundation for informed decision-making."
                                open={open}
                                handleClose={handleClose}
                              />
                            </button>
                          </div>
                          <button type="button" onClick={toggleStatistics}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xgeyogar.json"
                              trigger="hover"
                              colors="primary:#3aa88b,secondary:#08a88a"
                              stroke="100"
                            ></lord-icon>
                          </button>
                        </div>
                      </div>
                      <Divider />
                      {isDetected ? (
                        <>
                          <div className="w-full flex-col text-sm overflow-x-hidden overflow-y-visible h-[32rem]">
                            {/* Feature's Stats */}
                            {stats.map((data, index) => (
                              <Stats
                                key={index}
                                classType={data.class}
                                classification={data.classification}
                                width={data.width}
                                height={data.height}
                                area={data.area}
                                confidence={data.confidence}
                              />
                            ))}
                            {/* Summary's Stats */}
                            <div className="bg-[#f8f9fa] w-full rounded-md shadow-md p-3 flex-col my-3">
                              <div className="flex items-center">
                                <SoftBox p={1}>
                                  <SoftTypography
                                    variant="h6"
                                    color="info"
                                    fontWeight="bold"
                                    sx={{ borderBottom: "3px #FDB813 solid" }}
                                  >
                                    Confidence Rate
                                  </SoftTypography>
                                </SoftBox>

                                <button
                                  className="flex items-center p-0 m-0"
                                  type="button"
                                  onClick={handleClickOpen}
                                >
                                  <ConfidenceModal
                                    title="Confidence Rate"
                                    HighestRate="Sam Won is very confident on his analysis."
                                    HighRate="Sam Won understand the image well."
                                    MediumRate="Sam Won is capable to process the image."
                                    LowRate="Sam Won is having a difficulty to understand the image."
                                    LowestRate="Sam Won cannot understand the image well."
                                    open={open}
                                    handleClose={handleClose}
                                  />
                                </button>
                              </div>
                              {/* Dimension
                            <div className="mt-1">
                              <span className="font-themeHeader">Dimensions</span>
                              <div className="ml-5 w-full">
                                <span className="text-black">
                                  Width&ensp;: <b>1,800px</b>
                                  <br></br>
                                  Height : <b>1,800px</b>
                                  <br></br>
                                  Area &ensp; : <b>1,800px</b>
                                </span>
                              </div>
                            </div>
                            <span className="font-themeHeader mt-1">
                              Position: <b className="text-black">Center</b>
                            </span> */}
                              {/* Detection Rate */}
                              <div className="mt-1 ml-5 w-full">
                                <span>
                                  Original:{" "}
                                  <b className={confidence_color_indicator(confidenceDetection)}>
                                    {confidenceDetection} (
                                    {confidence_interpretation_indicator(confidenceDetection)})
                                  </b>
                                  <br />
                                  Filtered:{" "}
                                  <b
                                    className={confidence_color_indicator(
                                      confidenceFilteredDetection
                                    )}
                                  >
                                    {confidenceFilteredDetection} (
                                    {confidence_interpretation_indicator(
                                      confidenceFilteredDetection
                                    )}
                                    )
                                  </b>
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </section>
                  </div>
                </Grid>
                {/* Content Component */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  xl={showStatistics ? 4 : 6}
                  className={`transition-all duration-300 ${
                    showStatistics ? "xl:w-4/12 text-sm" : "xl:w-6/12"
                  }`}
                >
                  <div className="bg-[#FFFFFF] text-themeGreen5 border rounded-lg md:p-5 p-3 md:flex block items-center shadow-lg">
                    {isDetected ? (
                      // Image Component #2
                      <Questionnaire
                        drawingId={assessment_id}
                        questions1={questions}
                        answers_value={answers}
                        interpretation_value={interpretation}
                        isEligible={isEligible}
                      />
                    ) : (
                      <DrawingTypeInfo object={object} />
                    )}
                  </div>
                </Grid>
              </Grid>
            </section>
            {isFullScreen && (
              <FullScreenImage
                image={`data:image/png;base64,${selectedImage}`}
                onCloseFullScreen={closeFullScreen}
              />
            )}
          </>
        ) : (
          <>{loadingAnimation}</>

          // <Preloader />
        )}
        <Footer />
      </DashboardLayout>
    </div>
  );
}

export default VSET;
