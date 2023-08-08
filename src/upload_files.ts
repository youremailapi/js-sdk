import axios from "axios";
import { existsSync, createReadStream } from "fs";
import * as FormData from "form-data";

export async function uploadFiles(
  apikey: string,
  filesPaths: Array<string> | string
) {
  const formData = new FormData();

  if (typeof filesPaths === "string") {
    if (!existsSync(filesPaths)) {
      throw new Error(`File ${filesPaths} does not exists`);
    }
    formData.append("files", createReadStream(filesPaths));
  } else {
    filesPaths.forEach((filePath) => {
      if (!existsSync(filePath)) {
        throw new Error(`File ${filePath} does not exists`);
      }
      formData.append("files", createReadStream(filePath));
    });
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
