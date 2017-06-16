export default {
  appName: process.env.APP_NAME || 'LoopServer',
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/createreactappparse', // Connection string for your MongoDB database
  cloud: __dirname + '/cloud/main.js', // Absolute path to your Cloud Code
  appId: process.env.APP_ID || 'loop-server',
  masterKey: process.env.MASTER_KEY || 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed,
  allowInsecureHTTP: true
}
