import {fetchPhotos, fetchVideos, fetchGifs} from '../api/mediaApi';
import {setResults, setLoading, setError} from '../redux/features/searchSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import ResultCard from './ResultCard';

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query,activeTab,results,loading,error } = useSelector((store) => store.search);

useEffect(() => {
   const fetchData = async () => {
    if (!query) return;
    dispatch(setLoading());
    try {
      let data;
      if(activeTab==='photos'){
          data = await fetchPhotos(query);

          data=data.map((photo)=>({
            id:photo.id,
            description:photo.alt_description,
            image:photo.urls.full,
            author: photo.user.first_name + " " + photo.user.last_name,
            type: "photo"
          }))
      }
      if(activeTab==='videos'){
          data = await fetchVideos(query);
           data=data.map((video)=>({
            id:video.id,
            description:video.url.split("/")[4].replace(/-\d+$/, "").replaceAll("-", " "),
            image:video.image,
            url: video.url,
            author: video.user.name,
            type: "video"
          }))
          
      }
      if(activeTab==='gifs'){
          data = await fetchGifs(query);
           data=data.map((gif)=>({
            id:gif.id,
            description:gif.title,
            image:gif.file.hd.gif.url,
            author: "",
            type: "gif"
          }))
      }
       console.log('Results:', data);
      dispatch(setResults(data || [])); //results is array of objects which has value of data
    } catch (err) {
      dispatch(setError(err.message));
      
    }
   
   }
   fetchData();
}, [query, activeTab, dispatch]);

  if (!results || results.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {results.map((item) => (
        <ResultCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ResultGrid;