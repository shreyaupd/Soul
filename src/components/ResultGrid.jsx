import { fetchPhotos, fetchVideos, fetchGifs } from '../api/mediaApi';
import { setResults, setLoading, setError } from '../redux/features/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ResultCard from './ResultCard';

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector((store) => store.search);

  useEffect(() => {
    const fetchData = async () => {
      if (query && query.trim() !== "") {
        dispatch(setLoading());
        try {
          let data;
          if (activeTab === 'photos') {
            data = await fetchPhotos(query);
            data = data.map((photo) => ({
              id: photo.id,
              description: photo.alt_description,
              image: photo.urls.regular,
              author: photo.user.first_name + " " + photo.user.last_name,
              type: "photo"
            }))
          }
          if (activeTab === 'videos') {
            data = await fetchVideos(query);
            data = data.map((video) => ({
              id: video.id,
              description: video.url.split("/")[4].replace(/-\d+$/, "").replaceAll("-", " "),
              image: video.image,
              url: video.url,
              author: video.user.name,
              type: "video"
            }))

          }
          if (activeTab === 'gifs') {
            data = await fetchGifs(query);
            data = data.map((gif) => ({
              id: gif.id,
              description: gif.title,
              image: gif.file.hd.gif.url,
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
      else {
        const randomWords = [
          "rain",
          "fog",
          "solitude",
          "window",
          "coffee",
          "library",
          "night",
          "moon",
          "forest",
          "sea",
          "autumn",
          "snow",
          "candle",
          "vinyl",
          "old street",
          "letters",
          "film",
          "silhouette",
          "sunset",
          "memories"
        ];
        // Pick 10 different random words so each grid item is different
        const shuffled = [...randomWords].sort(() => Math.random() - 0.5);
        const selectedWords = shuffled.slice(0, 20);

        dispatch(setLoading());
        try {
          // Fetch data for all random words in parallel
          const fetchPromises = selectedWords.map(async (word) => {
            if (activeTab === 'photos') {
              const data = await fetchPhotos(word);
              if (!data || data.length === 0) return null;
              const photo = data[Math.floor(Math.random() * Math.min(data.length, 3))]; //randomly select one of the first 3 results to avoid duplicates
              return {
                //normalize the data to have a common structure for all media types
                id: photo.id,
                description: photo.alt_description,
                image: photo.urls.regular,
                author: photo.user.first_name + " " + photo.user.last_name,
                type: "photo"
              };
            }
            if (activeTab === 'videos') {
              const data = await fetchVideos(word);
              if (!data || data.length === 0) return null;
              const video = data[Math.floor(Math.random() * Math.min(data.length, 3))];
              return {
                id: video.id,
                description: video.url.split("/")[4].replace(/-\d+$/, "").replaceAll("-", " "),
                image: video.image,
                url: video.url,
                author: video.user.name,
                type: "video"
              };
            }
            if (activeTab === 'gifs') {
              const data = await fetchGifs(word);
              if (!data || data.length === 0) return null;
              const gif = data[Math.floor(Math.random() * Math.min(data.length, 3))];
              return {
                id: gif.id,
                description: gif.title,
                image: gif.file.hd.gif.url,
                author: "",
                type: "gif"
              };
            }
            return null;
          });

          const results = await Promise.all(fetchPromises); //parallel fetching of data for all random words
          // Replace nulls with placeholder items so the card still renders
          const filledResults = results.map((item, index) => {
            if (item !== null) return item;
            return {
              id: `empty-${index}`,
              description: `No ${activeTab} found for this keyword`,
              image: null,
              author: "",
              type: activeTab,
              empty: true
            };
          });
          console.log('Results:', filledResults);
          dispatch(setResults(filledResults));
        } catch (err) {
          dispatch(setError(err.message));
        }
      }
    }
    fetchData();
  }, [query, activeTab, dispatch]);

  if (!results || results.length === 0) {
    if (loading) return null;
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-2xl font-semibold">No {activeTab} found</p>
        <p className="text-sm mt-2">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {results.map((item) => (
        <ResultCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ResultGrid;