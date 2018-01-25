/* global DatArchive */

var mtw = require('mediastream-to-webm')
var Buffer = require('safe-buffer').Buffer

// Loads an archive and returns an HTMLVideoElement playing the video in it
function view (url, opts) {
  var archive = new DatArchive(url)
  var dec = mtw.DecodedStream(opts)

  read()

  async function read () {
    var chunkCount = await archive.readFile('currentChunk.txt')
    chunkCount = parseInt(chunkCount)

    await readChunk(chunkCount + '.buffer')

    var evts = archive.createFileActivityStream()
    evts.addEventListener('changed', (event) => {
        readChunk(event.path.slice(1))
    })

    async function readChunk (filename) {
      if (filename === 'dat.json' || filename == 'currentChunk.txt') return

      var chunk
      try {
        chunk = await archive.readFile(filename, 'binary')
      } catch (err) {
        return console.error('Error downloading chunk ', filename, err)
      }

      if (chunk) {
        console.log('writing', filename)
        console.log(chunk)
        dec.write(Buffer.from(chunk))
        chunkCount++
      }
    }
  }

  return dec.videoElement
}
module.exports = view
