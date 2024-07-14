"use client";
import { fetcher } from "@/fetchers/fetcher";
import { IShow } from "@/typings/show.types";
import { SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react";
import useSWR from "swr";
import { ShowCard } from "../ShowCard/ShowCard";

interface IWhichList {
  route: string;
}

export const ShowsList = ({ route }: IWhichList) => {
  const { data: showsListResponse, error } = useSWR(route, fetcher);

  if (!showsListResponse) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops, something went wrong...</div>;
  }

  const { shows } = showsListResponse as { shows: IShow[] };

  return (
    <Fragment>
      <SimpleGrid columns={[1, 1, 2, 3, 4, 6]} spacing={4}>
        {shows.map((show: IShow) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </SimpleGrid>
    </Fragment>
  );
};
