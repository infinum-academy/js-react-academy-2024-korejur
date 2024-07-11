"use client";
import { IShow } from "@/typings/show.types";
import { SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react";
import { ShowCard } from "../ShowCard/ShowCard";
import useSWR from "swr";

interface IWhichList {
  route: string;
  getter: () => Promise<any>;
}

export const ShowsList = ({ route, getter }: IWhichList) => {
  const { data: showsListResponse, error } = useSWR(route, getter);

  if (!showsListResponse) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops, something went wrong...</div>;
  }

  const { shows } = showsListResponse;

  return (
    <Fragment>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {shows.map((show: IShow) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </SimpleGrid>
    </Fragment>
  );
};
