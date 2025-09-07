'use client';

import Link from 'next/link';

export default function FloatingUploadButton() {
  return (
    <Link href="/upload" className="floating-upload-button">
      <i className="fas fa-plus"></i>
    </Link>
  );
}