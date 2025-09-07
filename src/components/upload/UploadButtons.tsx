'use client';

import Link from 'next/link';

export default function UploadButton() {
  return (
    <Link href="/upload" className="upload-button">
      <i className="fas fa-plus"></i>
      <span>Subir</span>
    </Link>
  );
}