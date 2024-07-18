import { render, screen, waitFor } from "@testing-library/react";
import { ShowReviewSection } from "./ShowReviewSection";
import { swrKeys } from "@/fetchers/swrKeys";
import { mutate } from "swr";

jest.mock("swr", () => {
  const originalModule = jest.requireActual("swr");

  return {
    ...originalModule,
    mutate: jest.fn(),
  };
});

describe("ShowReviewSection Component", () => {
  it("calls mutate deleteShowReview is called", async () => {
    const reviewListResponse = {
      reviews: [
        { id: 1, show_id: 1, rating: 4, comment: "Great show!" },
        { id: 2, show_id: 1, rating: 3, comment: "Good but could be better." },
      ],
      };
      
      const mockDeleteShowReview = jest.fn();

    render(
      <ShowReviewSection
        reviewList={reviewListResponse}
        addShowReview={() => {}}
        deleteShowReview={mockDeleteShowReview}
        showId={1}
      />
    );

    const removeButton = screen.getAllByText('Remove')[0];
      removeButton.click();

      await waitFor(() => {
        expect(mockDeleteShowReview).toHaveBeenCalled();
      });
  
      expect(mutate).toHaveBeenCalledWith(swrKeys.reviews(1));
  });
});
