import API from "./api";

export const getRepliesByQuestion = async (questionId) => {
  const res = await API.get(`/api/replies/question/${questionId}`);
  return res.data;
};
