import axios from 'axios';

export const searchUsersOrTags = async (query: string) => {
  const formData = new FormData();

  formData.append("query", query);

  return await axios.post("http://127.0.0.1:8000/api/search", formData)
}