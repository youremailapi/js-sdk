import axios from "axios";
import { uploadFiles } from "../src/upload_files";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.post.mockResolvedValue({
  data: ["SOME_FILE_ID"],
});

describe("upload files to api", () => {

  it("should upload a file and return array of files", async () => {
    const mockFile = new File(["file content"], "Eventi.ar.png", { type: "image/png" });

    const result = await uploadFiles("SOME_API_KEY", mockFile);

    expect(result.data).toContain("SOME_FILE_ID");
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    mockedAxios.post.mockRestore();
  });

  it("should throw error exception because the input is not a valid file object", async () => {
    const mockInvalidFile = "InvalidFile";

    try {
      await uploadFiles("SOME_API_KEY", mockInvalidFile);
    } catch (error) {
      expect(mockedAxios.post).toBeCalledTimes(0);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`Invalid input: files must be a File object or an array of File objects`);
    }
  });

  it("should throw error exception because the file array contains an invalid item", async () => {
    const mockFiles = [new File(["file content"], "Eventi.ar.png", { type: "image/png" }), "InvalidFile"];

    try {
      await uploadFiles("SOME_API_KEY", mockFiles);
    } catch (error) {
      expect(mockedAxios.post).toBeCalledTimes(0);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`Item InvalidFile is not a valid File object`);
    }
  });
});
