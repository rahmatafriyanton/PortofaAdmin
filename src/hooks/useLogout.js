import { useDispatch } from 'react-redux'
import axios from '../api/axios'

const useLogout = () => {
  const dispatch = useDispatch()
  const logout = async () => {
    await axios.delete('/auth/logout', {
      withCredentials: true,
    })

    dispatch({
      type: 'set_user',
      user: {
        email: null,
        name: null,
        token: null,
      },
    })
  }
  return logout
}

export default useLogout
