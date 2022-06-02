import axios from 'axios'

export const getAuthUser = async () => {
  return await axios.post('http://127.0.0.1:8000/user/auth');
}

export const login = async (email: string, password: string) => {
  const userData = new FormData()
  userData.append('email', email)
  userData.append('password', password)

  return await axios.post('http://127.0.0.1:8000/user/login', userData)
}

export const logoutUser = async () => {
  await axios.post('http://127.0.0.1:8000/user/logout');
  localStorage.removeItem("user");
}

export const signup = async (username: string, email: string, password: string, passwordConfirmation: string) => {
  const userData = new FormData()
  userData.append('username', username)
  userData.append('email', email)
  userData.append('password', password)
  userData.append('passwordConfirmation', passwordConfirmation)

  return await axios.post('http://127.0.0.1:8000/user/signup', userData)
}

export const getPopularUsers = async () => {
  return await axios.post('http://127.0.0.1:8000/user/popular')
}

export const getInfoAboutUser = async (username: string) => {
  return await axios.post(`http://127.0.0.1:8000/user/${username}`)
}

export const getUserPosts = async (username: string, page: number) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("page", String(page));

  return await axios.post(`http://127.0.0.1:8000/user/posts`, formData)
}
