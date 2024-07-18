import { IReview } from "@/typings/review.types";
import { render } from "@testing-library/react";
import { ReviewItem } from "./ReviewItem";

jest.mock("./ReviewItem", () => ({
  ReviewItem: jest.fn().mockReturnValue(null),
}));

describe("ReviewItem", () => {
  const mockReview: IReview = {
    show_id: 1,
    avatar: "/path/to/avatar.jpg",
    email: "example@example.com",
    rating: 4.5,
    comment: "Great show!",
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    (ReviewItem as jest.Mock).mockClear();
  });

  it("renders ReviewItem with appropriate props", () => {
    render(<ReviewItem reviewItem={mockReview} onDelete={mockOnDelete} />);

    expect(ReviewItem).toHaveBeenCalledWith(
      {
        reviewItem: mockReview,
        onDelete: mockOnDelete,
      },
      {}
    );
  });
});
