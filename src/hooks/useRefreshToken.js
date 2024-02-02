import { useDispatch } from 'react-redux'
import axios from '../api/axios'

const useRefreshToken = () => {
  const dispatch = useDispatch()
  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true,
    })
    console.log('Updated Token: ', response.data.token)
    dispatch({
      type: 'set_user',
      user: {
        ...axios,
        token: response.data.token,
      },
    })
    return response.data.token
  }
  return refresh
}

export default useRefreshToken
