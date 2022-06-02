export interface user {
  id: number,
  username: string,
  name: string,
  description: string,
  avatar: string,
  posts: number,
  followers: number,
  likes: number,
  website: string
}

export interface userState {
  user: user | null
}

export interface userActions {
  type: string,
  payload?: any
}
