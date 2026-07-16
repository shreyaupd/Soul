const ResultCard = ({item}) => {
 const handleClick = () => {
    if(item.type === "video"){
      window.open(item.url, "_blank");
    }
  }
  return (
    <div className="rounded-xl border-2 border-black overflow-hidden shadow-md bg-white"  onClick={handleClick}>

        {/* media section */}
        <div className="h-65 border-b-gray-600 border-b-2">
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
            />
        </div>


        {/* content section */}
        <div className="p-4">

            <h2 className="font-bold text-lg">
                {item.title}
            </h2>


            <p className="text-gray-500 text-sm">
                {item.description}
            </p>


            <div className="flex justify-between mt-3">

                <span>
                    {item.author}
                </span>

            </div>

        </div>

    </div>
  )
}

export default ResultCard;