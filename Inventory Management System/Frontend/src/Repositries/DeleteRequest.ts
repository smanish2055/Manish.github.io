import { HttpStatusCode } from "axios";
import http from "../utils/utils";
const createDeleteRequest = async (url: string) => {
  try {
    const response = await http.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response;
  } catch (error: any) {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      window.location.href = "/src/Components/Register/register.html";
    }
  }
};


export default createDeleteRequest;
