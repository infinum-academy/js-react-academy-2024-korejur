"use client";
import { ShowDetailsCard } from "@/components/shared/ShowDetailsCard/ShowDetailsCard";
import { getShow } from "@/fetchers/show";
import { IReview, IReviewList } from "@/typings/review.types";
import { Container } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ReviewList } from "../../review/ReviewList/ReviewList";
import { ReviewForm } from "../ReviewForm/ReviewForm";

const mockReviewList: IReviewList = {
  title: "Reviews",
  reviews: [],
};

export const ShowReviewSection = () => {
    const params = useParams();

  const {
    data: showListResponse,
    error,
    isLoading,
  } = useSWR(`/shows/${params?.id}`, () => getShow(params?.id as string));

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

  if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Ups something went wrong...</div>;
	}

  return (
    <Container
      maxW="container.lg"
      backgroundColor="#1e024d"
      textColor="aliceblue"
      p="5vh"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {showListResponse && (
        <ShowDetailsCard show={showListResponse} averageRating={avgRating()} />
      )}
      <ReviewForm onAdd={addShowReview} />
      {reviewList.reviews.length > 0 && (
        <ReviewList reviewList={reviewList} onDeleteReview={deleteShowReview} />
      )}
    </Container>
  );
};
