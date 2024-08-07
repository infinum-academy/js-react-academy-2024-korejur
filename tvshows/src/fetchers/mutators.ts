import { IReview } from "@/typings/review.types";
import { fetcher } from "./fetcher";
import { IUser } from "@/typings/user.types";

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
    method: "DELETE",
  });
}

export function createReview(url: string, { arg }: { arg: IReview }) {
  return fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

export function updateReview(url: string, { arg }: { arg: IReview }) {
  return fetcher(url, {
    method: "PATCH",
    body: JSON.stringify(arg),
  });
}

export function uploadProfilePhoto(url: string, { arg }: { arg: IUser }) {
  const formData = new FormData();
  if (arg.image_url) {
    formData.append("image", arg.image_url);
  }

  console.log(arg)

  return fetcher(url, {
    method: "PUT",
    body: formData,
  });
}
