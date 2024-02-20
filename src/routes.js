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

// Keterampilan
const Skill = React.lazy(() => import('./views/skill/index.js'))
const AddSkill = React.lazy(() => import('./views/skill/add.js'))
const EditSkill = React.lazy(() => import('./views/skill/edit.js'))

const skill_routes = [
  {
    path: '/skills',
    name: 'Keterampilan',
    element: Skill,
    exact: true,
  },

  {
    path: '/skills/add',
    name: 'Tambah Keterampilan',
    element: AddSkill,
    exact: true,
  },

  {
    path: '/skills/edit/:id',
    name: 'Edit Keterampilan',
    element: EditSkill,
    exact: true,
  },
]
// End Keterampilan

// Sertifikasi
const Certification = React.lazy(() => import('./views/certification/index.js'))
const AddCertification = React.lazy(() => import('./views/certification/add.js'))
const EditCertification = React.lazy(() => import('./views/certification/edit.js'))

const certification_routes = [
  {
    path: '/certifications',
    name: 'Sertifikasi',
    element: Certification,
    exact: true,
  },

  {
    path: '/certifications/add',
    name: 'Tambah Sertifikasi',
    element: AddCertification,
    exact: true,
  },

  {
    path: '/certifications/edit/:id',
    name: 'Edit Sertifikasi',
    element: EditCertification,
    exact: true,
  },
]
// End Sertifikasi

// Sertifikasi
const Project = React.lazy(() => import('./views/project/index.js'))
const AddProject = React.lazy(() => import('./views/project/add.js'))
const EditProject = React.lazy(() => import('./views/project/edit.js'))

const project_routes = [
  {
    path: '/projects',
    name: 'Sertifikasi',
    element: Project,
    exact: true,
  },

  {
    path: '/projects/add',
    name: 'Tambah Sertifikasi',
    element: AddProject,
    exact: true,
  },

  {
    path: '/projects/edit/:id',
    name: 'Edit Sertifikasi',
    element: EditProject,
    exact: true,
  },
]
// End Sertifikasi

// User
const User = React.lazy(() => import('./views/user/index.js'))
const EditUser = React.lazy(() => import('./views/user/edit.js'))

const user_routes = [
  {
    path: '/users',
    name: 'User',
    element: User,
    exact: true,
  },

  {
    path: '/users/edit',
    name: 'Edit User',
    element: EditUser,
    exact: true,
  },
]
// End User

const routes = [
  { path: '/', exact: true, name: 'Beranda' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  ...jobs_routes,
  ...education_routes,
  ...organizations_routes,
  ...skill_routes,
  ...certification_routes,
  ...project_routes,
  ...user_routes,
  { path: '/certifications', name: 'Sertifikasi', element: Dashboard, exact: true },
  { path: '/projects', name: 'Proyek', element: Dashboard, exact: true },
  { path: '/resume', name: 'Resume', element: Dashboard, exact: true },

  // Logout
  { path: '/logout', name: 'Logout', element: Logout, exact: true },
]

export default routes
