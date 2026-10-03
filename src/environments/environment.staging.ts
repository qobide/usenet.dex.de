export const environment = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  appVersion: require('../../package.json').version + '--stg',
  production : true,
  dataURL : '//usenet.dex.de/data'
};
