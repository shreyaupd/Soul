import axios from 'axios'
const UNSPLASH_KEY= import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY= import.meta.env.VITE_PEXELS_KEY
const KLIPY_KEY= import.meta.env.VITE_KLIPY_KEY
export const fetchPhotos = async ( query,page=1,per_page=20) => {
   const res = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            page,
            query,
            per_page
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_KEY}`
          }
    })
    return res.data.results
}

export const fetchVideos = async ( query,page=1,per_page=20) => {
   const res = await axios.get('https://api.pexels.com/v1/videos/search', {
          params: {
            page,
            query,
            per_page
          },
          headers: {
            Authorization: `${PEXELS_KEY}`
          }
    })
    return res.data.videos
}

export const fetchGifs = async ( q,page=1,per_page=20) => {
   const res = await axios.get(`https://api.klipy.com/api/v1/${KLIPY_KEY}/gifs/search`, {
          params: {
            page,
            per_page,
            q
          },
          headers: {
            Authorization: `Client-ID ${KLIPY_KEY}`
          }
    })
    return res.data.data.data
}