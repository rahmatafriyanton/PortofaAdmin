import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'
import ReactQuill from 'react-quill' // Import library ReactQuill
import 'react-quill/dist/quill.snow.css' // Import style untuk Quill

const AddOrganizations = () => {
  const navigate = useNavigate()
  const axios_private = useAxiosPrivate()

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    location: '',
    description: '',
    period_start: null,
    period_end: null,
    achievements: '',
    is_current: false,
  })

  const [errors, setErrors] = useState({
    name: '',
    position: '',
    location: '',
    period_start: '',
    period_end: '',
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
      newErrors.name = 'Nama Organisasi harus diisi'
      isValid = false
    }

    // Validasi Jabatan
    if (!formData.position.trim()) {
      newErrors.position = 'Jabatan harus diisi'
      isValid = false
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi harus diisi'
      isValid = false
    }

    // Validasi Tahun Mulai
    if (!formData.period_start) {
      newErrors.period_start = 'Tahun Mulai harus diisi'
      isValid = false
    }

    // Validasi Tahun Berakhir jika tidak sedang berjalan
    if (!formData.is_current && !formData.period_end) {
      newErrors.period_end = 'Tahun Berakhir harus diisi'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const response = await axios_private.post('/experience/organizations', {
          name: formData.name,
          position: formData.position,
          location: formData.location,
          description: formData.description,
          period_start: formData.period_start,
          period_end: formData.is_current ? null : formData.period_end,
          achievements: formData.achievements,
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

        navigate('/experience/organization')
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
              <h3 className="title">Tambah Pengalaman Organisasi</h3>
              <p className="sub-title">Isi formulir untuk menambah pengalaman organisasi Anda</p>
            </div>
            <div className="action-container">
              <button
                className="btn btn-secondary btn-back btn-sm"
                onClick={() => navigate('/experience/organization')}
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
                      Organisasi/Nama Acara
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
                    <label htmlFor="position" className="form-label">
                      Posisi/Gelar Jabatan
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.position ? 'is-invalid' : ''}`}
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={(e) => handleChange('position', e.target.value)}
                      required
                    />
                    {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="position" className="form-label">
                      Aktivitas/Acara/Lokasi Organisasi (Kota/Negara)
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      required
                    />
                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="position" className="form-label">
                      Deskripsi Organisasi (opsional)
                    </label>
                    <textarea
                      type="text"
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="period_start" className="form-label">
                      Tahun Mulai
                    </label>
                    <DatePicker
                      selected={formData.period_start}
                      onChange={(date) => handleChange('period_start', date)}
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      className={`form-control ${errors.period_start ? 'is-invalid' : ''}`}
                      id="period_start"
                      name="period_start"
                      required
                    />
                    {errors.period_start && (
                      <div className="invalid-feedback">{errors.period_start}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2">
                    <label htmlFor="period_end" className="form-label">
                      Tahun Berakhir
                    </label>
                    <DatePicker
                      selected={formData.period_end}
                      onChange={(date) => handleChange('period_end', date)}
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      className={`form-control ${errors.period_end ? 'is-invalid' : ''}`}
                      id="period_end"
                      name="period_end"
                      disabled={formData.is_current}
                      required={!formData.is_current}
                    />
                    {errors.period_end && (
                      <div className="invalid-feedback">{errors.period_end}</div>
                    )}
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_current"
                      name="is_current"
                      checked={formData.is_current}
                      onChange={(e) => handleCheckboxChange('is_current', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="is_current">
                      Saat ini saya aktif di sini
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="achievements" className="form-label">
                      Deskripsi Pekerjaan
                    </label>

                    <ReactQuill
                      value={formData.achievements}
                      onChange={(value) => handleChange('achievements', value)}
                      modules={{
                        toolbar: [[{ list: 'bullet' }]],
                      }}
                    />
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

export default AddOrganizations
