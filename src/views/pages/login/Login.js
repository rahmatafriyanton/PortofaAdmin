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

        alert('Login berhasil')

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
        alert('Proses login gagal. Periksa email & password anda!', error)
      }
    }
  }

  const validateForm = (data) => {
    const errors = {}
    if (!data.username.trim()) {
      errors.username = 'Email harus diisi!'
    }
    if (!data.password.trim()) {
      errors.password = 'Password harus diisi!'
    }
    return errors
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card card-login">
              <div className="card-header">
                <h3 className="card-title logo">Portofa.</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="title">Masuk ke Akun</div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="username"
                      placeholder="Email"
                      autoComplete="username"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      value={formData.username}
                      onChange={handleChange}
                      aria-label="Email"
                    />
                    <small className="text-danger">{errors.username}</small>
                  </div>
                  <div className="mb-3">
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

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      Masuk
                    </button>
                  </div>

                  <div className="register-intro">
                    Belum punya akun <b>portofa</b>? <br />
                    <Link to="/register"> Daftar sekarang!</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
