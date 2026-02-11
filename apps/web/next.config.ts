import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 配置 Less 支持
  webpack: (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
