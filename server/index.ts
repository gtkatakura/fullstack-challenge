require('@babel/register')({
  extensions: ['.ts', '.js', '.tsx', '.jsx']
})

require('babel-polyfill')

require('./src')
