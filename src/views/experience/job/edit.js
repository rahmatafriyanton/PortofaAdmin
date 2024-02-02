import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditJobs = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Dummy data for demonstration
  const dummyData = [
    {
      id: 1,
      nama: 'Pekerjaan 1',
      instansi: 'Instansi A',
      jabatan: 'Manager',
      tahunMulai: '2018',
      tahunBerakhir: '2020',
      sedangBerjalan: false,
    },
    {
      id: 2,
      nama: 'Pekerjaan 2',
      instansi: 'Instansi B',
      jabatan: 'Developer',
      tahunMulai: '2016',
      tahunBerakhir: '2018',
      sedangBerjalan: false,
    },
    {
      id: 3,
      nama: 'Pekerjaan 3',
      instansi: 'Instansi C',
      jabatan: 'Analyst',
      tahunMulai: '2015',
      tahunBerakhir: '2016',
      sedangBerjalan: false,
    },
    // Add more dummy data as needed
  ]

  const [formData, setFormData] = useState({
    nama: '',
    instansi: '',
    jabatan: '',
    tahunMulai: '',
    tahunBerakhir: '',
    sedangBerjalan: false,
  })

  const [errors, setErrors] = useState({
    nama: '',
    instansi: '',
    jabatan: '',
    tahunMulai: '',
    tahunBerakhir: '',
  })

  useEffect(() => {
    // Retrieve data based on id (assuming id is present in the dummy data)
    const selectedData = dummyData.find((data) => data.id.toString() === id)

    // If data is found, update the form data
    if (selectedData) {
      setFormData(selectedData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Menghapus pesan kesalahan saat nilai field diubah
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Menghapus pesan kesalahan saat nilai field diubah
    }))
  }

  const handleBack = () => {
    navigate('/experience/job')
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    // Validasi Nama Pekerjaan
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama Pekerjaan harus diisi'
      isValid = false
    }

    // Validasi Instansi
    if (!formData.instansi.trim()) {
      newErrors.instansi = 'Instansi harus diisi'
      isValid = false
    }

    // Validasi Jabatan
    if (!formData.jabatan.trim()) {
      newErrors.jabatan = 'Jabatan harus diisi'
      isValid = false
    }

    // Validasi Tahun Mulai
    if (!formData.tahunMulai.trim()) {
      newErrors.tahunMulai = 'Tahun Mulai harus diisi'
      isValid = false
    }

    // Validasi Tahun Berakhir jika tidak sedang berjalan
    if (!formData.sedangBerjalan && !formData.tahunBerakhir.trim()) {
      newErrors.tahunBerakhir = 'Tahun Berakhir harus diisi'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSave = () => {
    if (validateForm()) {
      // Todo: Tambahkan logika penyimpanan data pekerjaan
      console.log('Data yang akan disimpan:', formData)
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
              <h3 className="title">Edit Pengalaman Kerja</h3>
              <p className="sub-title">Isi formulir untuk mengedit pengalaman kerja Anda</p>
            </div>
            <div className="action-container">
              <button className="btn btn-secondary btn-back btn-sm" onClick={handleBack}>
                <i className="fa fa-chevron-left"></i> Kembali
              </button>
            </div>
          </div>
          <div className="card-body">
            {/* Form Edit Pekerjaan */}
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="namaPekerjaan" className="form-label">
                      Nama Pekerjaan
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nama ? 'is-invalid' : ''}`}
                      id="namaPekerjaan"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                    />
                    {errors.nama && <div className="invalid-feedback">{errors.nama}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="instansi" className="form-label">
                      Instansi
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.instansi ? 'is-invalid' : ''}`}
                      id="instansi"
                      name="instansi"
                      value={formData.instansi}
                      onChange={handleChange}
                      required
                    />
                    {errors.instansi && <div className="invalid-feedback">{errors.instansi}</div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="jabatan" className="form-label">
                      Jabatan
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.jabatan ? 'is-invalid' : ''}`}
                      id="jabatan"
                      name="jabatan"
                      value={formData.jabatan}
                      onChange={handleChange}
                      required
                    />
                    {errors.jabatan && <div className="invalid-feedback">{errors.jabatan}</div>}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="tahunMulai" className="form-label">
                      Tahun Mulai
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.tahunMulai ? 'is-invalid' : ''}`}
                      id="tahunMulai"
                      name="tahunMulai"
                      value={formData.tahunMulai}
                      onChange={handleChange}
                      required
                    />
                    {errors.tahunMulai && (
                      <div className="invalid-feedback">{errors.tahunMulai}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="tahunBerakhir" className="form-label">
                      Tahun Berakhir
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.tahunBerakhir ? 'is-invalid' : ''}`}
                      id="tahunBerakhir"
                      name="tahunBerakhir"
                      value={formData.tahunBerakhir}
                      onChange={handleChange}
                      disabled={formData.sedangBerjalan}
                      required={!formData.sedangBerjalan}
                    />
                    {errors.tahunBerakhir && (
                      <div className="invalid-feedback">{errors.tahunBerakhir}</div>
                    )}
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="sedangBerjalan"
                      name="sedangBerjalan"
                      checked={formData.sedangBerjalan}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="sedangBerjalan">
                      Sedang Berjalan
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary " onClick={handleSave}>
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
