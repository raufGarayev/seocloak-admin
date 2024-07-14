import { axiosInstance } from '../api'

export const loginUser = async ({
  username,
  password
}: {
  username: string
  password: string
}) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
        username,
        password
      })
      return response
  } catch (error) {
    throw error
  }
}
