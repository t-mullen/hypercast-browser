/* global DatArchive */

var mtw = require('mediastream-to-webm')

// Creates an archive from a mediaStream and returns the url of that archive
async function broadcast (mediaStream, opts) {
  var archive = await DatArchive.create({
    title: 'Hypercast Video Stream',
    description: 'An encoded WebM video stream.'
  })

  var enc = mtw.EncodedStream(mediaStream, opts)
  var chunkCount = 0
  enc.on('data', (chunk) => {
    archive.writeFile(chunkCount + '.buffer', chunk.buffer, 'binary')
    archive.writeFile('currentChunk.txt', chunkCount + '', 'utf8')
    archive.commit()
    console.log('committed ', chunkCount + '.buffer')
    chunkCount++
  })

  return archive.url
}
module.exports = broadcast
