import React, { useState } from "react";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import Logo from "assets/images/logos/logo_SamwonLogo.png";
import ImageReport from "assets/images/tree.jpg"
import MyCustomFont from "styles/fonts/Poppins/Poppins-Regular.ttf";
import { Font } from "@react-pdf/renderer";
import footerPic from "assets/images/pdffooter.svg";
import dayjs from "dayjs";
// import SoftTypography from "components/SoftTypography";

Font.register({
  family: "Poppins-Regular",
  src: MyCustomFont,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    // paddingBottom: 65,
    paddingHorizontal: 5,
    border: "1px solid red;",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Poppins-Regular",
    color: "black",
    paddingLeft: "5%",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 8,
    marginBottom: 4,
    textAlign: "start",
    color: "black",
    fontFamily: "Poppins-Regular",
    lineHeight: 1,
  },
  header1: {
    fontSize: 24,
    textAlign: "center",
    color: "#1E4C2B",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    margin: "0", // Remove margin
    padding: "0", // Remove padding

  },
  header2: {
    fontSize: 9,
    textAlign: "start",
    color: "#FDB813",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "#FDB813",
    margin: "0", // Remove margin
    padding: "0", // Remove padding
  },
  header3: {
    fontSize: 10,
    marginBottom: 8,
    textAlign: "start",
    color: "#1E4C2B",
    fontFamily: "Poppins-Regular",
  },
  header4: {
    fontSize: 14,
    marginBottom: 1,
    textAlign: "start",
    color: "#1E4C2B",
    fontFamily: "Poppins-Regular",
    fontWeight: "900",
  },
  header5: {
    fontSize: 10,
    marginBottom: 0,
    textAlign: "center",
    color: "#1E4C2B",
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  header6: {
    fontSize: 14,
    marginBottom: 1,
    marginTop: 10,
    textAlign: "start",
    color: "#1E4C2B",
    fontFamily: "Poppins-Regular",
    fontWeight: "900",
  },
  header7: {
    fontSize: 8,
    marginBottom: 0,
    textAlign: "center",
    color: "black",
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 25,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  section: {
    marginBottom: 10,
  },
  section2: {
    marginBottom: 10,
    paddingLeft: "5%",
  },
  gridContainer: {
    width: "100%",
    flexDirection: "row", // Change from 'row' to 'column'
    alignItems: "flex-start", // Center items vertically
    justifyContent: "center", // Center items horizontally
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  gridContainer2: {
    width: "100%",
    flexDirection: "column", // Change from 'row' to 'column'
    alignItems: "flex-start", // Center items vertically
    justifyContent: "start", // Center items horizontally
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  gridContainer3: {
    width: "100%",
    flexDirection: "row", // Change from 'row' to 'column'
   
  },
  gridItem2: {
    width: "100%", // Adjust as needed
  },

  title1: {
    color: "#1E4C2B",
    fontSize: 35,
    fontFamily: "Poppins-Regular",
    textAlign: "start", // Center the text
    margin: "0", // Remove margin
    padding: "0", // Remove padding
    fontWeight: "950",
    lineHeight: 1,
  },
  title2: {
    color: "#FDB813",
    fontSize: 28,
    fontFamily: "Poppins-Regular",
    textAlign: "start", // Center the text
    margin: "0", // Remove margin
    padding: "0", // Remove padding
    fontWeight: "bold",
    lineHeight: 1,
    marginBottom: "2",
  },
  imagelogo: {
    width: 100, // Adjust the width as needed
    height: 100,
    alignSelf: "start", // Center the image
    marginTop: "3",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    backgroundColor: "#1E4C2B",
  },
  


  footerText: {
    color: "#FDB813", // Adjust text color as needed
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
  imageAnalysis: {
    width: 200, // Adjust the width as needed
    height: 200,
    alignSelf: "start", // Center the image
    marginTop: "1",
  },

  tableContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "column",
  },
  tableRow: {
    width: "100%",
    flexDirection: "row",
  },
  tableHeaderCell: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000000",
    fontFamily: "Poppins-Regular",
    fontSize: 11, // Adjust font size as needed
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
    fontSize: 11, // Adjust font size as needed
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000000",
    fontFamily: "Poppins-Regular",
    fontSize: 11, // Adjust font size as needed
  },
});

function stripHtmlTags(html) {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}
function pdfVSET({data}) {

  const appTime = (
    dayjs(data.schedule, "DD/MM/YYYY hh:mm a").format("hh:mm a") +
      " - " +
      dayjs(data.scheduleEnd, "DD/MM/YYYY hh:mm a").format("hh:mm a")
  );
  
    console.log("This is the assessment ID in the PDF side: ", data.assessment_id);

    const measurements = JSON.parse(data.drawing_results[0].measurements);
    console.log("This is the json data: ", measurements);
    // const measurements = JSON.parse(jsonData.measurements);

  return (
    <Document>
      <Page size="A4" style={styles.body} wrap>
        {/* HEADER PDF  */}
        <View style={styles.gridContainer}>
          <View style={[styles.section, styles.gridItem]}>
            <Image src={Logo} style={styles.imagelogo} />
          </View>
          <View style={[styles.section2, styles.gridItem2]}>
            <Text style={styles.title1}>Sam Won</Text>
            <Text style={styles.title2}>Guidance Counseling</Text>
            <Text style={styles.header} fixed>
              (+63) 92972737829
            </Text>
            {console.log("This is the assessment ID in the PDF side: ", data.assessment_id)}
            <Text style={styles.header} fixed>
              swguidance@gmail.com
            </Text>
            <Text style={styles.header} fixed>
              Dr Jose P. Rizal Ext, Makati, Metro Manila
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: "5%", height: 1, backgroundColor: "#1E4C2B" }} />
        <View style={{ paddingHorizontal: "5%", height: 1, backgroundColor: "#FDB813" }} />

        {/* Appointment Info */}
        <View style={styles.gridContainer2}>
          <Text style={styles.header1} fixed>
            VSET REPORT
          </Text>
          <Text style={styles.header2} fixed>
            Visual Self Expression Tool Report
          </Text>
          
          <Text style={styles.header3} fixed>
            Assessment ID: {data.assessment_id}
          </Text>
        </View>

        {/* Information */}
        <View style={styles.gridContainer2}>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header4} fixed>
                Personal Information
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header4} fixed>
                Professional Information
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Name: {data.student_info.name}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Name: {data.professional_info.name}
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Email: {data.student_info.email}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Email: {data.professional_info.email}
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Date of Birth: {dayjs(data.student_info.dob, "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY")}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Contact Number: (632) 8840.8400
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: "2%", paddingLeft: "5%", height: 1, backgroundColor: "#D3D3D3" }} />
        <View style={styles.gridContainer2}>
          <View>
          <Text style={styles.header4} fixed>
            Image Analysis Result {data.drawing_results[0].object_type === 1 ? '(Draw a Tree)' : 
            data.drawing_results[0].object_type === 2 ? '(Draw a House)' : 
            data.drawing_results[0].object_type === 3 ? '(Draw a Person)' : 
            ''}
          </Text>
          </View>
          <View style={styles.gridContainer2}>
            <View style={styles.gridContainer3}>
              <View style={styles.gridContainer3}>
                <Image src={"data:image/jpeg;base64," + data.drawing_results[0].original_image} style={styles.imageAnalysis} />
              </View>
              <View style={styles.gridContainer3}>
                <Image src={"data:image/jpeg;base64," + data.drawing_results[0].filtered_image} style={styles.imageAnalysis} />
              </View>
            </View>
            <View style={styles.gridContainer3}>
              <View style={styles.gridContainer3}>
                <Text style={styles.header5} fixed>
                  Original Image
                </Text>
              </View>
              <View style={styles.gridContainer3}>
                <Text style={styles.header5} fixed>
                  Filtered Image
                </Text>
              </View>
            </View>
            <View style={styles.gridContainer3}>
              <View style={styles.gridContainer3}>
                <Image src={"data:image/jpeg;base64," + data.drawing_results[0].detected_original_image} style={styles.imageAnalysis} />
              </View>
              <View style={styles.gridContainer3}>
                <Image src={"data:image/jpeg;base64," + data.drawing_results[0].detected_filtered_image} style={styles.imageAnalysis} />
              </View>
            </View>
            <View style={styles.gridContainer3}>
              <View style={styles.gridContainer3}>
                <Text style={styles.header5} fixed>
                  Detected Version
                </Text>
              </View>
              <View style={styles.gridContainer3}>
                <Text style={styles.header5} fixed>
                  Detected Filtered Version
                </Text>
              </View>
            </View>
          </View>
        </View>



        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          fixed
        />      

        <View style={styles.gridContainer2} break>
          <View>
            <Text style={styles.header4} >
              Statistical Analysis Summary
            </Text>
          </View>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Part of Drawing</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Category</Text>
              </View>
              {/* Repeat for other headers */}
            </View>

            {/* Table Rows */}
            {measurements.map((measurement, index) => (
              <div key={index}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>{measurement.class}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{measurement.classification}</Text>
                  </View>
                  {/* Repeat for other cells in row 1 */}
                </View>
                {/* Repeat for other rows */}
                </div>
            ))}
          </View>
          {/* Report */}
          <View style={styles.gridContainer3}>
            <Text style={styles.header6} fixed>
              Other Information
            </Text>
          </View>
          <View style={styles.gridContainer3}>
            <Text style={styles.header3} fixed>
              {data.other_drawing_info}
            </Text>
          </View>

          {/* Professional Feedback */}

          <View style={styles.gridContainer3}>
            <Text style={styles.header4} fixed>
              Professional Feedback
            </Text>
          </View>
          <View style={styles.gridContainer3}>
            <Text style={styles.header3} fixed>
              {data.professional_feedback}
            </Text>
          </View>

        </View>

        {/* I want this part to be in a new page */}
        <View style={styles.gridContainer2} break>
          <View>
            <Text style={styles.header4}>
            In Depth Statistical Result
            </Text>
          </View>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Part of the{"\n"}Drawing</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Category</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Dimensions{"\n"}
                  <Text style={styles.header7}>Width & Height</Text>
                </Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Area</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Confidence Rate</Text>
              </View>
              {/* Repeat for other headers */}
            </View>

            {measurements.map((measurement, index) => (
              <div key={index}>
                {/* Table Rows */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.header5}>{measurement.class}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.header5}>{measurement.classification}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.header5}>W: {measurement.width.toFixed(2)}px{"\n"}H: {measurement.height.toFixed(2)}px</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.header5}>{measurement.area.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.header5}>{ (measurement.confidence * 100).toFixed(2) }%</Text>
                  </View>
                  {/* Repeat for other cells in row 1 */}
                </View>
              </div>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default pdfVSET;






