/** @type {import('next').NextConfig} */
const nextConfig = {}
const nodeExternals = require('webpack-node-externals');

module.exports = { ...nextConfig, webpack: ( config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack } ) => { // Important: return the modified config
     if (isServer) { config.externals.push({ bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate", }); } return config; }, };
