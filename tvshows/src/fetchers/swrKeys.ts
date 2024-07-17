const apiUrl = 'https://tv-shows.infinum.academy';
export const swrKeys = {
  register: `${apiUrl}/users`,
  sign_in: `${apiUrl}/users/sign_in`,
  user: `${apiUrl}/users/me`,
  show: (id: number) => `${apiUrl}/shows/${id}`,
  shows: `${apiUrl}/shows`,
  top_rated: `${apiUrl}/shows/top_rated`,
  review:(id: number) => `${apiUrl}/reviews/${id}`,
  create_review: `${apiUrl}/reviews`,
  reviews: (show_id: number) => `${apiUrl}/shows/${show_id}/reviews`
};
