import API from "./api";

export const getCoursesForUser = async(userId) => {
    const res = await API.get(`/api/courses/user/${userId}`);
    return res.data;
};