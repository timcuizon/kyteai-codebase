using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Org.BouncyCastle.Asn1.X509;
using SamWonAPI.Models;
using SamWonAPI.Services.Formats;
using static System.Net.Mime.MediaTypeNames;
using System.ComponentModel;
using System.Drawing.Printing;
using System.Drawing;
using System.Numerics;
using System.Security.Policy;
using System;
using System.Reflection;

namespace SamWonAPI.Services.Formats
{
    public class EmailContent : IEmailContent
    {
        //Email Content Body Format For Finishing the Analysis in Drawing Detection
        public string VSETAnalysisDone(string drawing_object, string stud_givenname, string stud_familyname, string clientUrl, string stud_email, string latestId)
        {
            string body = $@"
                    <html>
                      <head>
                        <style>
                          body {{
                            font-family: Arial, sans-serif;
                            font-size: 14px;
                            line-height: 1.5;
                            background-color: #f8f8f8;
                          }}

                          .container {{
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #fff;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            border-radius: 4px;
        
                          }}

                          h1 {{
                            margin-top: 0;
                            font-size: 24px;
                            font-weight: bold;
                            color: #1e4c2b;
                            margin: 0;
                            padding: 0;
                          }}

                          h2 {{
                            font-size: 20px;
                            font-weight: bold;
                            color: #fdb813;
                            margin: 0;
                            padding: 0;
                          }}

                          .text-muted {{
                            color: #888;
                          }}

                          .btn {{
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #1e4c2b;
                            color: #fff;
                            border-radius: 4px;
                            text-decoration: none;
                          }}

                          .btn:hover {{
                            background-color: #fdb813;
                          }}

                          .grid {{
                            display: flex;
        
                          }}
                          .grid-item1 {{
                            align-items: center!important;
                            justify-self: baseline!important;
                            margin-left: 2%; 
                            margin-bottom: 2%;
  
                          }}
                          .logo {{
                            height: 70px;
                            width: 70px;
                          }}
                          .samWonAnalyzation{{
                            margin:3%;
                            height: 20%;
                            width: 30%;
                          }}
                          .ISMgreen-br {{
                            color: #1e4c2b;
                            width:max-content;
                          }}
                          .ISMyellow-br {{
                            color: #fdb813;
                            width:max-content;
                            height:20px;
                          }}
                          .emailContent {{
                            align-items: center;
                            text-align: center;
                            align-content: center;
                            margin-top: 2%;
                          }}
                          .regards {{
                            margin: 0%;
                          }}
                        </style>
                      </head>
                      <body>
                        <div class='container'>
                          <div class='grid'>
                            <div class='grid-item'>
                              <img class='logo' src='https://scontent.xx.fbcdn.net/v/t1.15752-9/427003807_1575063256584976_5902412245562296469_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_ohc=zBjHLrtM4lMAX--8SWm&_nc_oc=AQmMGk3KGUjKL1-VQMXgSyctrBwRQkhmpfxBbY78E8C0fgw6fCPkwnfuhuEMfl1c8BBUJVNaRDSybcA085IOaM3_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTEWEvbq4wEgpBwaGLek9KZXg86WJCqLTFP7QE77GEERw&oe=65F00C7D' alt='Sam Won Logo' />
                            </div>
                            <div class='grid-item1'>
                              <h1>
                                <p style='margin: 0;'>
                                  Sam Won<br />
                                  <p style=' margin: 0; color: #fdb813'>Guidance Counseling</p>
                                </p>
                              </h1>
                            </div>
                          </div>
                          <hr style='border: 1px solid #1e4c2b; margin: 0; margin-top: 2%;'>
                          <hr style='border: 1px solid #fdb813;margin: 0;'>
                          <!-- put line here -->
                          <div class='emailContent'>
                            <h1>Drawing Analysis is Available</h1>
                            <img class='samWonAnalyzation' src='https://www.instagram.com/e9c56eb3-2691-4feb-a553-c8201ac99129' alt='Sam Won Picture' />
                            <p>
                              You can now view the drawing analysis about the uploaded <b><i>drawing {drawing_object}</i></b> 
                              from <b style='color: #fdb813'>{stud_givenname} {stud_familyname}.</b>
                            </p>
                            <a href='{clientUrl}/pre-vset/vset?email={stud_email}&object={drawing_object}&id={latestId}' class='btn'><b style='color: #fdb813'>View Analysis</b></a>
                          </div>

                          <p>
                            Please note that this email is sent from an unmonitored mailbox, and we
                            kindly ask that you do not reply to it.
                          </p>
                          <div class='regards'>
                            <p>Best regards,</p>
                            <b style='color: #1e4c2b'>Sam Won</b>
                          </div>

                          <span style='display: none'>' . time() . '</span>
                        </div>
                      </body>
                    </html>
                    ";
            return body;
        }

