import React, { useState } from "react"

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange
  }
}

export default useInput