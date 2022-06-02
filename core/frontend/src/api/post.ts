import axios from 'axios'

export const likePost = async (id: number) => {
  return await axios.post(`http://127.0.0.1:8000/api/post/${id}/like`)
}

export const dislikePost = async (id: number) => {
  return await axios.post(`http://127.0.0.1:8000/api/post/${id}/dislike`)
}

export const savePost = async (id: number) => {
  return await axios.post(`http://127.0.0.1:8000/api/post/${id}/save`)
}

export const getPostById = async (id: number) => {
  return await axios.post(`http://127.0.0.1:8000/api/post/${id}`)
}

export const addToSaved = async (id: number) => {
  return await axios.post(`http://127.0.0.1:8000/api/post/${id}/saved/add`)
}

export const deleteFromSaved = async (id: number) => {
  return await axios.post(`http://127.0.0.1:8000/api/post/${id}/saved/delete`)
}