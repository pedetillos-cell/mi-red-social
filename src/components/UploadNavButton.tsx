'use client';

import Link from 'next/link';

export default function UploadNavButton() {
  return (
    <Link href="/upload" className="upload-nav-button">
      <i className="fas fa-plus"></i>
      <span>Subir</span>
    </Link>
  );
}