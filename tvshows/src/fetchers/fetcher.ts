export async function fetcher<T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<T> {
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
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Response status: ${error}`);
  }
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

export async function authenticatedFetcher<T>(url: string): Promise<T> {
  const authHeaders = getAuthHeaders();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data from ${url}`);
  }

  return await response.json();
}
