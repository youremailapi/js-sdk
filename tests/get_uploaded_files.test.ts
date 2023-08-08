import axios from "axios";
import { getUploadedFiles } from "../src/get_uploaded_files";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue({
  data: {
    files: [
      {
        id: 2,
        token:
          "2a6a04f7b3fc9cc8267d1e7194935366990d208108aa82b7c0b6d992b8fa0115",
        size: 553443,
        name: "2a6a04f7b3fc9cc8267d1e7194935366990d208108aa82b7c0b6d992b8fa0115.gif",
        created_at: "2023-08-08T02:40:24.868Z",
      },
    ],
    meta: {
      total_bytes: 553443,
    },
  },
});

describe("get uploaded files from api", () => {
  it("should return uploaded files", async () => {
    const result = await getUploadedFiles("SOME_API_KEY");

    expect(result.data.files).toHaveLength(1);
    expect(result.data.files[0].id).toBe(2);
    expect(result.data.meta.total_bytes).toEqual(result.data.files[0].size);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.youremailapi.com/files",
      expect.objectContaining({
        headers: {
          apikey: "SOME_API_KEY",
        },
      })
    );
  });
});

