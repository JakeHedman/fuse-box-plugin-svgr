const package = require('./package.json')
const fs = require('fs')

package.peerDependencies = {
  'fuse-box': package.devDependencies['fuse-box'],
}

delete package.devDependencies
fs.writeFileSync('dist/package.json', package)
