import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ← AÑADE ESTA LÍNEA
  },
}

module.exports = nextConfig