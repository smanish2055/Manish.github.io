localStorage.removeItem("test");
const storedValue = localStorage.getItem("test");

// Check if the value exists
if (storedValue !== null) {
  window.location.href = "/src/Components/MainPage/main.html";
} else {
  window.location.href = "/src/Components/Register/register.html";
}

// if()
