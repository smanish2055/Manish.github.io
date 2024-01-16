import http from "../utils/utils";
import { HttpStatusCode } from "axios";
const createPostRequest = async (url: string, body: any) => {
  try {
    const request = await http.post(
      url,
      { ...body },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
    return request;
  } catch (error: any) {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      window.location.href = "/src/Components/Login/login.html";
    }
    throw error;
  }
};

export default createPostRequest;
