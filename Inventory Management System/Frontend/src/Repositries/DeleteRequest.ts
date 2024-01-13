// import { HttpStatusCode } from "axios";
import http from "../utils/utils";
const createDeleteRequest = async (url: string) => {
  const response = await http.delete(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return response;
};

export default createDeleteRequest;
