import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Navigation from './components/Navigation';
import DetailsAPI from './services/DetailsAPI';
import BraceletsAPI from './services/BraceletsAPI';
import BraceletCard from './components/Cards/BraceletCard';
import './App.css';
import ViewJewelrySets from './pages/ViewJewelrySets';
import CreateJewelryPiece from './pages/CreateJewelryPiece';

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateJewelryPiece title="Serena's Auréline | Create" />
    },
    {
      path:'/jewelrysets',
      element: <ViewJewelrySets title="Serena's Auréline | View All"/>
    },
    {
      path:'/create/bracelet',
      element: <CreateJewelryPiece itemId={0} title="Serena's Auréline | Create A Bracelet"/>
    },
    {
      path:'/create/necklace',
      element: <CreateJewelryPiece itemId={2} title="Serena's Auréline | Create A Necklace"/>
    },
    {
      path:'/create/ring',
      element: <CreateJewelryPiece itemId={3} title="Serena's Auréline | Create A Ring"/>
    },
    {
      path:'/create/earring',
      element: <CreateJewelryPiece itemId={2} title="Serena's Auréline | Create A Earring"/>
    }
    
  ]);
  return (
    <div className="app">
      <Navigation />
      {element}
    </div>
  );
};

export default App;
