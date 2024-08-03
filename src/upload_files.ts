import axios from "axios";

export async function uploadFiles(apikey, files) {
  const formData = new FormData();

  if (files instanceof File) {
    formData.append("files", files);
  } else if (Array.isArray(files)) {
    files.forEach((file) => {
      if (!(file instanceof File)) {
        throw new Error(`Item ${file} is not a valid File object`);
      }
      formData.append("files", file);
    });
  } else {
    throw new Error(
      "Invalid input: files must be a File object or an array of File objects"
    );
  }

  return axios
    .post("https://api.youremailapi.com/files", formData, {
      headers: {
        apikey,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => {
      return { data: data.data };
    })
    .catch((response) => {
      return response;
    });
}
