import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React components
import "jspdf-autotable";

import Footer from "examples/Footer";
import React, { useState, useEffect } from "react";
import { Checkbox } from "flowbite-react";

import axios from "axios";
import Preloader from "PreLoader";

//Helpers
import { isLoggedIn } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";
import SoftBox from "components/SoftBox";

function ManageModules() {
  const [modules, setModules] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Check if there's a user logged in &
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      //Fetch all students
      console.log("Fetching");
      // Fetch all users
      fetchModules();
    }
  }, []);

  //Request to fetch all the active students
  async function fetchModules() {
    try {
      setIsLoading(true);
      // Web service for getting the drawing details
      const url = localStorage.getItem("samwonAPI") + `/api/Module/GetModules`;

      const formData = new FormData();

      // Define your headers here with JWT Claims
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
            // Assuming the response data structure is an array of users
            console.log(response.data);
            setModules(response.data);
            setIsLoading(false);
          });
      } catch (error) {
        console.log("Error: " + error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleChangeStatus(id) {
    const updatedModules = [...modules];
    // alert(updatedModules[index].isActive);
    const index = modules.findIndex((module) => module.id === id);
    updatedModules[index].isActive = updatedModules[index].isActive == 1 ? 0 : 1;
    setModules(updatedModules);
  }

  function replaceLastCharacter(x) {
    if (x.length > 0) {
      const updatedString = x.slice(0, -1); // Replace 'X' with the character you want
      return updatedString;
    }
  }

  async function handleSave() {
    swal({
      title: "Confirmation",
      text: "You are about to modify User & Professional Modules?",
      icon: "warning",
      buttons: true,
    }).then((willSubmit) => {
      if (willSubmit) {
        var ids = "";
        var modules_arr = "";
        var isActive_arr = "";

        modules.forEach((module, index) => {
          ids += module.id + ",";
          modules_arr += module.module1 + ",";
          isActive_arr += module.isActive + ",";
        });

        ids = replaceLastCharacter(ids);
        modules_arr = replaceLastCharacter(modules_arr);
        isActive_arr = replaceLastCharacter(isActive_arr);
        saveModules(ids, modules_arr, isActive_arr);
      }
    });
  }
  async function saveModules(id, modules_arr, isActive_arr) {
    // Creating a request
    // Web service for saving the answers url
    setIsLoading(true);
    const url = localStorage.getItem("samwonAPI") + `/api/Module/UpdateModules`;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("module1", modules_arr);
    formData.append("isActive", isActive_arr);

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
        setIsLoading(false);
        swal({
          icon: "success",
          title: "Success",
          text: "Changes saved.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error on Saving Results to Model: " + error);
      });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar /> {/* Record Keeping List */}
      <>
        {!isLoading ? (
          <>
            <SoftTypography
              color="info"
              component="label"
              variant="h6"
              fontWeight="bold"
              sx={{ borderBottom: "3px #FDB813 solid", marginRight: "10px" }}
            >
              Manage Modules
            </SoftTypography>
            {/* Content */}
            <div className="flex my-5 bg-white mx-20 px-10 py-20 rounded-md">
              {/* Student/Parent Module Section */}
              <section className="w-full mr-4">
                <div className="text-center">
                  <SoftTypography color="info" component="label" variant="h6" fontWeight="bold">
                    Student / Parent Modules
                  </SoftTypography>
                  <section className="text-start px-20 ">
                    <table className="w-full">
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody>
                        {modules
                          .filter((data) => data.roles === "User")
                          .map((child, index) => (
                            <tr key={index}>
                              <td className="px-2 py-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-end">
                                {child.module1}
                              </td>
                              <td className="px-4 py-2">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={child.isActive === 1 ? true : false}
                                    onClick={(e) => {
                                      handleChangeStatus(child.id);
                                    }}
                                  />
                                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Active
                                  </span>
                                </label>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </section>
                </div>
              </section>
              {/* Professional Module Section */}
              <section className="w-full">
                <div className="text-center">
                  <SoftTypography color="info" component="label" variant="h6" fontWeight="bold">
                    Professional Modules
                  </SoftTypography>
                  <section className="text-start px-20 ">
                    <table className="w-full">
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody>
                        {modules
                          .filter((data) => data.roles === "Professional")
                          .map((child, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-end">
                                {child.module1}
                              </td>
                              <td className="px-4 py-2">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={child.isActive === 1 ? true : false}
                                    onClick={(e) => {
                                      handleChangeStatus(child.id);
                                    }}
                                  />
                                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Active
                                  </span>
                                </label>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </section>
                </div>
                <SoftBox mr={5} className={"mt-5"}>
                  <SoftButton
                    variant="gradient"
                    color="info"
                    size="medium"
                    onClick={() => handleSave()}
                  >
                    Save
                  </SoftButton>
                </SoftBox>
              </section>
            </div>
          </>
        ) : (
          <Preloader />
        )}
      </>
      <Footer />
    </DashboardLayout>
  );
}

export default ManageModules;
