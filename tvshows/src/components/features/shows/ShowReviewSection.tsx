"use client";
import { Fragment, useEffect, useState } from "react";
import { IReview, IReviewList } from "@/typings/review.types";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "../review/ReviewList";
import { ShowDetailsCard } from "@/components/shared/ShowDetailsCard/ShowDetailsCard";
import { IShow } from "@/typings/show.types";

const mockReviewList: IReviewList = {
  title: "Reviews",
  reviews: [],
};

const myShow: IShow = {
  title: "The Simpsons",
  description:
    "The Simpsons uses the standard setup of a situational comedy, or sitcom, as its premise. The series centers on a family and their life in a typical American town, serving as a satirical parody of a middle class American lifestyle.",
  image_url: "/images/simpsons.jpg",
  image_alt: "Photo of The Simpsons",
  averageRating: undefined,
};

export const ShowReviewSection = () => {
  const [reviewList, setReviewList] = useState(mockReviewList);

  useEffect(() => {
    const loadedList = loadFromLocalStorage();
    setReviewList(loadedList);
  }, []);

  const saveToLocalStorage = (reviewList: IReviewList) => {
    localStorage.setItem("reviewlist", JSON.stringify(reviewList));
  };

  const loadFromLocalStorage = () => {
    const reviewListString = localStorage.getItem("reviewlist");
    if (!reviewListString) {
      return mockReviewList;
    }
    try {
      return JSON.parse(reviewListString);
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return mockReviewList;
    }
  };

  const addShowReview = (review: IReview) => {
    const newList = {
      title: reviewList.title,
      reviews: [...reviewList.reviews, review],
    };
    setReviewList(newList);
    saveToLocalStorage(newList);
  };

  const deleteShowReview = (reviewToRemove: IReview) => {
    const newList = {
      title: reviewList.title,
      reviews: reviewList.reviews.filter((review) => review !== reviewToRemove),
    };
    setReviewList(newList);
    saveToLocalStorage(newList);
  };

  const avgRating = () => {
    if (reviewList.reviews.length === 0) {
      return null;
    }
    const totalRating = reviewList.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / reviewList.reviews.length;
  };

  return (
    <Fragment>
      <ShowDetailsCard show={myShow} averageRating={avgRating()} />
      <ReviewForm onAdd={addShowReview} />
      {reviewList.reviews.length > 0 && (
        <ReviewList reviewList={reviewList} onDeleteReview={deleteShowReview} />
      )}
    </Fragment>
  );
};
