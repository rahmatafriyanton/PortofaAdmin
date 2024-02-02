import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux' // Import the useSelector hook
import useRefreshToken from 'src/hooks/useRefreshToken'

const ProtectedLayout = ({ children }) => {
  const auth = useSelector((state) => state.auth)
  const refresh = useRefreshToken()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verify_refresh_token = async () => {
      try {
        await refresh()
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.token ? verify_refresh_token() : setIsLoading(false)
  }, [auth?.token, refresh])

  if (!auth?.token && !isLoading) {
    return <Navigate to="/login" />
  } else {
    return children
  }
}

// PropTypes validation
ProtectedLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedLayout
