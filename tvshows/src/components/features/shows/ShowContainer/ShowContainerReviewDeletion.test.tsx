import { act, render, screen, waitFor } from "@testing-library/react";
import { ShowContainer } from "./ShowContainer";
import { swrKeys } from "@/fetchers/swrKeys";
import { deleteReview } from "@/fetchers/mutators";
import useSWR, { mutate } from "swr";
import { IReviewList } from "@/typings/review.types";

jest.mock("@/fetchers/mutators", () => ({
  deleteReview: jest.fn().mockResolvedValue(null),
}));

jest.mock("swr", () => {
  const originalModule = jest.requireActual("swr");

  return {
    ...originalModule,
    mutate: jest.fn(),
  };
});

const mockShow = {
  id: 1,
  title: "Test Show",
  description: "Test description",
};

const mockReviews: IReviewList = {
  reviews: [
    {
      show_id: 1,
      avatar: "/path/to/avatar.jpg",
      email: "example@example.com",
      rating: 4.5,
      comment: "Great show!",
    },
  ],
};

describe("ShowContainer", () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockImplementation((key) => {
      switch (key) {
        case swrKeys.show(mockShow.id):
          return { data: mockShow, error: null, isLoading: false };
        case swrKeys.reviews(mockShow.id):
          return { data: mockReviews, error: null, isLoading: false };
      }
    });
  });

  it("should call deleteReview on remove button click and trigger mutate", async () => {
    render(<ShowContainer />);

    const removeButton = await screen.findByRole("button", { name: "Remove" });

    act(() => {
      removeButton.click();
    });

    await waitFor(() => {
      expect(deleteReview).toHaveBeenCalledWith(
        swrKeys.review(mockReviews.reviews[0].id)
      );
      expect(mutate).toHaveBeenCalledWith(swrKeys.reviews(mockShow.id));
    });
  });
});
