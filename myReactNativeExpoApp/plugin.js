const { withAndroidManifest } = require('@expo/config-plugins');

function setCustomAndroidConfig(config) {
  return withAndroidManifest(config, config => {
    const androidManifest = config.modResults;
    
    // Here you can manipulate androidManifest
    // For example, add a uses-permission:
    androidManifest.manifest["uses-permission"] = androidManifest.manifest["uses-permission"] || [];
    androidManifest.manifest["uses-permission"].push({
      $: { "android:name": "android.permission.FOREGROUND_SERVICE" }
    });

    // return the modified manifest
    return config;
  });
}

module.exports = (config) => {
  return setCustomAndroidConfig(config);
};