import { useSelector } from 'react-redux';
import ResultCard from '../components/ResultCard';

const CollectionPage = () => {
  const items = useSelector((state) => state.collection.items);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-2xl font-semibold">No saved items</p>
        <p className="text-sm mt-2">Click the heart on any photo to save it here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <ResultCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CollectionPage;