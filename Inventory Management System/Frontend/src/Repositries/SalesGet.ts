import { HttpStatusCode } from "axios";
import http from "../utils/utils";

const createGetRequest = async (url: string) => {
  const response = await http.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  if (response.status === HttpStatusCode.Accepted) {
    return response.data.result;
  }
};

export default createGetRequest;
