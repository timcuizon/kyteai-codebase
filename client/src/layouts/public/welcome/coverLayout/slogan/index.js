import SoftBox from "components/SoftBox";
import SloganBG from "assets/images/bg/samwon_slogan_bg.png";
import Logo from "assets/images/logos/samwon-logo.png";
import TextBG from "assets/images/bg/curvy_bg.png";
import TextBGMobile from "assets/images/bg/curvy_bg_mobile.png";
import SoftTypography from "components/SoftTypography";

function SloganPage(){
    return(
        <SoftBox
            minHeight="100vh"
            sx={{
              backgroundImage: `url(${SloganBG})`,
              backgroundSize: "cover"
            }}
          >
            <SoftBox
                className="lg:hidden"
                minHeight="100vh"
                sx={{
                backgroundImage: `url(${TextBGMobile})`,
                backgroundSize: "cover"
                }}
            >
                
                <img
                    src={Logo} 
                    className="h-[75px] md:h-[100px] relative left-[20px] md:left-[30px] top-[52vh]" />
                    

                <span
                    className="relative left-[20px] md:left-[30px] top-[65vh]"
                >
                    <SoftTypography>
                        <span className="text-[20pt] md:text-[26pt] font-bold font-themeHeader">
                            Because Everybody <br/>
                            needs Sam Won
                        </span>
                    </SoftTypography>
                </span>
                
                <span
                    className="relative left-[20px] md:left-[30px] top-[65vh]"
                >
                    <SoftTypography>
                        <span className="text-[10pt] md:text-[10pt] font-bold font-themeContent">
                            SamWon is an E-Counseling  <br/>
                            web-application with an integrated <br/>
                            Drawing Analysis Tool
                        </span>
                    </SoftTypography>
                </span>
                
            </SoftBox>

            <SoftBox
                className="hidden lg:block"
                minHeight="100vh"
                sx={{
                backgroundImage: `url(${TextBG})`,
                backgroundSize: "cover"
                }}
            >
                
                <img
                    src={Logo} 
                    className="h-[10px] lg:h-[100px] relative left-[60px] lg:top-[32vh]" />
                    

                <span
                    className="relative left-[60px] top-[42vh]"
                >
                    <SoftTypography>
                        <span className="lg:text-[18pt] xl:text-[32pt] font-bold font-themeHeader">
                            Because Everybody needs <br/>
                            Sam Won
                        </span>
                    </SoftTypography>
                </span>

                <span
                    className="relative left-[60px] top-[43vh]"
                >
                    <SoftTypography>
                        <span className="lg:text-[12pt] xl:text-[15pt] font-bold font-themeHeader ">
                            SamWon is an E-Counseling web application <br/>
                            with an integrated Drawing Analysis Tool
                        </span>
                    </SoftTypography>
                </span>
            </SoftBox>
          </SoftBox>
    );
};

export default SloganPage;