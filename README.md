# hypercast-browser

[louiscenter/hypercast](https://github.com/louiscenter/hypercast) refactored as a standalone browser-only module (no Electron!).

Both broadcasting and viewing requires [Beaker Browser](https://beakerbrowser.com/).

## Demo
[Try it now in Beaker Browser!](https://rationalcoding.github.io/hypercast-browser/demo/demo.html)

1. Allow webcam access.
2. Click the link to view the stream across the Dat protocol!
3. Share the link and stream to others! :smiley:

## Install
With Browserify:

```bash
npm install --save hypercast-browser
```

```javascript
var Hypercast = require('hypercast-browser')
```

Or without it:

```html
<script src="dist/hypercast.js"></script>
```

## API
### `Hypercast.broadcast(mediaStream, opts)`
Broadcasts a new MediaStream over the Dat protocol. Returns a Dat URL of the stream archive.

`mediaStream` - A WebRTC MediaStream.

`opts` - Options object. Defaults are:

```javascript
{
    interval: 10
    mimeType: 'video/webm; codecs="opus,vp8"'
}
```

### `Hypercast.view(url, opts)`
Views a Hypercast stream via the Dat protocol. Returns a video element that will play the stream.

`url` - Dat URL of stream archive. (Get this from `broadcast`!)

`opts` - Options object. Defaults are:

```javascript
{
    videoElement: null // Specify this to provide your own video element
    mimeType: 'video/webm; codecs="opus,vp8"'
}
```


