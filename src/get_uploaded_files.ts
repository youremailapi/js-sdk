import axios from "axios";

export async function getUploadedFiles(apikey: string) {
  return axios
    .get("https://api.youremailapi.com/files", {
      headers: {
        apikey,
      },
    })
    .then((data) => {
      return { data: data.data };
    })
    .catch((response) => {
      return response;
    });
}
