import React from 'react'
import './index.css'
import { fetchPhotos } from './api/mediaApi'
import { fetchVideos } from './api/mediaApi'
import { fetchGifs } from './api/mediaApi'
const App = () => {
  const getPhotos=async ()=>{
    const photoData = await fetchPhotos('cat')
    console.log(photoData)
  }

    const getVideos=async ()=>{
      const videoData = await fetchVideos('cat')
      console.log(videoData)
    }

    const getGifs=async ()=>{
      const gifData = await fetchGifs('cat')
      console.log(gifData)
    }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-3 bg-red-400">
             <span className="text-white text-center text-6xl">HELLO <br />
             EVERYONE
            </span> 
            <div className="flex gap-3">
              <button className="w-30 h-10 bg-white text-red-400 px-4 py-2 rounded-md hover:bg-gray-200" onClick={getPhotos}>Photos</button>
               <button className="w-30 h-10 bg-white text-red-400 px-4 py-2 rounded-md hover:bg-gray-200" onClick={getVideos}>Videos</button>
               <button className="w-30 h-10 bg-white text-red-400 px-4 py-2 rounded-md hover:bg-gray-200" onClick={getGifs}>Gifs</button>
            </div>
            
    </div>
  )
}

export default App