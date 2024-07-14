"use client";
import { getShowsList, getTopRatedShowsList } from "@/fetchers/show";
import { IShow } from "@/typings/show.types";
import { SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react";
import useSWR from "swr";
import { ShowCard } from "../ShowCard/ShowCard";

interface IWhichList {
  route: string;
  getter: boolean;
}

export const ShowsList = ({ route, getter }: IWhichList) => {
  const { data: showsListResponse, error } = useSWR(
    route,
    getter ? getShowsList : getTopRatedShowsList
  );

  if (!showsListResponse) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops, something went wrong...</div>;
  }

  const { shows } = showsListResponse;

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
