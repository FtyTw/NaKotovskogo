import axios from 'axios'
import token from '../../tokens'

export const refreshToken = () => {
  return axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`)
}

export const getInstagramMedia = (params) => {
  return axios.get(
    `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,timestamp,thumbnail_url,permalink&access_token=${token}`,
    { params }
  )
}
