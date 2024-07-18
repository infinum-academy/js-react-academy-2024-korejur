import { render } from "@testing-library/react";
import { ReviewItem } from "./ReviewItem";
import { IReview } from "@/typings/review.types";

const mockReview: IReview = {
    show_id: 1,
    avatar: "/path/to/avatar.jpg",
    email: "example@example.com",
    rating: 4.5,
    comment: "Great show!",
  };

describe("ReviewItem Component", () => {
  it("calls onDelete with correct reviewItem when delete button is clicked", () => {
    const onDeleteMock = jest.fn();

    const { getByText } = render(
      <ReviewItem reviewItem={mockReview} onDelete={onDeleteMock} />
    );

    const removeButton = getByText("Remove");
    removeButton.click();
    expect(onDeleteMock).toHaveBeenCalledWith(mockReview);
  });
});
