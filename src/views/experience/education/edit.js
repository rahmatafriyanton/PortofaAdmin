import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'
import ReactQuill from 'react-quill' // Import library ReactQuill
import 'react-quill/dist/quill.snow.css' // Import style untuk Quill
import { QuillToolbar, modules, formats } from 'src/components/QuillToolbar'

const EditEducations = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const axios_private = useAxiosPrivate()

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    level: '',
    description: '',
    ipk: 0.0,
    ipk_max: 4.0,
    period_start: null,
    period_end: null,
    achievements: '',
    is_current: false,
  })

  const [errors, setErrors] = useState({
    name: '',
    location: '',
    level: '',
    period_start: '',
    period_end: '',
  })

  const fetchDetail = async () => {
    try {
      const response = await axios_private.get(`/experience/educations/${id}`)
      const data = response.data

      setFormData({
        name: data.name,
        location: data.location,
        level: data.level,
        description: data.description,
        ipk: data.ipk,
        ipk_max: data.ipk_max,
        period_start: data.period_start,
        period_end: data.period_end,
        achievements: data.achievements,
        is_current: data.period_end === null,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [])

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

    if (!formData.name.trim()) {
      newErrors.name = 'Nama Universitas/Sekolah harus diisi'
      isValid = false
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi Universitas/Sekolah harus diisi'
      isValid = false
    }

    if (!formData.level.trim()) {
      newErrors.level = 'Level pendidikan harus diisi'
      isValid = false
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi pendidikan harus diisi'
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
        const response = await axios_private.put(`/experience/educations/${id}`, {
          name: formData.name,
          location: formData.location,
          level: formData.level,
          description: formData.description,
          ipk: formData.ipk,
          ipk_max: formData.ipk_max,
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
      console.log('Form tidak valid. Mohon isi semua field yang diperlukan .')
    }
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="card card-data mb-4">
          <div className="card-header">
            <div>
              <h3 className="title">Edit Pengalaman Pendidikan</h3>
              <p className="sub-title">Isi formulir untuk mengedit pengalaman pendidikan Anda</p>
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
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">
                      Nama Sekolah/Universitas
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
                    <label htmlFor="location" className="form-label">
                      Lokasi Sekolah/Universitas
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

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="level" className="form-label">
                      Level Pendidikan
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.level ? 'is-invalid' : ''}`}
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={(e) => handleChange('level', e.target.value)}
                    />
                    {errors.level && <div className="invalid-feedback">{errors.level}</div>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">{errors.description}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="ipk" className="form-label">
                      IPK
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.ipk ? 'is-invalid' : ''}`}
                      id="ipk"
                      name="ipk"
                      step="0.01"
                      value={formData.ipk}
                      onChange={(e) => handleChange('ipk', e.target.value)}
                    />
                    {errors.ipk && <div className="invalid-feedback">{errors.ipk}</div>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="ipk_max" className="form-label">
                      IPK Max
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.ipk_max ? 'is-invalid' : ''}`}
                      step="0.01"
                      id="ipk_max"
                      name="ipk_max"
                      value={formData.ipk_max}
                      onChange={(e) => handleChange('ipk_max', e.target.value)}
                    />
                    {errors.ipk_max && <div className="invalid-feedback">{errors.ipk_max}</div>}
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

                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="achievements" className="form-label">
                      Aktifitas dan Pencapaian
                    </label>

                    <div>
                      <QuillToolbar />
                      <ReactQuill
                        value={formData.achievements}
                        onChange={(value) => handleChange('achievements', value)}
                        modules={modules}
                        formats={formats}
                      />
                    </div>
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

export default EditEducations
