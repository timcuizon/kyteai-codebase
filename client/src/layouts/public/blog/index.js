/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BlogCoverLayout from "layouts/public/authentication/components/BlogCoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import TransparentBlogCardFolderOnly from "layouts/public/authentication/components/TransparentBlogCardFolderOnly";
import blogcover from "assets/images/blogcover.jpeg"



function Blog() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    
    <BlogCoverLayout>
      
  
    </BlogCoverLayout>
    
  );
}

export default Blog;
