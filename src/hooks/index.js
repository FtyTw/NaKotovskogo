import { useEffect, useState, useMemo } from 'react'
import { images } from '../assets/images/about'

// const images = []
export const useOnScroll = (callback) => {
  useEffect(() => {
    window.addEventListener('scroll', callback, true)

    return () => window.removeEventListener('scroll', callback, true)
  }, [callback])
}

export const useOnBeforeUnload = (callback) => {
  useEffect(() => {
    window.addEventListener('beforeunload', callback)

    return window.removeEventListener('beforeunload', callback)
  }, [callback])
}

export const useImageSource = (source) => {
  const [imgSrc, setImageSource] = useState()

  const sourceSetter = (imgSrc) => images.filter((i) => i.includes(`${imgSrc}2`))[0]
  useEffect(() => {
    if (source) {
      const imgSrc = sourceSetter(source)
      setImageSource(imgSrc)
    }
  }, [source])

  return imgSrc
}

export const useDeviceDimensions = () => {
  // iPad|iPod|
  const isMobile = useMemo(() => /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), [navigator.userAgent])

  return isMobile
}
