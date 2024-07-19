import { ShowReviewSection } from "@/components/features/review/ShowReviewSection/ShowReviewSection";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IReview, IReviewList } from "@/typings/review.types";
import { Container } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ShowDetailsCard } from "../ShowDetailsCard/ShowDetailsCard";

const mockReviewList: IReviewList = {
  reviews: [],
};

export const ShowContainer = () => {
  const params = useParams();
  const showId = params?.id;

  const {
    data: showListResponse,
    error,
    isLoading,
  } = useSWR(swrKeys.show(Number(showId)), { fetcher });

  const [reviewList, setReviewList] = useState(mockReviewList);

  useEffect(() => {
    if (showId) {
      const loadedList = loadFromLocalStorage(Number(showId));
      setReviewList(loadedList);
    }
  }, [showId]);

  const saveToLocalStorage = (showId: number, reviewList: IReviewList) => {
    localStorage.setItem(`reviewlist-${showId}`, JSON.stringify(reviewList));
  };

  const loadFromLocalStorage = (showId: number) => {
    const reviewListString = localStorage.getItem(`reviewlist-${showId}`);
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

  const generateUniqueId = () => {
    return Math.floor(Math.random() * Date.now());
  };

  const addShowReview = (review: IReview) => {
    const newReview = {
      ...review,
      id: generateUniqueId(),
      showId: Number(showId),
    };
    const newList = {
      reviews: [...reviewList.reviews, newReview],
    };
    setReviewList(newList);
    saveToLocalStorage(Number(showId), newList);
  };

  const deleteShowReview = (reviewToRemove: IReview) => {
    const newList = {
      reviews: reviewList.reviews.filter(
        (review) => review.id !== reviewToRemove.id
      ),
    };
    setReviewList(newList);
    saveToLocalStorage(Number(showId), newList);
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
    return <div>Oops, something went wrong...</div>;
  }

  console.log("ShowContainer:", showListResponse);

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
      <ShowReviewSection
        reviewList={reviewList}
        addShowReview={addShowReview}
        deleteShowReview={deleteShowReview}
        showId={Number(showId)}
      />
    </Container>
  );
};
