import { getCookie } from "./CookieHelper";

function isLoggedIn() {
  var isLogged = getCookie("isLoggedIn");
  var user_token = getCookie("user_token");
  if (isLogged && (user_token != null || user_token != "")) {
    return true;
  } else {
    return false;
  }
}

export { isLoggedIn };

function formatDate(dateString) {
  const rawDate = dateString;
  const date = new Date(rawDate);

  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
export { formatDate };

function formatDateTime(dateString) {
  const rawDate = dateString;
  const date = new Date(rawDate);

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
export { formatDateTime };

function replaceLastCharacter(x) {
  if (x.length > 0) {
    const updatedString = x.slice(0, -1) + "'"; // Replace 'X' with the character you want
    return updatedString;
  }
}
export { replaceLastCharacter };
