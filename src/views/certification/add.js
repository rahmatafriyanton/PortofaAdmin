import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'
import ReactQuill from 'react-quill' // Import library ReactQuill
import 'react-quill/dist/quill.snow.css' // Import style untuk Quill
import { QuillToolbar, modules, formats } from 'src/components/QuillToolbar'

const Add = () => {
  const navigate = useNavigate()
  const axios_private = useAxiosPrivate()

  const [formData, setFormData] = useState({
    name: '',
    issuing_authority: '',
    year_obtained: '',
    link: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    issuing_authority: '',
    year_obtained: '',
    link: '',
  })

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

    // Validasi Nama Organisasi
    if (!formData.name.trim()) {
      newErrors.name = 'Nama Sertifikasi harus diisi'
      isValid = false
    }

    // Validasi Jabatan
    if (!formData.issuing_authority.trim()) {
      newErrors.issuing_authority = 'Instansi harus diisi'
      isValid = false
    }

    if (!formData.year_obtained.trim()) {
      newErrors.year_obtained = 'Tahun harus diisi'
      isValid = false
    }

    if (!formData.link.trim()) {
      newErrors.link = 'Link harus diisi'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSave = async () => {
    if (validateForm()) {
      try {
        await axios_private.post('/certifications', {
          name: formData.name,
          issuing_authority: formData.issuing_authority,
          year_obtained: formData.year_obtained,
          link: formData.link,
        })

        toast.success('Data saved successfully', {
          type: 'top-right',
          autoClose: 3000, // Waktu tampilan Toast dalam milidetik
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        navigate('/certifications')
      } catch (error) {
        console.error('Error saving data:', error)
        toast.error('Error saving data. Please try again.', {
          type: 'top-center',
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
              <h3 className="title">Tambah Sertifikasi</h3>
              <p className="sub-title">Isi formulir untuk menambah sertifikasi Anda</p>
            </div>
            <div className="action-container">
              <button
                className="btn btn-secondary btn-back btn-sm"
                onClick={() => navigate('/certifications')}
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
                    <label htmlFor="name" className="form-label">
                      Nama Sertifikasi
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="type" className="form-label">
                      Instansi
                    </label>

                    <input
                      type="text"
                      className={`form-control ${errors.issuing_authority ? 'is-invalid' : ''}`}
                      id="issuing_authority"
                      name="issuing_authority"
                      value={formData.issuing_authority}
                      onChange={(e) => handleChange('issuing_authority', e.target.value)}
                      required
                    />

                    {errors.issuing_authority && (
                      <div className="invalid-feedback">{errors.issuing_authority}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="year_obtained" className="form-label">
                      Tahun
                    </label>

                    <input
                      type="text"
                      className={`form-control ${errors.year_obtained ? 'is-invalid' : ''}`}
                      id="year_obtained"
                      name="year_obtained"
                      value={formData.year_obtained}
                      onChange={(e) => handleChange('year_obtained', e.target.value)}
                      required
                    />

                    {errors.year_obtained && (
                      <div className="invalid-feedback">{errors.year_obtained}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="link" className="form-label">
                      Link
                    </label>

                    <input
                      type="text"
                      className={`form-control ${errors.link ? 'is-invalid' : ''}`}
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={(e) => handleChange('link', e.target.value)}
                      required
                    />

                    {errors.link && <div className="invalid-feedback">{errors.link}</div>}
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

export default Add
