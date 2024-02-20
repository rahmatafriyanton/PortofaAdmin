import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'src/api/axios'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm(formData)
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('/auth/login', {
          email: formData.username,
          password: formData.password,
        })

        console.log('Login successful:', response.data)

        // Handle response as needed
        // Dispatch action to set user in Redux state
        dispatch({
          type: 'set_user',
          user: {
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            token: response.data.token,
          },
        })

        // Reset form fields after successful submission
        setFormData({ username: '', password: '' })

        navigate('/dashboard')
      } catch (error) {
        console.error('Login failed', error)
        // Handle error as needed
      }
    }
  }

  const validateForm = (data) => {
    const errors = {}
    if (!data.username.trim()) {
      errors.username = 'Username harus diisi'
    }
    if (!data.password.trim()) {
      errors.password = 'Password harus diisi'
    }
    return errors
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group">
              <div className="card p-4">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h1>Masuk</h1>
                    <p className="text-medium-emphasis">Masuk ke Akun</p>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        value={formData.username}
                        onChange={handleChange}
                        aria-label="Username"
                      />
                      <small className="text-danger">{errors.username}</small>
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                        aria-label="Password"
                      />
                      <small className="text-danger">{errors.password}</small>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4">
                          Masuk
                        </button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">
                          Lupa password?
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <div className="card-body text-center">
                  <div>
                    <h2>Daftar</h2>
                    <p>
                      Buat akun dan tingkatkan peluang karirmu! Kami hadir untuk membantu mengelola
                      informasi karirmu dengan mudah.
                    </p>
                    <Link to="/register" className="btn btn-primary mt-3">
                      Daftar Sekarang!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
