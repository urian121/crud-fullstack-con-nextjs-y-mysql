import React from 'react'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
          <Image src="/logo_nextjs.webp" alt="Next.js" width={100} height={50} />
        <a className="navbar-brand fw-bold fs-4 opacity-75" href="#">Crud con Nextjs y MySQL</a>
      </div>
    </nav>
  )
}
