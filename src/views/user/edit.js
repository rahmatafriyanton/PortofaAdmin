import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'
import ReactQuill from 'react-quill' // Import library ReactQuill
import 'react-quill/dist/quill.snow.css' // Import style untuk Quill
import { useSelector } from 'react-redux'
import { cifKg } from '@coreui/icons'

const EditJobs = () => {
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)

  const axios_private = useAxiosPrivate()

  const [formData, setFormData] = useState({
    full_name: '',
    nick_name: '',
    phone_number: '',
    email: '',
    linkedin: '',
    website: '',
    github: '',
    address: '',
    summary: '',
  })
  const [errors, setErrors] = useState({
    full_name: '',
    nick_name: '',
    phone_number: '',
    email: '',
    linkedin: '',
    website: '',
    github: '',
    address: '',
    summary: '',
  })

  const fetchDetail = async () => {
    try {
      const response = await axios_private.get(`/users/${auth.id}`)
      const data = response.data

      // Assign response data to formData
      setFormData({
        full_name: data.full_name,
        nick_name: data.nick_name,
        phone_number: data.phone_number,
        email: data.email,
        linkedin: data.linkedin,
        website: data.website,
        github: data.github,
        address: data.address,
        summary: data.summary,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (auth && auth.id) {
      fetchDetail()
    }
  }, [auth.id])

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Menghapus pesan kesalahan saat nilai field diubah
    }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    // Validasi Full Name
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full Name harus diisi'
      isValid = false
    }

    // Validasi Nick Name
    if (!formData.nick_name.trim()) {
      newErrors.nick_name = 'Nick Name harus diisi'
      isValid = false
    }

    // Validasi Phone Number
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone Number harus diisi'
      isValid = false
    }

    // Validasi Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Format Email tidak valid'
      isValid = false
    }

    // Validasi LinkedIn
    if (!formData.linkedin.trim()) {
      newErrors.linkedin = 'LinkedIn harus diisi'
      isValid = false
    }

    // Validasi Website
    if (!formData.website.trim()) {
      newErrors.website = 'Website harus diisi'
      isValid = false
    }

    // Validasi GitHub
    if (!formData.github.trim()) {
      newErrors.github = 'GitHub harus diisi'
      isValid = false
    }

    // Validasi Alamat
    if (!formData.address.trim()) {
      newErrors.address = 'Alamat harus diisi'
      isValid = false
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Alamat harus diisi'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSave = async () => {
    if (validateForm()) {
      try {
        await axios_private.put(`/users`, {
          ...formData,
        })

        toast.success('Data saved successfully', {
          position: 'top-right',
          autoClose: 3000, // Waktu tampilan Toast dalam milidetik
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        navigate('/users/edit')
      } catch (error) {
        console.error('Error saving data:', error)

        toast.error('Error saving data. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } else {
      console.log('Form tidak valid. Mohon isi semua field yang diperlukan.')
    }
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="card card-data mb-4">
          <div className="card-header">
            <div>
              <h3 className="title">Edit Informasi Personal</h3>
              <p className="sub-title">Isi formulir untuk mengubah Informasi Personal Anda</p>
            </div>
            <div className="action-container">
              <button
                className="btn btn-secondary btn-back btn-sm"
                onClick={() => navigate('/users/edit')}
              >
                <i className="fa fa-chevron-left"></i> Kembali
              </button>
            </div>
          </div>
          <div className="card-body">
            {/* Form Tambah pekerjaan */}
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="full_name" className="form-label">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleChange('full_name', e.target.value)}
                      required
                    />
                    {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="nick_name" className="form-label">
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nick_name ? 'is-invalid' : ''}`}
                      id="nick_name"
                      name="nick_name"
                      value={formData.nick_name}
                      onChange={(e) => handleChange('nick_name', e.target.value)}
                      required
                    />
                    {errors.nick_name && <div className="invalid-feedback">{errors.nick_name}</div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="phone_number" className="form-label">
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={(e) => handleChange('phone_number', e.target.value)}
                      required
                    />
                    {errors.phone_number && (
                      <div className="invalid-feedback">{errors.phone_number}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="linkedin" className="form-label">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.linkedin ? 'is-invalid' : ''}`}
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleChange('linkedin', e.target.value)}
                      required
                    />
                    {errors.linkedin && <div className="invalid-feedback">{errors.linkedin}</div>}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="github" className="form-label">
                      GitHub
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.github ? 'is-invalid' : ''}`}
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={(e) => handleChange('github', e.target.value)}
                      required
                    />
                    {errors.github && <div className="invalid-feedback">{errors.github}</div>}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="website" className="form-label">
                      Website
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      required
                    />
                    {errors.website && <div className="invalid-feedback">{errors.website}</div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="address" className="form-label">
                      Alamat
                    </label>
                    <textarea
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      id="address"
                      name="address"
                      value={formData.address} // Use value prop instead of setting children
                      onChange={(e) => handleChange('address', e.target.value)}
                      required
                    />

                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="summary" className="form-label">
                      Ringkasan Profil
                    </label>
                    <ReactQuill
                      value={formData.summary}
                      onChange={(value) => handleChange('summary', value)}
                    />

                    {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditJobs
