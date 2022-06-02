import axios from "axios";

export const getComments = async (post_id: number, page: number) => {
  const formData = new FormData();

  formData.append("post_id", String(post_id));
  formData.append("page", String(page));

  return await axios.post(`http://127.0.0.1:8000/api/comments`, formData)
}

export const getCommentAnswers = async (comment_id: number, page: number) => {
  const formData = new FormData();

  formData.append("comment_id", String(comment_id));
  formData.append("page", String(page));

  return await axios.post(`http://127.0.0.1:8000/api/answers`, formData);
}

export const sendComment = async (answer_to: number, post_id: number, comment: string) => {
  const formData = new FormData();

  formData.append("answer_to", String(answer_to));
  formData.append("post_id", String(post_id));
  formData.append("comment", comment);

  return await axios.post(`http://127.0.0.1:8000/api/comment/add`, formData);
}