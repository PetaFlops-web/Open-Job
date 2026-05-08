import {
  addNewBookmark,
  countBookmarksById,
  deleteBookmarkById,
  getBookmarkById,
} from "./bookmarks.service.js";
import response from "../utils/response.js";
import CacheService from "../cache/redis.service.js";

const addNewBookmarkHandler = async (req, res) => {
  try {
    const { jobId: job_id } = req.params;
    const user = req.user;
    const newBookmark = await addNewBookmark(job_id, user.id, user);

    const cache = new CacheService();
    await cache.delete(`profile-bookmarks-${user.id}`);
    await cache.delete(`bookmarks-count-${user.id}`);

    return response(res, 201, "Bookmark berhasil ditambahkan", {
      id: newBookmark,
    });
  } catch (error) {
    if (error.name === "InvariantError")
      return response(res, 400, error.message, null);
    return response(res, 500, error.message, null);
  }
};

const getCountBookmarkHandler = async (req, res) => {
  try {
    const user = req.user;

    const cache = new CacheService();
    const cachedCount = await cache.get(`bookmarks-count-${user.id}`);

    if (cachedCount) {
      res.header("X-Data-Source", "cache");
      return response(res, 200, "Count bookmark berhasil ditemukan", {
        bookmarks: JSON.parse(cachedCount),
      });
    }

    const bookmarks = await countBookmarksById(user.id, user);
    await cache.set(`bookmarks-count-${user.id}`, JSON.stringify(bookmarks));
    res.header("X-Data-Source", "database");
    return response(res, 200, "Count bookmark berhasil ditemukan", {
      bookmarks,
    });
  } catch (error) {
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    return response(res, 500, error.message, null);
  }
};

const getBookmarkByIdHandler = async (req, res) => {
  try {
    const { bookmarkId: id } = req.params;
    const user = req.user;

    const cache = new CacheService();
    const cachedBookmark = await cache.get(`bookmark-${id}`);

    if (cachedBookmark) {
      res.header("X-Data-Source", "cache");
      return response(res, 200, "Bookmark berhasil ditemukan", JSON.parse(cachedBookmark));
    }

    const bookmark = await getBookmarkById(id, user);
    await cache.set(`bookmark-${id}`, JSON.stringify(bookmark));
    res.header("X-Data-Source", "database");
    return response(res, 200, "Bookmark berhasil ditemukan", bookmark);
  } catch (error) {
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    if (error.name === "AuthError")
      return response(res, 401, error.message, null);
    return response(res, 500, error.message, null);
  }
};

const deleteBookmarkHandler = async (req, res) => {
  try {
    const { jobId: id } = req.params;
    const user = req.user;
    const bookmark = await deleteBookmarkById(id, user);

    const cache = new CacheService();
    await cache.delete(`bookmark-${id}`);
    await cache.delete(`profile-bookmarks-${user.id}`);
    await cache.delete(`bookmarks-count-${user.id}`);

    return response(res, 200, "Bookmark berhasil dihapus", { id: bookmark });
  } catch (error) {
    if (error.name === "NotFoundError")
      return response(res, 404, error.message, null);
    if (error.name === "AuthError")
      return response(res, 401, error.message, null);
    return response(res, 500, error.message, null);
  }
};

export {
  addNewBookmarkHandler,
  getCountBookmarkHandler,
  getBookmarkByIdHandler,
  deleteBookmarkHandler,
};
