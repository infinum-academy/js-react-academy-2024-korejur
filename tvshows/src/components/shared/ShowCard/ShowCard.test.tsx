import { render, screen } from "@testing-library/react";
import { ShowCard } from "./ShowCard";

describe("ShowCard", () => {
  const mockShow = {
    id: 106,
    average_rating: 2,
    description:
      "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    image_url: "https://picsum.photos/400/600?random=1",
    no_of_reviews: 4,
    title: "Stranger Things",
  };

  it("should render card", () => {
    render(<ShowCard show={mockShow} />);
    const card = screen.getByRole("link");

    expect(card).toBeInTheDocument();
  });

  it("should render image", () => {
    render(<ShowCard show={mockShow} />);
    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("should render title", () => {
    render(<ShowCard show={mockShow} />);
    const title = screen.getByText(mockShow.title);

    expect(title).toBeInTheDocument();
  });

  it("should render rating", () => {
    render(<ShowCard show={mockShow} />);
    const rating = screen.getByText("2.0 / 5");

    expect(rating).toBeInTheDocument();
  });
});
