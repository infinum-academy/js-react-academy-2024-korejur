import { swrKeys } from "@/fetchers/swrKeys";
import { IShow, IShowList } from "@/typings/show.types";
import { render } from "@testing-library/react";
import useSWR from "swr";
import { ShowCard } from "../../../shared/ShowCard/ShowCard";
import { ShowsList } from "./ShowsList";

jest.mock("swr");
jest.mock("../../../shared/ShowCard/ShowCard", () => ({
  ShowCard: jest.fn().mockReturnValue(null),
}));

describe("ShowsList", () => {
  const mockShows: IShow[] = [
    {
      id: 1,
      title: "Show 1",
      image_url: "/path/to/image1.jpg",
      image_alt: "Image 1",
      average_rating: 4.5,
      description: "Some description for Show 1",
    },
    {
      id: 2,
      title: "Show 2",
      image_url: "/path/to/image2.jpg",
      image_alt: "Image 2",
      average_rating: 3.8,
      description: "Some description for Show 2",
    },
  ];

  const mockResponse: IShowList = {
    shows: mockShows,
  };

  beforeEach(() => {
    (useSWR as jest.Mock).mockImplementation(() => ({
      data: mockResponse,
      error: null,
    }));
  });

  it("renders ShowCard with appropriate props", () => {
    render(<ShowsList route={swrKeys.shows} />);

    mockShows.forEach((show) => {
      expect(ShowCard).toHaveBeenCalledWith({ show }, expect.anything());
    });
  });
});
