import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLogout from 'src/hooks/useLogout'

const Register = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  useEffect(() => {
    const performLogout = async () => {
      await logout()
      navigate('/login')
    }

    performLogout()
  }, [logout, navigate])

  return null // Jika tidak ada elemen yang ingin ditampilkan, return null.
}

export default Register
