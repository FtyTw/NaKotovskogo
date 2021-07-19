const PicNames = [
  'adult1.heic',
  'calligraphy2.heic',
  'handwriting2.jpg',
  'adult2.heic',
  'clay1.heic',
  'botanical1.heic',
  'clay2.heic',
  'painting1.heic',
  'botanical2.jpg',
  'graphic_design1.heic',
  'painting2.heic',
  'botanical3.jpg',
  'graphic_design2.heic',
  'watercolor1.jpg',
  'calligraphy1.heic',
  'handwriting1.jpg',
  'watercolor2.jpg'
]

function importAll(r) {
  return r.keys().map(r)
}

export const images = importAll(require.context('./', true, /\.(png|jpe?g|svg|heic)$/))
