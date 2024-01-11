
import axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm") as HTMLFormElement;

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const formData = {
        username: (document.getElementById("username") as HTMLInputElement)
          .value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        password: (document.getElementById("password") as HTMLInputElement)
          .value,
        // Add other form fields if needed
      };

      // Send data to Node.js server using Axios
      const response = await axios.post("http://localhost:5005/register", formData);

      // Handle successful response
      console.log("Data sent successfully", response.data);
    } catch (error) {
      // Handle error
      console.error("Error sending data", error);
    }
  });
});
