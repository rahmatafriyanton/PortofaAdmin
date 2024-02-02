import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="me-auto">
        <span className="me-1">Developed by</span>
        <a href="https://rahmatafriyanton.github.io/" target="_blank" rel="noopener noreferrer">
          Rahmat
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
