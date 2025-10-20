import React, {useEffect, useState} from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import DetailsAPI from './services/DetailsAPI'
import Selection from './components/Selection'
import './App.css'

const App = () => {
  const [dataValue, setDataValue] = useState([]);
  useEffect(() =>{
    const getData = async () => {
      const data = await DetailsAPI.getAllCharms();
      setDataValue(data);
    };
    getData();
  },[]);
  /*
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCar title='BOLT BUCKET | Customize' />
    },
    {
      path:'/customcars',
      element: <ViewCars title='BOLT BUCKET | Custom Cars' />
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    }
  ]);
  */


  return (
    <div className='app'>

      <Navigation />
      <Selection propertyName="Charms" data={dataValue}/>
      {/*{ element } */}

    </div>
  )
}

export default App