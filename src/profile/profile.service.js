import ProfileRepository from "./profile.repository.js";
import {
  NotFoundError,
  AuthError,
} from "../exceptions/index.js";

const getProfileUserById = async (userId) => {

    const user = await ProfileRepository.getProfileByUserId(userId); 

    if(!user) {
        throw new NotFoundError("User not found"); 
    }

    return user;
}

const getProfileUserApplications = async (userId) => {

    if(!userId) {
        throw new AuthError("Anda harus login terlebih dahulu"); 
    }

    const applications = await ProfileRepository.getProfileUserApplications(userId); 

    if(!applications) {
        throw new NotFoundError("Applications not found"); 
    }

    return applications;
}

const getProfileUserBookmarkedJobs = async (userId) => {

    if(!userId) {
        throw new AuthError("Anda harus login terlebih dahulu"); 
    }

    const bookmarkedJobs = await ProfileRepository.getProfileBookmarkedJobs(userId); 

    if(!bookmarkedJobs) {
        throw new NotFoundError("Bookmarked jobs not found"); 
    }

    return bookmarkedJobs;
}


export {
    getProfileUserById,
    getProfileUserApplications,
    getProfileUserBookmarkedJobs,
}
