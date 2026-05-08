import { getProfileUserById, getProfileUserApplications, getProfileUserBookmarkedJobs   } from "./profile.service.js";
import response from "../utils/response.js";
import CacheService from "../cache/redis.service.js";

const getProfileUserByIdHandler = async (req, res) => {
    try {
        const userId = req.user.id;

        const cache = new CacheService();
        const cachedProfile = await cache.get(`profile-${userId}`);

        if (cachedProfile) {
            res.header("X-Data-Source", "cache");
            return response(res, 200, "Profile berhasil ditemukan", JSON.parse(cachedProfile));
        }

        const user = await getProfileUserById(userId);
        await cache.set(`profile-${userId}`, JSON.stringify(user));
        res.header("X-Data-Source", "database");
        return response(res, 200, "Profile berhasil ditemukan", user);
    } catch (err) {
        if(err.name === "NotFoundError") return response(res, 404, err.message, null);
        return response(res, 500, err.message, null);
    }
}

const getProfileUserApplicationsHandler = async (req, res) => {
    try {
        const userId = req.user.id;

        const cache = new CacheService();
        const cachedApplications = await cache.get(`profile-applications-${userId}`);

        if (cachedApplications) {
            res.header("X-Data-Source", "cache");
            return response(res, 200, "Applications berhasil ditemukan", {
                applications: JSON.parse(cachedApplications)
            });
        }

        const applications = await getProfileUserApplications(userId);
        await cache.set(`profile-applications-${userId}`, JSON.stringify(applications));
        res.header("X-Data-Source", "database");
        return response(res, 200, "Applications berhasil ditemukan", {
            applications: applications
        });
    } catch (err) {
        if(err.name === "NotFoundError") return response(res, 404, err.message, null);
        return response(res, 500, err.message, null);
    }
}

const getProfileUserBookmarkedJobsHandler = async (req, res) => {
    try {
        const userId = req.user.id;

        const cache = new CacheService();
        const cachedBookmarks = await cache.get(`profile-bookmarks-${userId}`);

        if (cachedBookmarks) {
            res.header("X-Data-Source", "cache");
            return response(res, 200, "Bookmarked jobs berhasil ditemukan", {
                bookmarks: JSON.parse(cachedBookmarks)
            });
        }

        const bookmarkedJobs = await getProfileUserBookmarkedJobs(userId);
        await cache.set(`profile-bookmarks-${userId}`, JSON.stringify(bookmarkedJobs));
        res.header("X-Data-Source", "database");
        return response(res, 200, "Bookmarked jobs berhasil ditemukan", {
            bookmarks: bookmarkedJobs
        });
    } catch (err) {
        if(err.name === "NotFoundError") return response(res, 404, err.message, null);
        return response(res, 500, err.message, null);
    }
}

export {
    getProfileUserByIdHandler,
    getProfileUserApplicationsHandler,
    getProfileUserBookmarkedJobsHandler,
}