        public string AppointmentEmail(string status, string stud_fullname, string clientUrl, string stud_email, string latestId, string ref_Number, string appointment_Date, string appointment_Time, string appointment_Message, string short_Message, string appointment_Modality, string note)
        {
            string body = $@"

                    <html>
                      <head>
                        <style>
                          body {{
                            font-family: Arial, sans-serif;
                            font-size: 14px;
                            line-height: 1.5;
                            background-color: #f8f8f8;
                          }}

                          .container {{
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #fff;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            border-radius: 4px;
        
                          }}

                          h1 {{
                            margin-top: 0;
                            font-size: 24px;
                            font-weight: bold;
                            color: #1e4c2b;
                            margin: 0;
                            padding: 0;
                          }}

                          h2 {{
                            font-size: 20px;
                            font-weight: bold;
                            color: #1e4c2b;
                            margin: 0;
                            padding: 0;
                          }}

                          .text-muted {{
                            color: #888;
                          }}

                          .btn {{
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #1e4c2b;
                            color: #fff;
                            border-radius: 4px;
                            text-decoration: none;
                          }}

                          .btn:hover {{
                            background-color: #fdb813;
                          }}

                          .grid {{
                            display: flex;
        
                          }}
                          .grid2{{
                            display:grid;
                            grid-template-columns: auto 50%;
                          }}
      
                          .grid-item1 {{
                            align-items: center!important;
                            justify-self: baseline!important;
                            margin-left: 2%; 
                            margin-bottom: 2%;
  
                          }}
                          .logo {{
                            height: 70px;
                            width: 70px;
                          }}
                          .samWonAnalyzation{{
                            margin:3%;
                            height: 20%;
                            width: 30%;
                          }}
                          .ISMgreen-br {{
                            color: #1e4c2b;
                            width:max-content;
                          }}
                          .ISMyellow-br {{
                            color: #fdb813;
                            width:max-content;
                            height:20px;
                          }}
                          .emailContent {{
                            align-items: center;
                            text-align: center;
                            align-content: center;
                            margin-top: 2%;
                          }}
                          .regards {{
                            margin: 0%;
                          }}
                        </style>
                      </head>
                      <body>
                        <div class='container'>
                            <div class='grid'>
                                <div class='grid-item'>
                                    <img class='logo' src='https://scontent.xx.fbcdn.net/v/t1.15752-9/427003807_1575063256584976_5902412245562296469_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_ohc=zBjHLrtM4lMAX--8SWm&_nc_oc=AQmMGk3KGUjKL1-VQMXgSyctrBwRQkhmpfxBbY78E8C0fgw6fCPkwnfuhuEMfl1c8BBUJVNaRDSybcA085IOaM3_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTEWEvbq4wEgpBwaGLek9KZXg86WJCqLTFP7QE77GEERw&oe=65F00C7D' alt='Sam Won Logo' />
                                </div>
                                <div class='grid-item1'>
                                    <h1>
                                        <p style='margin: 0;'>
                                        Sam Won<br />
                                        <p style=' margin: 0; color: #fdb813'>Guidance Counseling</p>
                                        </p>
                                    </h1>
                                </div>
                            </div>
                            <hr style='border: 1px solid #1e4c2b; margin: 0; margin-top: 2%;'>
                            <hr style='border: 1px solid #fdb813;margin: 0;'>
                            <!-- put line here -->
                            <div class='emailContent'>
                                <h1>Guidance Counseling Schedule</h1>
                                <div class='emailContent'>
                                    <p>
                                    {short_Message}
                                    </p>
                                    <p>Status is <b style='color: #fdb813'>{status}</b></p>
                                    </div>
                                </div>
                                <p>Good Day <b>{stud_fullname}</b></p>
                               <p>{appointment_Message}. Here are the details for your reference:</p>
                                <div class='grid2'>
                                    <div class='grid-item2'>
                                        <p><b>Reference Number: </b><b style='color: #1E4C2B'> {ref_Number} </b></p>
                                        <p><b>Appointment Date: </b><b style='color: #1E4C2B'> {appointment_Date} </b></p>
                                        <p><b>Appointment Time: </b><b style='color: #1E4C2B'> {appointment_Time} </b></p>
                                        <p><b>Modality: </b><b style='color: #1E4C2B'> {appointment_Modality} </b></p>
                                    </div>
                                </div>
                                <div class='emailContent'>
                                    <a
                                    href='{clientUrl}/appointment-counseling/appointment-summary?id={latestId}'
                                    ><button class='btn'>Check full details</button></a
                                    >    
                                </div>

                                <p>
                                   {note}
                                </p>
          
                               
                                <p>
                                    Please note that this email is sent from an unmonitored mailbox, and we
                                    kindly ask that you do not reply to it.
                                </p>
                                <div class='regards'>
                                    <p>Best regards,</p>
                                    <b style='color: #1e4c2b'>Sam Won</b>
                                </div>

                          <span style='display: none'>' . time() . '</span>
                        </div>
                      </body>
                    </html>


            ";


            return body;
        }

