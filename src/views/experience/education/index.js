import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Educations = () => {
  const pageSize = 2
  const [currentPage, setCurrentPage] = useState(0)
  const [filterValue, setFilterValue] = useState('Semua')
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  const [data, setData] = useState([
    {
      id: 1,
      nama: 'Pendidikan 1',
      instansi: 'Institusi A',
      jurusan: 'Teknik Informatika',
      tahun: '2018-2020',
    },
    {
      id: 2,
      nama: 'Pendidikan 2',
      instansi: 'Institusi B',
      jurusan: 'Sistem Informasi',
      tahun: '2016-2018',
    },
    {
      id: 3,
      nama: 'Pendidikan 3',
      instansi: 'Institusi C',
      jurusan: 'Manajemen',
      tahun: '2015-2016',
    },
    // Add more dummy data as needed
  ])

  const handleEdit = (id) => {
    // Handle edit logic
    console.log('Edit button clicked for id:', id)
    navigate('/experience/education/edit/' + id)
  }

  const handleDelete = (id) => {
    // Menampilkan notifikasi sebelum menghapus
    toast.warn(
      <div>
        <p>Apakah Anda yakin ingin menghapus pengalaman pendidikan ini?</p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-danger btn-sm me-2"
            onClick={() => handleDeleteConfirmed(id)}
          >
            Ya
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => toast.dismiss()}>
            Tidak
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      },
    )
  }

  const handleDeleteConfirmed = (id) => {
    // Handle delete logic setelah notifikasi tertutup
    console.log('Delete button clicked for id:', id)

    // TODO: Tambahkan logika penghapusan data berdasarkan ID
    // Misalnya:
    // const newData = data.filter(item => item.id !== id);
    // setData(newData);

    // Menutup notifikasi setelah penghapusan
    toast.dismiss()
  }

  const handleAddExperience = () => {
    // Navigasi ke halaman tambah pengalaman
    navigate('/experience/education/add')
  }

  const totalPages = Math.ceil(data.length / pageSize)

  const changePage = (page) => {
    setCurrentPage(page)
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const currentData = data.slice(startIndex, endIndex)

  const filteredData =
    filterValue === 'Semua' ? currentData : data.filter((item) => item.instansi === filterValue)
  const searchedData = searchValue
    ? filteredData.filter((item) => item.nama.toLowerCase().includes(searchValue.toLowerCase()))
    : filteredData

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="card card-data mb-4">
          <div className="card-header">
            <div>
              <h3 className="title">Pendidikan</h3>
              <p className="sub-title">Daftar pengalaman pendidikan Anda</p>
            </div>
            <div className="action-container">
              <button className="btn btn-primary btn-sm" onClick={handleAddExperience}>
                Tambah Pengalaman
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex table-action-container justify-content-between mb-3">
              <div className="filter">
                <i className="fa fa-filter"></i>
                <select
                  className="form-control"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                >
                  <option value="Semua">Semua</option>
                  {/* Add options for filters based on your data */}
                </select>
              </div>

              <div className="search">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-data">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Pendidikan</th>
                    <th>Instansi</th>
                    <th>Jurusan</th>
                    <th>Tahun</th>
                    <th className="text-center">Aktif</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {searchedData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.nama}</td>
                      <td>{row.instansi}</td>
                      <td>{row.jurusan}</td>
                      <td>{row.tahun}</td>
                      <td className="d-flex justify-content-center">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleEdit(row.id)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(row.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={prevPage} disabled={currentPage === 0}>
                    <i className="fa fa-chevron-left"></i>
                  </button>
                </li>
                {[...Array(totalPages).keys()].map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => changePage(page)}>
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    <i className="fa fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Educations
