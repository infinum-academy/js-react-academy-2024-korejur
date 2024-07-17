export async function fetcher<T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<T> {
  let data;
  try {
    const authHeaders = getAuthHeaders();
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...init?.headers,
      },
    });
    const isNoContent = response.status === 204;

    if (!isNoContent) {
      data = response.json();
    }

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Response status: ${error}`);
  }

  return data;
}

export function getAuthHeaders() {
  const client = localStorage.getItem("client");
  const accessToken = localStorage.getItem("access-token");
  const uid = localStorage.getItem("uid");

  return {
    client: client || "",
    "access-token": accessToken || "",
    uid: uid || "",
  };
}

export async function authenticatedFetcher<T>(url: string): Promise<T | null> {
  const authHeaders = getAuthHeaders();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
    },
  });

  if (!response.ok) {
    return null;
    // throw new Error(`Error fetching data from ${url}`);
  }

  return await response.json();
}
