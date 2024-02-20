import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'
import ReactQuill from 'react-quill' // Import library ReactQuill
import 'react-quill/dist/quill.snow.css' // Import style untuk Quill

const Add = () => {
  const navigate = useNavigate()
  const axios_private = useAxiosPrivate()

  const [formData, setFormData] = useState({
    name: '',
    type: 'soft',
  })

  const [errors, setErrors] = useState({
    name: '',
    type: '',
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

  const handleCheckboxChange = (name, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
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
      newErrors.name = 'Nama Keterampilan harus diisi'
      isValid = false
    }

    // Validasi Jabatan
    if (!formData.type.trim()) {
      newErrors.type = 'Tipe harus diisi'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSave = async () => {
    if (validateForm()) {
      try {
        await axios_private.post('/skills', {
          name: formData.name,
          type: formData.type,
        })

        // Menampilkan Toast sukses
        toast.success('Data saved successfully', {
          type: 'top-right',
          autoClose: 3000, // Waktu tampilan Toast dalam milidetik
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        // TODO: Handle success, misalnya, redirect ke halaman daftar pekerjaan
        navigate('/skills')
      } catch (error) {
        console.error('Error saving data:', error)
        // Menampilkan Toast kesalahan
        toast.error('Error saving data. Please try again.', {
          type: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        // TODO: Handle error, misalnya, menampilkan pesan kesalahan
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
              <h3 className="title">Tambah Keterampilan</h3>
              <p className="sub-title">Isi formulir untuk menambah keterampilan Anda</p>
            </div>
            <div className="action-container">
              <button
                className="btn btn-secondary btn-back btn-sm"
                onClick={() => navigate('/skills')}
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
                      Nama Keterampilan
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
                      Tipe Keterampilan
                    </label>

                    <select
                      className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                      id="type"
                      name="type"
                      onChange={(e) => handleChange('type', e.target.value)}
                      required
                    >
                      <option value={'soft'} selected={formData.type === 'soft'}>
                        Soft Skill
                      </option>
                      <option value={'hard'} selected={formData.type === 'hard'}>
                        Hard Skill
                      </option>
                    </select>

                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
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
