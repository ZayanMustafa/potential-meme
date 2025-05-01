// next.config.js
module.exports = {
    images: {
      domains: ['flagcdn.com'],
      // OR the newer syntax:
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'flagcdn.com',
          pathname: '/**',
        }
      ],
    }
  }
  