import { render, screen } from "@testing-library/react";
import { ReviewItem } from "./ReviewItem";

describe("ReviewItem", () => {
  const mockReview = {
    email: "example@gmail.com",
    rating: 5,
    review: "great show",
  };

  it("should render email", () => {
    render(<ReviewItem reviewItem={mockReview} onDelete={() => {}} />);
    const email = screen.getByText(mockReview.email.split("@")[0]);

    expect(email).toBeInTheDocument();
  });

  it("should render rating", () => {
    render(<ReviewItem reviewItem={mockReview} onDelete={() => {}} />);
    const rating = screen.getByText(`${mockReview.rating} / 5`);

    expect(rating).toBeInTheDocument();
  });

  it("should render review", () => {
    render(<ReviewItem reviewItem={mockReview} onDelete={() => {}} />);
    const review = screen.getByText(mockReview.review);

    expect(review).toBeInTheDocument();
  });

  it("should render delete button", () => {
    render(<ReviewItem reviewItem={mockReview} onDelete={() => {}} />);
    const deleteButton = screen.getByText("Remove");

    expect(deleteButton).toBeInTheDocument();
  });

  it("should call onDelete when delete button is clicked", () => {
    const mockOnDelete = jest.fn();
    render(<ReviewItem reviewItem={mockReview} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByText("Remove");
    deleteButton.click();

    expect(mockOnDelete).toHaveBeenCalled();
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockReview);
  });
});
