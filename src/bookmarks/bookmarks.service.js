import bookmarksRepository from "./bookmarks.repository.js";
import {
  AuthError,
  NotFoundError,
  InvariantError,
} from "../exceptions/index.js";
const addNewBookmark = async (job_id, user_id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const id = await bookmarksRepository.addNewBookmark({ job_id, user_id });
  return id;
};

const countBookmarksById = async (user_id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await bookmarksRepository.countBookmarksById(user_id);
  return result;
};

const getBookmarkById = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await bookmarksRepository.getBookmarkById(id);
  if (!result) throw new NotFoundError("Bookmark tidak ditemukan.");
  return result;
};

const deleteBookmarkById = async (id, user) => {
  if (!user) throw new AuthError("invalid credentials");
  const result = await bookmarksRepository.deleteBookmarkById(id);
  return result;
};
export {
  addNewBookmark,
  countBookmarksById,
  getBookmarkById,
  deleteBookmarkById,
};
