import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'jewel',
  webDir: 'dist',
  server:{
    url:'http://192.168.30.210:8100'
  }
};

export default config;
