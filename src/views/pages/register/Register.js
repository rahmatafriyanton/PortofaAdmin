import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'src/api/axios'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

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
        console.log(formData)
        const response = await axios.post('/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })

        console.log('Pendaftaran berhasil:', response.data)
        // Handle response as needed

        // Redirect to login page after successful registration
        navigate('/login')
      } catch (error) {
        console.error('Pendaftaran gagal', error)
        // Handle error as needed
      }
    }
  }

  const validateForm = (data) => {
    const errors = {}
    if (!data.username.trim()) {
      errors.username = 'Nama harus diisi'
    }
    if (!data.email.trim()) {
      errors.email = 'Email harus diisi'
    }
    if (!data.password.trim()) {
      errors.password = 'Password harus diisi'
    }
    if (data.password !== data.repeatPassword) {
      errors.repeatPassword = 'Password tidak cocok'
    }
    return errors
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-7 col-xl-6">
            <div className="card mx-4">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <h1>Daftar Akun</h1>
                  <p className="text-medium-emphasis">Buat akun baru</p>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="username"
                      placeholder="Nama Lengkap"
                      autoComplete="username"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <small className="text-danger">{errors.username}</small>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <small className="text-danger">{errors.email}</small>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Kata Sandi"
                      autoComplete="new-password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <small className="text-danger">{errors.password}</small>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="repeatPassword"
                      placeholder="Ulangi Kata Sandi"
                      autoComplete="new-password"
                      className={`form-control ${errors.repeatPassword ? 'is-invalid' : ''}`}
                      value={formData.repeatPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <small className="text-danger">{errors.repeatPassword}</small>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                      Buat Akun
                    </button>
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

export default Register
