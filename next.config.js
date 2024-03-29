module.exports = {  
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
          ],
        },
      ];
    },
  
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_APP_PROXY}/:path*`,
        },
      ];
    },
  
    // 在這裡添加其他配置選項
  };