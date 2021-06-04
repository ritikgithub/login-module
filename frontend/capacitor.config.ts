import { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'com.example.app',
  appName: 'frontend',
  webDir: 'build',
  bundledWebRuntime: false,
  server : {
    url: "http://192.168.43.228:8100"
  }
};

export default config;
