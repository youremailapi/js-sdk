import axios from "axios";
import { deleteFiles } from "../src/delete_files";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.delete.mockResolvedValue({
  data: "1 files deleted",
});

describe("delete files from api", () => {
  it("should delete one file", async () => {
    const result = await deleteFiles("SOME_API_KEY", ["SOME_FILE_TOKEN"]);

    expect(result.data).toBe("1 files deleted");
    expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "https://api.youremailapi.com/files",
      expect.objectContaining({
        data: {
          files: ["SOME_FILE_TOKEN"],
        },
        headers: {
          apikey: "SOME_API_KEY",
        },
      })
    );
  });
});
