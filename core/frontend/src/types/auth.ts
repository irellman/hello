export interface user {
  id: number,
  username: string,
  name: string,
  email: string,
  about: string,
  avatar: string,
  posts_count: number,
  followers: number,
  likes: number,
  website: string,
  subscribe: boolean
}

export interface userState {
  user: user,
  isAuth: boolean | null
}

export interface userActions {
  type: string,
  payload?: any
}
