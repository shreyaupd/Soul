import { useState } from 'react';
import { Loader2, Heart } from 'lucide-react';
import { useSelector,useDispatch } from 'react-redux';
import { addToCollection,removeFromCollection } from '../redux/features/collectionSlice';

const ResultCard = ({item}) => {
  const loading = useSelector((state) => state.search.loading);
  const [imageLoaded, setImageLoaded] = useState(false);

const dispatch = useDispatch();
const collectionItems = useSelector((state)=>state.collection.items) //store the currnt item after rerender(after  useselector runs)
const isSaved = collectionItems.some(colItem => colItem.id === item.id); //returns true or false after looping through every itm in collectionItem to find the colletionitem whose id is === item.id(urrent item to chek if its already saved)

  const handleClick = () => {
    if(item.type === "video"){
      window.open(item.url, "_blank");
    }
  }

  if (item.empty) {
    return (
      <div className="rounded-xl border-2 border-black overflow-hidden shadow-md bg-gray-50 flex items-center justify-center h-72">
        <p className="text-gray-400 text-sm text-center px-4">
          {item.description}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-black overflow-hidden shadow-md bg-white cursor-pointer" onClick={handleClick}>

      {/* media section */}
      <div className="h-72 border-b-2 border-gray-600 relative flex items-center justify-center bg-gray-100">
        {(!imageLoaded || loading) ? (
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        ) : null}
        <img
          src={item.image}
          alt={item.description}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* content section */}
      <div className="p-3 flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="text-gray-700 text-sm leading-snug line-clamp-2">
          {item.description}
        </p>

        {item.author && (
          <p className="text-gray-400 text-xs mt-2">
            {item.author}
          </p>
        )}
        </div>
        <div className="mt-2 mr-0">
          <Heart
            className={`cursor-pointer ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            onClick={() => {
              if (isSaved) {
                dispatch(removeFromCollection(item.id));
              } else {
                dispatch(addToCollection(item));
              }
            }}
          />
        </div>
      </div>

    </div>
  )
}

export default ResultCard;
