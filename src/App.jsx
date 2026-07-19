import {useEffect} from 'react'
import './index.css'
import { fetchPhotos,fetchVideos,fetchGifs  } from './api/mediaApi'
import SearchBar from './components/SearchBar.jsx'
import Tabs from './components/Tabs.jsx'
import ResultGrid from './components/ResultGrid.jsx'
import { useSelector } from 'react-redux'

const App = () => {
  const query = useSelector((store) => store.search.query);

  return (
    <div className="w-full min-h-screen bg-red-400">
      <div className="pt-8 pb-6 flex flex-col items-center gap-6">
        <SearchBar/>
        <Tabs />
      </div>
      <div className="px-4 pb-8">
        <ResultGrid />
      </div>
    </div>
  )
}

export default App