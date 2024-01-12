import http from "../utils/utils";

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
  } catch (error) {
    throw error;
  }
};

export default createPostRequest;
