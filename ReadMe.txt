Commands to run for dist files. Git Bash on this folder and:

npm run webpack (to compile js)
npm run scss (to compile scss)

If coming from a backup, install these packages in the 
package.json from npm - as of now they are:

"dependencies": {
    "node-sass": "^4.13.1",
    "three": "^0.115.0",
    "webpack-cli": "^3.3.11"
  },
  "devDependencies": {
    "@babel/core": "^7.9.0",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/preset-env": "^7.9.5",
    "babel-loader": "^8.1.0",
    "webpack": "^4.43.0"
  }