        public string UserReportSpace(string clientUrl, string stud_email, string latestId, string userType)
        {
            string body = $@"
            
            <html>
              <head>
                <style>
                  body {{
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    line-height: 1.5;
                    background-color: #f8f8f8;
                  }}

                  .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
        
                  }}

                  h1 {{
                    margin-top: 0;
                    font-size: 24px;
                    font-weight: bold;
                    color: #1e4c2b;
                    margin: 0;
                    padding: 0;
                  }}

                  h2 {{
                    font-size: 20px;
                    font-weight: bold;
                    color: #fdb813;
                    margin: 0;
                    padding: 0;
                  }}

                  .text-muted {{
                    color: #888;
                  }}

                  .btn {{
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #1e4c2b;
                    color: #fff;
                    border-radius: 4px;
                    text-decoration: none;
                  }}

                  .btn:hover {{
                    background-color: #fdb813;
                  }}

                  .grid {{
                    display: flex;
        
                  }}
                  .grid-item1 {{
                    align-items: center!important;
                    justify-self: baseline!important;
                    margin-left: 2%; 
                    margin-bottom: 2%;
  
                  }}
                  .logo {{
                    height: 70px;
                    width: 70px;
                  }}
                  .samWonAnalyzation{{
                    margin:3%;
                    height: 20%;
                    width: 30%;
                  }}
                  .ISMgreen-br {{
                    color: #1e4c2b;
                    width:max-content;
                  }}
                  .ISMyellow-br {{
                    color: #fdb813;
                    width:max-content;
                    height:20px;
                  }}
                  .emailContent {{
                    align-items: center;
                    text-align: center;
                    align-content: center;
                    margin-top: 2%;
                  }}
                  .regards {{
                    margin: 0%;
                  }}
                </style>
              </head>
              <body>
                <div class='container'>
                  <div class='grid'>
                    <div class='grid-item'>
                      <img class='logo' src='https://scontent.xx.fbcdn.net/v/t1.15752-9/427003807_1575063256584976_5902412245562296469_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_ohc=zBjHLrtM4lMAX--8SWm&_nc_oc=AQmMGk3KGUjKL1-VQMXgSyctrBwRQkhmpfxBbY78E8C0fgw6fCPkwnfuhuEMfl1c8BBUJVNaRDSybcA085IOaM3_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTEWEvbq4wEgpBwaGLek9KZXg86WJCqLTFP7QE77GEERw&oe=65F00C7D' alt='Sam Won Logo' />
                    </div>
                    <div class='grid-item1'>
                      <h1>
                        <p style='margin: 0;'>
                          Sam Won<br />
                          <p style='margin: 0; color: #fdb813'>Guidance Counseling</p>
                        </p>
                      </h1>
                    </div>
                  </div>
                  <hr style='border: 1px solid #1e4c2b; margin: 0; margin-top: 2%;'>
                  <hr style='border: 1px solid #fdb813;margin: 0;'>
                  <!-- put line here -->
                  <div class='emailContent'>
                    <h1>{userType} Report Space</h1>
                    <p>
                      Thank you for submitting your student's parent space report. The team will analyze your report and provide you with feedback as soon as possible.
                    </p>
                    <a
                      href='{clientUrl}/user-student-parent-space/report-records-view?id={latestId}'
                      ><button class='btn'>View Report</button></a
                    >
                  </div>
                
                 

                  <p>
                    Please note that this email is sent from an unmonitored mailbox, and we
                    kindly ask that you do not reply to it.
                  </p>
                  <div class='regards'>
                    <p>Best regards,</p>
                    <b style='color: #1e4c2b'>Sam Won</b>
                  </div>

                  <span style='display: none'>' . time() . '</span>
                </div>
              </body>
            </html>

            ";

            return body;
        }
    }
}
