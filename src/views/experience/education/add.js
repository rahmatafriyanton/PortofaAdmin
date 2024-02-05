import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AddEducations = () => {
  const navigate = useNavigate()
  const axios_private = useAxiosPrivate()

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    major: '',
    period_start: null,
    period_end: null,
    is_current: false,
  })

  const [errors, setErrors] = useState({
    institution: '',
    degree: '',
    major: '',
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
      [name]: '',
    }))
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!formData.institution.trim()) {
      newErrors.institution = 'Nama Institusi harus diisi'
      isValid = false
    }

    if (!formData.degree.trim()) {
      newErrors.degree = 'Tingkat harus diisi'
      isValid = false
    }

    if (!formData.period_start) {
      newErrors.period_start = 'Tahun Mulai harus diisi'
      isValid = false
    }

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
        const response = await axios_private.post('/experience/educations', {
          institution: formData.institution,
          degree: formData.degree,
          major: formData.major,
          period_start: formData.period_start,
          period_end: formData.is_current ? null : formData.period_end,
        })

        console.log('Data saved successfully:', response.data)

        toast.success('Data saved successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        navigate('/experience/education')
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
              <h3 className="title">Tambah Pengalaman Pendidikan</h3>
              <p className="sub-title">Isi formulir untuk menambah pengalaman pendidikan Anda</p>
            </div>
            <div className="action-container">
              <button
                className="btn btn-secondary btn-back btn-sm"
                onClick={() => navigate('/experience/education')}
              >
                <i className="fa fa-chevron-left"></i> Kembali
              </button>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="institution" className="form-label">
                      Nama Institusi
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.institution ? 'is-invalid' : ''}`}
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={(e) => handleChange('institution', e.target.value)}
                      required
                    />
                    {errors.institution && (
                      <div className="invalid-feedback">{errors.institution}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="degree" className="form-label">
                      Tingkat
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.degree ? 'is-invalid' : ''}`}
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={(e) => handleChange('degree', e.target.value)}
                      required
                    />
                    {errors.degree && <div className="invalid-feedback">{errors.degree}</div>}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="major" className="form-label">
                      Jurusan
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                      id="major"
                      name="major"
                      value={formData.major}
                      onChange={(e) => handleChange('major', e.target.value)}
                    />
                    {errors.major && <div className="invalid-feedback">{errors.major}</div>}
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
                  <div className="form-group mb-3">
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
                      Sedang Berjalan
                    </label>
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

export default AddEducations
