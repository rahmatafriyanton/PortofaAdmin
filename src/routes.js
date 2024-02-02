import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Logout = React.lazy(() => import('./views/Logout'))

// Pengalaman Kerja
const Job = React.lazy(() => import('./views/experience/job/index.js'))
const AddJob = React.lazy(() => import('./views/experience/job/add.js'))
const EditJob = React.lazy(() => import('./views/experience/job/edit.js'))

const jobs_routes = [
  {
    path: '/experience/job',
    name: 'Pengalaman Kerja',
    element: Job,
    exact: true,
  },

  {
    path: '/experience/job/add',
    name: 'Tambah Pengalaman Kerja',
    element: AddJob,
    exact: true,
  },

  {
    path: '/experience/job/edit/:id',
    name: 'Edit Pengalaman Kerja',
    element: EditJob,
    exact: true,
  },
]
// End Pengalaman Kerja

// Riwayat Pendidikan
const Education = React.lazy(() => import('./views/experience/education/index.js'))
const AddEducation = React.lazy(() => import('./views/experience/education/add.js'))
const EditEducation = React.lazy(() => import('./views/experience/education/edit.js'))

const education_routes = [
  {
    path: '/experience/education',
    name: 'Riwayat Pendidikan',
    element: Education,
    exact: true,
  },

  {
    path: '/experience/education/add',
    name: 'Tambah Riwayat Pendidikan',
    element: AddEducation,
    exact: true,
  },

  {
    path: '/experience/education/edit/:id',
    name: 'Edit Riwayat Pendidikan',
    element: EditEducation,
    exact: true,
  },
]
// End Riwayat Pendidikan

// Pengalaman Organisasi
const Organization = React.lazy(() => import('./views/experience/organization/index.js'))
const AddOrganization = React.lazy(() => import('./views/experience/organization/add.js'))
const EditOrganization = React.lazy(() => import('./views/experience/organization/edit.js'))

const organizations_routes = [
  {
    path: '/experience/organization',
    name: 'Pengalaman Organisasi',
    element: Organization,
    exact: true,
  },

  {
    path: '/experience/organization/add',
    name: 'Tambah Pengalaman Organisasi',
    element: AddOrganization,
    exact: true,
  },

  {
    path: '/experience/organization/edit/:id',
    name: 'Edit Pengalaman Organisasi',
    element: EditOrganization,
    exact: true,
  },
]
// End Pengalaman Organisasi

const routes = [
  { path: '/', exact: true, name: 'Beranda' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  ...jobs_routes,
  ...education_routes,
  ...organizations_routes,

  { path: '/skills', name: 'Keterampilan', element: Dashboard, exact: true },
  { path: '/certifications', name: 'Sertifikasi', element: Dashboard, exact: true },
  { path: '/projects', name: 'Proyek', element: Dashboard, exact: true },
  { path: '/resume', name: 'Resume', element: Dashboard, exact: true },

  // Logout
  { path: '/logout', name: 'Logout', element: Logout, exact: true },
]

export default routes
