import React, { useState } from "react";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import Logo from "assets/images/logos/logo_SamwonLogo.png";
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
    paddingBottom: 65,
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
    marginBottom: 10,
    textAlign: "center",
    color: "#1E4C2B",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  header2: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "start",
    color: "#1E4C2B",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "#FDB813",
  },
  header3: {
    fontSize: 10,
    marginBottom: 1,
    textAlign: "start",
    color: "#1E4C2B",
    fontFamily: "Poppins-Regular",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
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
    alignItems: "flex-start", // Center items vertically
    justifyContent: "start", // Center items horizontally
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
    fontWeight: "bold",
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
  

  footerImage: {
    width: "100",
    height: "100",
  },

  footerText: {
    color: "#FDB813", // Adjust text color as needed
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
});

function stripHtmlTags(html) {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

function PDFFile ({data}) {

  const appTime = (
    dayjs(data.schedule, "DD/MM/YYYY hh:mm a").format("hh:mm a") +
      " - " +
      dayjs(data.scheduleEnd, "DD/MM/YYYY hh:mm a").format("hh:mm a")
  );

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        {/* HEADER PDF  */}
        <View style={styles.gridContainer}>
          <View style={[styles.section, styles.gridItem]}>
            <Image src={Logo} style={styles.imagelogo} />
          </View>
          <View style={[styles.section2, styles.gridItem2]}>
            <Text style={styles.title1}>Sam Won</Text>
            <Text style={styles.title2}>Guidance Counseling</Text>
            <Text style={styles.header} fixed>
              (632) 8840.8400
            </Text>
            <Text style={styles.header} fixed>
              superintendent@ismanila.org
            </Text>
            <Text style={styles.header} fixed>
              University Parkway, Fort Bonifacio Global City, Taguig City 1634, Philippines
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: "5%", height: 1, backgroundColor: "#1E4C2B" }} />
        <View style={{ paddingHorizontal: "5%", height: 1, backgroundColor: "#FDB813" }} />
        <View>
          <Text style={styles.header1} fixed>
            Guidance Counseling Schedule
          </Text>
        </View>

        {/* Appointment Info */}
        <View style={styles.gridContainer2}>
          <Text style={styles.header2} fixed>
            Appointment Information
          </Text>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Reference Number: {data.referenceNumber}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Status: {data.status}
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Appointment Date: {dayjs(data.schedule, "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY")}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Type of Concern: {data.concern}
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Appointment Time: {appTime}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Type of Modality: {data.modality.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingLeft: "5%", height: 1, backgroundColor: "#D3D3D3" }} />

        {/* Personal Info */}
        <View style={styles.gridContainer2}>
          <Text style={styles.header2} fixed>
            Personal Information
          </Text>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Name: {data.name}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                User Type: {data.role}
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Email: {data.email}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Date of Birth: {dayjs(data.dob, "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Gender: {data.sex}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingLeft: "5%", height: 1, backgroundColor: "#D3D3D3" }} />
    {data.isThereAnAffiliate && (
        <View style={styles.gridContainer2}>
          <Text style={styles.header2} fixed>
            Affiliated Information
          </Text>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Name: {data.affiliateName}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                User Type: Student
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Email: {data.affiliateEmail}
              </Text>
            </View>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Date of Birth: {dayjs(data.affiliateDOB, "YYYY/MM/DD hh:mm a").format("MMMM DD, YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.gridContainer3}>
            <View style={styles.gridContainer3}>
              <Text style={styles.header3} fixed>
                Gender: {data.affiliateSex}
              </Text>
            </View>
          </View>
        </View>
)}
        <View style={{ paddingLeft: "5%", height: 1, backgroundColor: "#D3D3D3" }} />

        <View style={styles.gridContainer2}>
          <Text style={styles.header2} fixed>
            Other Information
          </Text>
          <Text  style={styles.header3} fixed>
            Notes: {stripHtmlTags(data.clientNotes)}
          </Text>
          
        </View>

        

        <View style={styles.footer}>
          <Text style={styles.footerText}>This electronic report is for appointment schedule and only use for guidance counseling.</Text>
        </View>

        {/* <Text
          style={styles.pageNumber}
          render={
            (pageNumber, totalPages) => `${pageNumber} / ${totalPages}`
          }
          fixed
        />      */}
      </Page>
    </Document>
  );
};

export default PDFFile;
