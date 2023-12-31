import axios from "axios";
import { uploadFiles } from "../src/upload_files";
import * as path from "path";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.post.mockResolvedValue({
  data: ["SOME_FILE_ID"],
});

describe("upload files to api", () => {

  it("should upload a file and return array of files", async () => {
    const mockFile: string = path.resolve("Eventi.ar.png");

    const result = await uploadFiles("SOME_API_KEY", mockFile);

    expect(result.data).toContain("SOME_FILE_ID");
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    mockedAxios.post.mockRestore();
  });

  it("should throw error exception becouse file does not exists", async () => {
    const mockFile: string = path.resolve("Eventi.aar.png");
    try {
      await uploadFiles("SOME_API_KEY", mockFile);
    } catch (error) {
      expect(mockedAxios.post).toBeCalledTimes(0);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`File ${mockFile} does not exists`)
    }
  });
});
