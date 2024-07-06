"use client";
import { IShow } from "@/typings/show";
import { Fragment } from "react";
import { ShowDetailsCard } from "../../shared/ShowDetailsCard";

const myShow: IShow = {
  title: "The Simpsons",
  description:
    "The Simpsons uses the standard setup of a situational comedy, or sitcom, as its premise. The series centers on a family and their life in a typical American town, serving as a satirical parody of a middle class American lifestyle.",
  image_url: "/images/simpsons.jpg",
  image_alt: "Photo of The Simpsons",
  averageRating: undefined,
};

export const ShowDetails = () => {
  return (
    <Fragment>
      <ShowDetailsCard show={myShow} />
    </Fragment>
  );
};

export default ShowDetails;
