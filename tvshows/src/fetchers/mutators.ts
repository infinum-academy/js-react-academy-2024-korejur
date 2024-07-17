import { IReview, IReviewList } from "@/typings/review.types";
import { fetcher } from "./fetcher";

export async function mutator(url: string, { arg }: { arg: any }) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error mutating data on ${url}`);
  }

  let responseData;
  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }
  if (url.includes("sign_in")) {
    const client = response.headers.get("client");
    const accessToken = response.headers.get("access-token");
    const uid = response.headers.get("uid");

    if (client && accessToken && uid) {
      localStorage.setItem("client", client);
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("uid", uid);
    }
  }

  return responseData;
}


export function deleteReview(url: string) {
	return fetcher(`${url}`, {
		method: 'DELETE',
	});
}

export function createReview(url: string, { arg }: { arg: IReview }) {
	return fetcher(url, {
		method: 'POST',
		body: JSON.stringify(arg),
	});
}
