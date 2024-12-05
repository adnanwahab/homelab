npm uninstall -g expo-cli

# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json from your project
rm -rf node_modules package-lock.json
npm install
npm install metro

-----
npx expo install react-native-web react-dom @expo/metro-runtime
ETA 2045 - GDB - ksplice
