import http from "../utils/utils";

const updateRequest = async (url: string, body: any) => {
  try {
    const request = await http.put(
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

export default updateRequest;
