import axios from "axios";

export async function deleteFiles(apikey: string, filesPaths: Array<string>) {
  return axios
    .delete("https://api.youremailapi.com/files", {
      data: {
        files: filesPaths,
      },
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
