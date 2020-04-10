const package = require('./package.json')
const fs = require('fs')

package.peerDependencies = {
  'fuse-box': package.devDependencies['fuse-box'],
}
delete package.devDependencies
delete package.private

const json = JSON.stringify(package, null, 2)
fs.writeFileSync('dist/package.json', json)
