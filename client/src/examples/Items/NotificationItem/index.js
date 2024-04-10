import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { menuItem, menuImage } from "examples/Items/NotificationItem/styles";

const NotificationItem = forwardRef(({ color, type, details, title, date, image, ...rest }, ref) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
        <SoftBox
          width="2.25rem"
          height="2.25rem"
          mt={0.25}
          mr={2}
          mb={0.25}
          borderRadius="lg"
          sx={(theme) => menuImage(theme, { color })}
        >
          {image}
        </SoftBox>
        <SoftBox>
          <SoftTypography variant="button" textTransform="capitalize" fontWeight="regular">
            <strong>{type} {title}</strong>
          </SoftTypography>
          <SoftTypography variant="body2" color="textSecondary">
            {details.length > 50 ? details.substring(0, 50) + '...' : details}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            <SoftTypography variant="button" color="secondary">
              <Icon sx={{ lineHeight: 1.2, mr: 0.5 }}>watch_later</Icon>
            </SoftTypography>
            {date}
          </SoftTypography>
        </SoftBox>
        {/* <IconButton 
          aria-label="Delete" 
          onClick={onDelete}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ color: hovered ? 'red' : 'inherit' }}
        >
          <Icon>delete</Icon>
        </IconButton> */}
    </MenuItem>
  );
});

NotificationItem.defaultProps = {
  color: "dark",
};

NotificationItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  type: PropTypes.string,
  details: PropTypes.string.isRequired,
  title: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.node.isRequired,
  // onDelete: PropTypes.func,
};

export default NotificationItem;
