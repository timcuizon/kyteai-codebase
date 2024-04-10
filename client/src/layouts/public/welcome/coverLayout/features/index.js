import { Card, Fade, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import FeatureBG from "assets/images/bg/samwon_whysamwon_phone_bg.png";
import FeautreCards from "./featuresCard"
import { useEffect, useState, useTransition } from "react";
import Feature1 from "assets/images/feature/Feature1.png";
import Feature2 from "assets/images/feature/Feature2.png";
import Feature3 from "assets/images/feature/Feature3.png";
import Feature4 from "assets/images/feature/Feature4.png";
import Feature5 from "assets/images/feature/Feature5.png";
import SoftButton from "components/SoftButton";


function FeaturesPage(){
    
    const initialHoveredSate = {
        isHoveredFeature1: false,
        isHoveredFeature2: false,
        isHoveredFeature3: false,
        isHoveredFeature4: false,
        isHoveredFeature5: false
    }

    
    const HoveredSate = {
        isHoveredFeature1: true,
        isHoveredFeature2: false,
        isHoveredFeature3: false,
        isHoveredFeature4: false,
        isHoveredFeature5: false
    }

    const [isHovering, setIsHovering] = useState(HoveredSate);

    function handleFeature1() {
        setIsHovering(state => ({
            ...initialHoveredSate,
            isHoveredFeature1: true
        }))
    }

    function handleFeature2() {
        setIsHovering(state => ({
            ...initialHoveredSate,
            isHoveredFeature2: true
        }))
    }

    function handleFeature3() {
        setIsHovering(state => ({
            ...initialHoveredSate,
            isHoveredFeature3: true
        }))
    }

    function handleFeature4() {
        setIsHovering(state => ({
            ...initialHoveredSate,
            isHoveredFeature4: true
        }))
    }

    function handleFeature5() {
        setIsHovering(state => ({
            ...initialHoveredSate,
            isHoveredFeature5: true
        }))
    }

    return(
        
        <SoftBox
            minHeight="100vh"
            bgColor="light"
            sx={{
            //   backgroundImage: `url(${FeatureBG})`,f
              backgroundSize: "cover"
            }}
          >
            <Grid container 
                justifyContent="center"
                alignItems="center"
                sx={{ 
                    height: "100vh"
                }}
            >
                <Grid item
                    sx={{
                        width: "85vw",
                        height: "75vh",
                        marginTop: "12vh",
                        borderRadius: "1rem"
                    }}
                >
                    <Grid container
                        sx={{
                            height: "75vh",
                            width:"85vw",
                            backgroundColor: "black"
                        }}
                    >
                        <Grid item
                            md={8}
                            xs={12}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            className="relative"
                        >

                            <img src={Feature1} className={`${isHovering.isHoveredFeature1 ? "feature-shown" : "feature-hidden"} duration-200 ease-in-out`}/>
                            <img src={Feature2} className={`${isHovering.isHoveredFeature2 ? "feature-shown" : "feature-hidden"} absolute duration-200 ease-in-out`}/>
                            <img src={Feature3} className={`${isHovering.isHoveredFeature3 ? "feature-shown" : "feature-hidden"} absolute duration-200 ease-in-out`}/>
                            <img src={Feature4} className={`${isHovering.isHoveredFeature4 ? "feature-shown" : "feature-hidden"} absolute duration-200 ease-in-out`}/>
                            <img src={Feature5} className={`${isHovering.isHoveredFeature5 ? "feature-shown" : "feature-hidden"} absolute duration-200 ease-in-out`}/>
                        </Grid>

                        {/* Mobile */}
                        <Grid item 
                            md={4}
                            className="lg:hidden overflow-auto touch-pan-x snap-x flex flex-nowrap px-[5rem] h-[260px]"
                        >
                                <div className="snap-mandatory snap-center mr-5"
                                    onClick={handleFeature1}
                                >
                                    <FeautreCards
                                            BgColor={`${isHovering.isHoveredFeature1 ? "info" : "white"}`}
                                            TextColor={`${isHovering.isHoveredFeature1 ? "white" : "black"}`}
                                            ArrowColor={`${isHovering.isHoveredFeature1 ? "#FDB813" : "#1E4C2B"}`}
                                            Title="Schedule Management"
                                            Desc="Efficiently Manage your Schedules"
                                        />
                                </div>
                                <div className="snap-mandatory snap-center mr-5"
                                    onClick={handleFeature2}
                                >
                                    <FeautreCards
                                            BgColor={`${isHovering.isHoveredFeature2 ? "info" : "white"}`}
                                            TextColor={`${isHovering.isHoveredFeature2 ? "white" : "black"}`}
                                            ArrowColor={`${isHovering.isHoveredFeature2? "#FDB813" : "#1E4C2B"}`}
                                            Title="Schedule Management"
                                            Desc="Efficiently Manage your Schedules"
                                        />
                                </div>
                                <div className="snap-mandatory snap-center mr-5"
                                    onClick={handleFeature3}
                                >
                                    <FeautreCards
                                            BgColor={`${isHovering.isHoveredFeature3 ? "info" : "white"}`}
                                            TextColor={`${isHovering.isHoveredFeature3 ? "white" : "black"}`}
                                            ArrowColor={`${isHovering.isHoveredFeature3 ? "#FDB813" : "#1E4C2B"}`}
                                            Title="Schedule Management"
                                            Desc="Efficiently Manage your Schedules"
                                        />
                                </div>
                                <div className="snap-mandatory snap-center mr-5"
                                    onClick={handleFeature4}
                                >
                                    <FeautreCards
                                            BgColor={`${isHovering.isHoveredFeature4 ? "info" : "white"}`}
                                            TextColor={`${isHovering.isHoveredFeature4 ? "white" : "black"}`}
                                            ArrowColor={`${isHovering.isHoveredFeature4 ? "#FDB813" : "#1E4C2B"}`}
                                            Title="Schedule Management"
                                            Desc="Efficiently Manage your Schedules"
                                        />
                                </div>
                                <div className="snap-mandatory snap-center mr-5"
                                    onClick={handleFeature5}
                                >
                                    <FeautreCards
                                            BgColor={`${isHovering.isHoveredFeature5 ? "info" : "white"}`}
                                            TextColor={`${isHovering.isHoveredFeature5 ? "white" : "black"}`}
                                            ArrowColor={`${isHovering.isHoveredFeature5 ? "#FDB813" : "#1E4C2B"}`}
                                            Title="Schedule Management"
                                            Desc="Efficiently Manage your Schedules"
                                        />
                                </div>
                        </Grid>

                        <Grid item
                            className="hidden lg:block"
                            md={4}
                        >
                            <Grid container
                            direction="column"
                            alignItems="center"
                            rowSpacing={2}
                            sx={{
                                height: "100%"
                            }}
                            >
                                {/* Area for Features */}

                                <Grid item
                                    sx={{
                                        textAlign: "center",
                                        marginTop: "2vh"
                                    }}
                                >
                                    <SoftTypography>
                                        <span
                                            className="md:text-[30pt] font-themeHeader font-extrabold text-themeorange bg-white p-2 rounded-lg "
                                        >
                                            Features
                                        </span>
                                    </SoftTypography>
                                </Grid>
                                
                                <Grid item
                                    sx={{
                                        width: "90%"
                                    }}
                                    onMouseEnter={handleFeature1}
                                >
                                    <FeautreCards
                                        BgColor={`${isHovering.isHoveredFeature1 ? "info" : "white"}`}
                                        TextColor={`${isHovering.isHoveredFeature1 ? "white" : "black"}`}
                                        ArrowColor={`${isHovering.isHoveredFeature1 ? "#FDB813" : "#1E4C2B"}`}
                                        Title="Schedule Management"
                                        Desc="Efficiently Manage your Schedules"
                                    />
                                </Grid>
                                
                                <Grid item
                                    sx={{
                                        width: "90%"
                                    }}
                                    onMouseEnter={handleFeature2}
                                >
                                    <FeautreCards
                                        BgColor={`${isHovering.isHoveredFeature2 ? "info" : "white"}`}
                                        TextColor={`${isHovering.isHoveredFeature2 ? "white" : "black"}`}
                                        ArrowColor={`${isHovering.isHoveredFeature2 ? "#FDB813" : "#1E4C2B"}`}
                                        Title="Record Keeping"
                                        Desc="Helps in storing historical counceling records"
                                    />
                                </Grid>
                                
                                <Grid item
                                    sx={{
                                        width: "90%"
                                    }}
                                    onMouseEnter={handleFeature3}
                                >
                                    <FeautreCards
                                        BgColor={`${isHovering.isHoveredFeature3 ? "info" : "white"}`}
                                        TextColor={`${isHovering.isHoveredFeature3 ? "white" : "black"}`}
                                        ArrowColor={`${isHovering.isHoveredFeature3 ? "#FDB813" : "#1E4C2B"}`}
                                        Title="Blog Section"
                                        Desc="Promoting the benefits of Counseling"
                                    />
                                </Grid>
                                
                                <Grid item
                                    sx={{
                                        width: "90%"
                                    }}
                                    onMouseEnter={handleFeature4}
                                >
                                    <FeautreCards
                                        BgColor={`${isHovering.isHoveredFeature4 ? "info" : "white"}`}
                                        TextColor={`${isHovering.isHoveredFeature4 ? "white" : "black"}`}
                                        ArrowColor={`${isHovering.isHoveredFeature4 ? "#FDB813" : "#1E4C2B"}`}
                                        Title="Parent/Student Space"
                                        Desc="Let's Student/Parents and Counselors easily connect with each other"
                                    />
                                </Grid>
                                
                                <Grid item
                                    sx={{
                                        width: "90%"
                                    }}
                                    onMouseEnter={handleFeature5}
                                >
                                    <FeautreCards
                                        BgColor={`${isHovering.isHoveredFeature5 ? "info" : "white"}`}
                                        TextColor={`${isHovering.isHoveredFeature5 ? "white" : "black"}`}
                                        ArrowColor={`${isHovering.isHoveredFeature5 ? "#FDB813" : "#1E4C2B"}`}
                                        Title="Visual Self-Expression Tool"
                                        Desc="Analyzes student drawings for visual self-expression"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
          </SoftBox>
    );
};

export default FeaturesPage;