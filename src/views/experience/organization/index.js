import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { format_period } from 'src/helper/AppHelper'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'

const Organizations = () => {
  const page_size = process.env.REACT_APP_PAGE_SIZE
  const navigate = useNavigate()
  const axios_private = useAxiosPrivate()

  const [pageData, setPageData] = useState({
    data: null,
    current_page: 1,
    total_pages: 0,
    total_data: 0,
    filter: {
      search_value: null,
      is_active: '',
    },
  })

  const fetchData = async () => {
    try {
      const params = {
        page: pageData.current_page,
        search: pageData.filter.search_value,
        limit: page_size,
      }

      if (pageData.filter.is_active !== '') {
        params.is_active = pageData.filter.is_active
      }

      const response = await axios_private.get('/experience/organizations', { params })
      const responseData = response.data

      const formattedData = responseData.data.map((item, index) => ({
        ...item,
        index: index + 1 + page_size * (pageData.current_page - 1),
      }))

      setPageData({
        ...pageData,
        data: formattedData,
        total_pages: responseData.total_pages,
        total_data: responseData.total_data,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageData.current_page, pageData.filter])

  const handleEdit = (id) => {
    console.log('Edit button clicked for id:', id)
    navigate(`/experience/organization/edit/${id}`)
  }

  const handleDelete = (id) => {
    toast.warn(
      <div>
        <p>Apakah Anda yakin ingin menghapus pengalaman pekerjaan ini?</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-danger btn-sm me-2" onClick={() => deleteData(id)}>
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

  const deleteData = async (id) => {
    toast.dismiss()
    try {
      await axios_private.delete(`/experience/organizations/${id}`)

      await fetchData()

      toast.success(`Data deleted successfully`)
    } catch (error) {
      console.error('Error deleting data:', error)
      toast.error('Error deleting data')
    }
  }

  const handleAddExperience = () => {
    navigate('/experience/organization/add')
  }

  const changePage = (page) => {
    setPageData({ ...pageData, current_page: page })
  }

  const nextPage = () => {
    if (pageData.current_page < pageData.total_pages) {
      setPageData((prevData) => ({ ...prevData, current_page: prevData.current_page + 1 }))
    }
  }

  const prevPage = () => {
    if (pageData.current_page > 1) {
      setPageData((prevData) => ({ ...prevData, current_page: prevData.current_page - 1 }))
    }
  }

  const toggleStatus = async (id) => {
    try {
      await axios_private.patch(`/experience/organizations/${id}`)

      await fetchData()

      toast.success(`Status updated successfully`)
    } catch (error) {
      console.error('Error toggling status:', error)
      toast.error('Error updating status')
    }
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="card card-data mb-4">
          <div className="card-header">
            <div>
              <h3 className="title">Organisasi</h3>
              <p className="sub-title">Daftar pengalaman organisasi Anda</p>
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
                  value={pageData.filter.is_active}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      filter: { ...pageData.filter, is_active: e.target.value },
                    })
                  }
                >
                  <option value="">Semua Data</option>
                  <option value="Y">Aktif</option>
                  <option value="N">Tidak Aktif</option>
                </select>
              </div>
              <div className="search">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari..."
                  value={pageData.filter.search_value || ''}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      filter: { ...pageData.filter, search_value: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-data">
                <thead>
                  <tr>
                    <th>#</th>
                    <th width={'25%'}>Organisasi</th>
                    <th width={'25%'}>Posisi</th>
                    <th width={'25%'}>Tahun</th>
                    <th className="text-center">Aktif</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.data?.length > 0 ? (
                    pageData.data.map((row) => (
                      <tr key={row.id}>
                        <td>{row.index}</td>
                        <td>{row.name}</td>
                        <td>{row.position}</td>
                        <td>{format_period(row.period_start, row.period_end)}</td>
                        <td style={{ textAlign: 'center' }}>
                          <div
                            className="form-check form-switch"
                            style={{ display: 'inline-block' }}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={row.is_active === 'Y'}
                              onChange={() => toggleStatus(row.id)}
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Data kosong
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation example"></nav>

            {pageData.data?.length > 0 && pageData.total_pages > 1 && (
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={`page-item ${pageData.current_page === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={prevPage}
                      disabled={pageData.current_page === 1}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                  </li>
                  {[...Array(pageData.total_pages).keys()].map((page) => (
                    <li
                      key={page}
                      className={`page-item ${pageData.current_page === page + 1 ? 'active' : ''}`}
                    >
                      <button className="page-link" onClick={() => changePage(page + 1)}>
                        {page + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      pageData.current_page === pageData.total_pages ? 'disabled' : ''
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={nextPage}
                      disabled={pageData.current_page === pageData.total_pages}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
                <div className="pagination-info">
                  <p>
                    Total Data: {pageData.total_data}, Total Pages: {pageData.total_pages}, Current
                    Page: {pageData.current_page}
                  </p>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Organizations
