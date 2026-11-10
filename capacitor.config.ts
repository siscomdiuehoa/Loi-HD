import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.phong.tramaloidieuhoa',
  appName: 'Tra mã lỗi điều hòa',
  webDir: 'dist',
  plugins: { FirebaseAuthentication: { providers: ['apple.com', 'google.com'] } },
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  }
};

export default config;
