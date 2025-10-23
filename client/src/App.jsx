import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';
import ViewJewelrySets from './pages/ViewJewelrySets';
import CreateJewelryPiece from './pages/CreateJewelryPiece';
import CreateJewelrySet from './pages/CreateJewelrySet';
import EditJewelrySet from './pages/EditJewelrySet';
import ViewJewelrySetDetail from './pages/ViewJewelrySetDetail';
import ViewJewelryPieces from './pages/ViewJewelryPieces';

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateJewelrySet title="Serena's Auréline | Create" />
    },
    {
      path:'/jewelrysets',
      element: <ViewJewelrySets title="Serena's Auréline | View All"/>
    },
    {
      path:'/jewelrysets/:id',
      element: <ViewJewelrySetDetail title="Serena's Auréline | View "/>
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
      element: <CreateJewelryPiece itemId={1} title="Serena's Auréline | Create A Earring"/>
    },
    {
      path:'/jewelrypieces',
      element: <ViewJewelryPieces title="Serena's Auréline | View All"/>
    },
    {
      path:'/edit/:id',
      element: <EditJewelrySet title="Serena's Auréline | Edit"/>
    },
    {
      path:'/jewelryset/:id',
      element: <EditJewelrySet title="Serena's Auréline | View A Jewelry"/>
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
