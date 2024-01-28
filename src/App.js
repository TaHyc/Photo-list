import React from 'react';
import {Collection} from './Collection';
import './index.scss';


function App() {
  
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedId, setSelectedId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

  React.useEffect(()=>{
    setIsLoading(true)
     fetch(`https://65b561bf41db5efd2867a918.mockapi.io/fotos-database?${selectedId?`category=${selectedId}`:''}`)
    .then((res)=> res.json())
    .then((json)=> {
      setItems(json)
    })
    .catch((err)=>{
    console.warn(err)
    alert('Error')
    })
    .finally(()=>setIsLoading(false))
    },[selectedId])
    


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {cats.map((obj, id) =><li onClick={()=>setSelectedId(id)}
            className={selectedId===id?'active':''}
            key={obj.name}>{obj.name}</li>)}
        </ul>
        <input className="search-input" placeholder="Поиск по названию" 
        value={searchValue} onChange={e=>setSearchValue(e.target.value)}/>
      </div>
      <div className="content">
        {isLoading?(
        <h2>Идет загурзка...</h2>
        ):(
        items
        .filter((obj)=>obj.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((obj,id)=>(<Collection key={id} name={obj.name} images={obj.photos}/>))
        )}
      </div>

    </div>
  );
}

export default App;
