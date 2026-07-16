import { Search } from 'lucide-react';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { setQuery, setActiveTab, setResults, setLoading, setError } from '../redux/features/searchSlice';
const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
   const dispatch=useDispatch();
  const handleSearch=(e)=>{
    e.preventDefault();
    dispatch(setQuery(searchText));
  //   console.log(searchText)
   }
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
      <form action="" onSubmit={handleSearch}>
          <input
          type="text"
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
          required
          placeholder="Search..."
          className="w-full h-12 pl-4 pr-12 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-red-400 text-white hover:bg-red-500 focus:outline-none transition-colors"
        >
          <Search className="h-5 w-5 active:scale-1 focus:outline-none" />
        </button>
      </form>
      </div>
    </div>
  );
};

export default SearchBar;