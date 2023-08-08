import axios from "axios";
import { readFileSync, existsSync } from "fs";

export async function uploadFiles(
  apikey: string,
  filesPaths: Array<string> | string
) {
  const formData = new FormData();

  if (typeof filesPaths === "string") {
    if (!existsSync(filesPaths)) {
      throw new Error(`File ${filesPaths} does not exists`);
    }

    const file = new Blob([readFileSync(filesPaths)]);
    formData.append("files", file);
  } else {
    filesPaths.forEach((filePath) => {
      if (!existsSync(filePath)) {
        throw new Error(`File ${filePath} does not exists`);
      }
      formData.append("files", new Blob([readFileSync(filePath)]));
    });
  }

  return axios
    .post("https://api.youremailapi.com/files", formData, {
      headers: {
        apikey,
        "Content-Type": "application/form-data",
      },
    })
    .then((data) => {
      return { data: data.data };
    })
    .catch((response) => {
      return response;
    });
}
