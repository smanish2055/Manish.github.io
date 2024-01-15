
const jwt = localStorage.getItem("jwt");
// Check if the value exists
if (jwt !== null) {
  window.location.href = "/src/Components/MainPage/main.html";
} else {
  window.location.href = "/src/Components/Register/register.html";
}

// if()
