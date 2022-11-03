const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase == PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        mongodb_username: 'TuNguyen',
        mongodb_password: 'ccU7Xo5Pvb6XSyEd',
        mongodb_clustername: 'nextjs-course-cluster'
      }
    };
  } else {
    return {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        mongodb_username: 'TuNguyen',
        mongodb_password: 'ccU7Xo5Pvb6XSyEd',
        mongodb_clustername: 'nextjs-course-cluster'
      }
    };
  }
};

module.exports = nextConfig;
