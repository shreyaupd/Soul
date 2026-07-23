import {useEffect} from 'react'
import './index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { fetchPhotos,fetchVideos,fetchGifs  } from './api/mediaApi'
import SearchBar from './components/SearchBar.jsx'
import Tabs from './components/Tabs.jsx'
import ResultGrid from './components/ResultGrid.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import Navbar from './components/Navbar.jsx'
import { useSelector } from 'react-redux'

const App = () => {
  const query = useSelector((store) => store.search.query);

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-red-400">
        <div className="pt-8 pb-6 flex flex-col items-center gap-6">
          <Navbar />
          <SearchBar/>
          <Tabs />
        </div>
        <div className="px-4 pb-8">
          <Routes>
            <Route path="/" element={<ResultGrid />} />
            <Route path="/collection" element={<CollectionPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App