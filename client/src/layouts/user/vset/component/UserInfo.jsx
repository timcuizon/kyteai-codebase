// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftAvatar from "components/SoftAvatar";

import ChildImage from "assets/images/child_pic.jpg";
import MaleGender from "examples/Icons/MaleGender";
import FemaleGender from "examples/Icons/FemaleGender";

function UserInfo({ name, birthday, age, gender, image }) {
  const Gender = () => {
    if (gender === "Male") {
      return <MaleGender size="40px" />;
    } else if (gender === "Female") {
      return <FemaleGender size="40px" />;
    } else {
      return null; // Handle other gender values or return an empty element
    }
  };

  return (
    <>
      {/* User Info Component */}
      <Grid item xs={12} sm={12} xl={6}>
        <div className="bg-colorISMgreen text-white border rounded-lg md:p-5 p-3 md:flex block items-center shadow-lg">
          {/* Images */}
          <div className="md:w-3/5 w-full flex items-center">
            <SoftAvatar src={image} alt="profile-image" variant="rounded" size="xl" shadow="sm" />
            <div className="flex flex-row items-center ml-5 w-full">
              <span className="font-themeHeader mr-2">{name}</span>
              <Gender />
            </div>
          </div>
          {/* User Info */}
          <div className="md:w-2/5 w-full block">
            <div>
              <span className="font-themeHeader text-lg">Date of Birth: </span>
              <span className="text-lg">{birthday}</span>
            </div>
            <div>
              <span className="font-themeHeader text-lg">Age: </span>
              <span className="text-lg">{age} years old</span>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
}

export default UserInfo;
