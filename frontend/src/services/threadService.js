import API from "./api";

export const getThreadsByCourse = async(courseId) => {
    const res = await API.get(`/api/threads/course/${courseId}`);
    return res.data;
};