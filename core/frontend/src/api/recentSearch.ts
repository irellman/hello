import axios from 'axios';

export const FetchToUpdateRecentSearches = async (query: string) => {
  const formData = new FormData();
  formData.append("query", query)
  await axios.post(`http://127.0.0.1:8000/api/recent_searches/update`, formData);
}

export const FetchToDeleteRecentSearch = async (query: string) => {
  const formData = new FormData();
  formData.append("query", query)
  await axios.post(`http://127.0.0.1:8000/api/recent_searches/delete`, formData);
}

export const FetchToAddRecentSearch = async (query: string) => {
  const formData = new FormData();
  formData.append("query", query)
  await axios.post(`http://127.0.0.1:8000/api/recent_searches/add`, formData);
}

export const FetchToClearRecentSearch = async () => {
  await axios.post(`http://127.0.0.1:8000/api/recent_searches/clear`);
}
