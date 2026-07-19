import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const ResultCard = ({item}) => {
  const loading = useSelector((state) => state.search.loading);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      <div className="p-3">
        <p className="text-gray-700 text-sm leading-snug line-clamp-2">
          {item.description}
        </p>

        {item.author && (
          <p className="text-gray-400 text-xs mt-2">
            {item.author}
          </p>
        )}
      </div>

    </div>
  )
}

export default ResultCard;
