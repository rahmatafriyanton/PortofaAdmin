import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'src/api/axios'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
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

        // console.log('Pendaftaran berhasil:', response.data)

        alert(`Akun dengan email ${response.data.email} berhasil dibuat!`)

        // Redirect to login page after successful registration
        navigate('/login')
      } catch (error) {
        const message = error.response.data.message
        console.error('Pendaftaran gagal')
        if (message) {
          alert(message)
        } else {
          alert('Terjadi kesalahan, harap mencoba beberapa saat lagi!')
        }
      }
    }
  }

  const validateForm = (data) => {
    const errors = {}
    if (!data.username.trim()) {
      errors.username = 'Username harus diisi'
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
          <div className="col-md-5">
            <div className="card card-login">
              <div className="card-header">
                <h3 className="card-title logo">Portofa.</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="title">Daftar Akun</div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      autoComplete="username"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <small className="text-danger">{errors.username}</small>
                  </div>

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
                    <small className="text-danger">{errors.email}</small>
                  </div>

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
                    <small className="text-danger">{errors.password}</small>
                  </div>

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
                    <small className="text-danger">{errors.repeatPassword}</small>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      Daftar
                    </button>
                  </div>

                  <div className="register-intro">
                    Sudah punya akun <b>portofa</b>? <br />
                    <Link to="/login"> Masuk!</Link>
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
