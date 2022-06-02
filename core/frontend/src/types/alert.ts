export interface alert {
  isShow: boolean,
  type: string,
  text: string
}

export interface alertActions {
  type: string,
  payload?: any
}
