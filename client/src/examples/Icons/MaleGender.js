// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function MaleGender({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      stroke="#5FACDF"
      strokeWidth="1.5"
    >
      <title>MaleGender</title>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#292627"
        strokeWidth="0.3"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z"
          fill="#5FACDF"
        ></path>{" "}
      </g>
    </svg>
  );
}

// Setting default values for the props of MaleGender
MaleGender.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the MaleGender
MaleGender.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default MaleGender;
