// @mui material components
import Grid from "@mui/material/Grid";
import SoftButton from "components/SoftButton";

function DrawingInfo({ object, assessment_id, email }) {
  // Function for toggling image versions
  const handleViewHistory = () => {
    window.location.replace("/records/list?email=" + email);
  };

  return (
    <>
      {/* Drawing Info Component */}
      <Grid item xs={12} sm={12} xl={6}>
        <div className="bg-colorISMgreen text-white border rounded-lg md:p-5 p-3 md:flex block items-center shadow-lg">
          <Grid item xs={12} sm={6} xl={6}>
            <div>
              <span className="font-themeHeader text-lg">Assessment Type: </span>
              <span className="text-lg">Draw-A-{object}</span>
            </div>
            <div>
              <span className="font-themeHeader text-lg">Assessment Id: </span>
              <span className="text-lg">{assessment_id}</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} xl={6}>
            <div className="w-full">
              <SoftButton
                variant="outlined"
                color="light"
                type="button"
                onClick={() => handleViewHistory("detectedVersion")}
              >
                View Historical Records
              </SoftButton>
            </div>
          </Grid>
        </div>
      </Grid>
    </>
  );
}

export default DrawingInfo;
