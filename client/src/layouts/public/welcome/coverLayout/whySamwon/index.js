import { Card, Fade, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import WhySamwonBG from "assets/images/bg/samwon_whysamwon_bg.png";
import SoftTypography from "components/SoftTypography";
import whySamWonIMG from "assets/images/why_SamWon_temp_img.png";

function WhySamWonPage(){
    return(
        <SoftBox
            minHeight="100vh"
            sx={{
            //   backgroundImage: `url(${WhySamwonBG})`,
              backgroundSize: "cover",
              
            }}
            bgColor="light"
          >
            <Fade
                in
                style={{ transitionDuration: '1s' }}
            >
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Card
                        sx={{
                            width: "85vw",
                            height: "75vh",
                            marginTop: "12vh",
                            backgroundColor: "rgba(218, 238, 226, 0.9)",
                        }}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            height="73vh"
                        >
                            <Grid item>
                                <SoftTypography>
                                    <span
                                        className="md:text-[25pt] lg:text-[22pt] xl:text-[28pt] text-themeorange font-bold font-themeHeader" 
                                    >
                                        Why choose Sam Won?
                                    </span>
                                </SoftTypography>
                            </Grid>
                            <Grid item
                                className="px-[1.5vh] mt-[1.5vh] md:mt-[3vh] sm:px-[1vh] md:px-[5vh] lg:px-[20vh] xl:px-[30h]"
                                sx={{
                                    textAlign: "center",
                                }}
                            >
                                <SoftTypography>
                                    <span
                                        className="text-[10pt] md:text-[15pt] lg:text-[12pt] xl:text-[17pt] font-themeContent"
                                    >
                                    SamWon offers a versatile platform for creative expression, relaxation, skill development, 
                                    community engagement, and education, all within a user-friendly and secure environment.
                                    </span>
                                </SoftTypography>
                            </Grid>
                            <Grid item>
                                <img 
                                    src={whySamWonIMG}
                                    //h-[200px] md:h-[500px] lg:h-[200px] xl:h-[350px]
                                    className=" mt-[1.5vh] md:mt-[3vh] px-[2vh] md:px-0 min-h-[200px] max-h-[400px]"
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Fade>
          </SoftBox>
    );
};

export default WhySamWonPage;