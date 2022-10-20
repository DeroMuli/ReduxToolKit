import { createSlice } from "@reduxjs/toolkit"

interface UserData {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as UserData[],
    loading: false
  },
  reducers: {}
})

export default usersSlice.reducer