
fis.match('*.{css,js,png,ico,jpeg}', {
  useHash: false,
  deploy: fis.plugin('http-push', {
    receiver: 'http://47.95.115.82:8999/receiver',
    to: '/server/shakedown'
  })
})


fis.match('*.html', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://47.95.115.82:8999/receiver',
    to: '/server/shakedown'
  })
})

// fis.match('/js/*.js', {
//   optimizer: fis.plugin('uglify-js'),
//   useHash: true,
//   deploy: fis.plugin('http-push', {
//     receiver: 'http://47.95.115.82:8999/receiver',
//     to: '/server/shakedown/js/'
//   })
// })

// fis.match('*.css', {
//   optimizer: fis.plugin('clean-css'),
//   useHash: true,
//   deploy: fis.plugin('http-push', {
//     receiver: 'http://47.95.115.82:8999/receiver',
//     to: '/server/shakedown/css/'
//   })
// });

// fis.match('*.png', {
//   optimizer: fis.plugin('png-compressor')
// });

