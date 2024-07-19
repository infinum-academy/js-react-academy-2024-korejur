"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { swrKeys } from "../../../fetchers/swrKeys";
import { authenticatedFetcher } from "@/fetchers/fetcher";

interface IAuthRedirectProps {
  to: string;
  condition: "loggedIn" | "loggedOut";
}

export const AuthRedirect = ({ to, condition }: IAuthRedirectProps) => {
  const router = useRouter();
  const { data, isLoading } = useSWR(swrKeys.user, authenticatedFetcher);

  useEffect(() => {
    if (isLoading) return;

    if (condition === "loggedOut" && !data) {
      router.push(to);
    } else if (condition === "loggedIn" && data) {
      router.push(to);
    }
  }, [data, isLoading, condition, to, router]);

  return null;
};
