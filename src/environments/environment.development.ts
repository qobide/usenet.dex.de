export const environment = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  appVersion: require('../../package.json').version + '--dev',
  production : false,
  dataURL : '//usenet.dex.de/data'
};
