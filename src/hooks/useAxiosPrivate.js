// useAxiosPrivate.js
import axios from 'src/api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import { useSelector, useDispatch } from 'react-redux'

const useAxiosPrivate = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const refresh = useRefreshToken()

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          try {
            const newAccessToken = await refresh()
            // Update token in Redux state using the 'setUser' action
            dispatch({
              type: 'set_user',
              user: {
                ...auth,
                token: newAccessToken,
              },
            })
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axios(prevRequest)
          } catch (refreshError) {
            // Handle error refreshing token if needed
            console.error('Error refreshing token:', refreshError)
            return Promise.reject(error)
          }
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axios.interceptors.request.eject(requestIntercept)
      axios.interceptors.response.eject(responseIntercept)
    }
  }, [auth, dispatch, refresh])

  return axios
}

export default useAxiosPrivate
