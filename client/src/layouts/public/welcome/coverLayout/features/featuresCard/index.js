import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function FeautreCards({Title, Desc, BgColor, TextColor, ArrowColor}){

    return(
        <SoftBox
            variant="gradient"
            bgColor={BgColor}
            sx={{
                borderRadius: "1rem",
                borderBottom: "3px #FDB813 solid"
            }}
            p={2}
            className="w-[250px] lg:w-[440px]"
        >
            <Grid container>
                <Grid item
                    md={10}
                >
                    <SoftTypography
                    color={TextColor}
                    >
                        <span
                            className="text-[15pt] font-bold font-themeHeader"
                        >
                            {Title}
                        </span>
                    </SoftTypography>
                    
                    <SoftTypography
                        color={TextColor}
                        sx={{
                            lineHeight: 1
                        }}
                    >
                        <span
                            className="text-[10pt] font-themeContent"
                        >
                            {Desc}
                        </span>
                    </SoftTypography>
                </Grid>
                <Grid item
                    md={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    component={Link}
                    to="/authentication/sign-in"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill={ArrowColor} className="bi bi-arrow-right-circle-fill pt-[10px] lg:pt-[0px]" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                </Grid>
            </Grid>
        </SoftBox>
    );
};

export default FeautreCards;