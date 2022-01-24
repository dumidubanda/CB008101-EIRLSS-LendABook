const API_BASE_URL = 'http://localhost:2200/';
export const BOOKS_APIS: any = {
  url : API_BASE_URL + 'books/',
  book : API_BASE_URL + 'books/book/',
  search : API_BASE_URL + 'books/search/',
  categories : API_BASE_URL + 'book/categories/',
  categoriesDelete : API_BASE_URL + 'book/categories/category/',
};
export const VIDEOS_APIS: any = {
  url : API_BASE_URL + 'videos/',
  video : API_BASE_URL + 'videos/video/',
  search : API_BASE_URL + 'videos/search/',
  categories : API_BASE_URL + 'video/categories/',
  categoriesDelete : API_BASE_URL + 'video/categories/category/',
};
export const AUTH_APIS: any = {
  login : API_BASE_URL + 'users/login/',
  register : API_BASE_URL + 'users/',
  profile : API_BASE_URL + 'users/',
};
export const PLANS_APIS: any = {
  url : API_BASE_URL + 'plans/'
};
export const RESERVATIONS_APIS: any = {
  books : API_BASE_URL + 'book/reservations/',
  booksDelete : API_BASE_URL + 'book/reservations/reservation/',
  userBooks : API_BASE_URL + 'book/reservations/user/',
  videos : API_BASE_URL + 'video/reservations/',
  videosDelete : API_BASE_URL + 'video/reservations/reservation/',
  userVideos : API_BASE_URL + 'video/reservations/user/',
};
export const COMMENTS_APIS: any = {
  book : API_BASE_URL + 'book/comments/',
  video : API_BASE_URL + 'video/comments/',
};
