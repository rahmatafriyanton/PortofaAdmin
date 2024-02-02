import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilArrowLeft,
  cilChartPie,
  cilDescription,
  cilDrop,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Beranda',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Manajemen Pengalaman',
  },
  {
    component: CNavItem,
    name: 'Pengalaman Kerja',
    to: '/experience/job',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Riwayat Pendidikan',
    to: '/experience/education',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pengalaman Organisasi',
    to: '/experience/organization',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Informasi Tambahan',
  },
  {
    component: CNavItem,
    name: 'Keterampilan',
    to: '/skill',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sertifikasi',
    to: '/certification',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Proyek',
    to: '/project',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Resume',
    to: '/resume',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilArrowLeft} customClassName="nav-icon" />,
  },
  // ... (tambahkan menu-menu lainnya sesuai kebutuhan)
]

export default _nav
