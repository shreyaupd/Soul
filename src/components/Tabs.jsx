import {useDispatch, useSelector} from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice.js'
const Tabs = () => {
  const tabs=[
    {key:'photos', label:'Photos'},
    {key:'videos', label:'Videos'},
    {key:'gifs', label:'Gifs'}
  ]
  const dispatch = useDispatch()
  const activeTab= useSelector((state)=>state.search.activeTab ) //photos
  return (
    <div className="flex justify-center gap-15">
     {/* tabs.map(({key, label})=> */}
      {tabs.map((tab)=>(
        <button
        key={tab.key}
        onClick={()=>dispatch(setActiveTab(tab.key))}
        className={`px-5 py-2 rounded-full text-sm transition-colors ${activeTab===tab.key? 
               ' bg-white text-orange-800 font-bold shadow-sm'
              : 'bg-white text-gray-600 font-medium border border-gray-300 hover:bg-gray-200'
}`}
        >
          
           {tab.label}
        </button>
      ))}

    </div>
  )
}

export default Tabs