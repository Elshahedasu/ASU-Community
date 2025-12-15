import API from "./api";

export const getQuestionsByThread = async(threadId) => {
    const res = await API.get(`/api/questions/thread/${threadId}`);
    return res.data;
};