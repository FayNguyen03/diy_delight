import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import DetailsAPI from './services/DetailsAPI';
import BraceletsAPI from './services/BraceletsAPI';
import BraceletCard from './components/BraceletCard';
import './App.css';

const App = () => {
  const [stoneValue, setStoneValue] = useState([]);
  const [charmValue, setCharmValue] = useState([]);
  const [earringStyleValue, setEarringStyleValue] = useState([]);
  const [materialValue, setMaterialValue] = useState([]);
  const [braceletData, setBraceletData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all details
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [stones, charms, earringStyles, materials, bracelet] = await Promise.all([
          DetailsAPI.getAllStones(),
          DetailsAPI.getAllCharms(),
          DetailsAPI.getAllEarringStyles(),
          DetailsAPI.getAllMaterials(),
          BraceletsAPI.getBraceletById(1),
        ]);

        setStoneValue(stones);
        setCharmValue(charms);
        setEarringStyleValue(earringStyles);
        setMaterialValue(materials);
        setBraceletData(bracelet);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (isLoading) return <div>Loading bracelet details...</div>;

  // Ensure data is available
  if (!braceletData) return <div>Failed to load bracelet data.</div>;

  const braceletValue = {
    material: materialValue[braceletData.material - 1] || {},
    stone: stoneValue[braceletData.stone - 1] || {},
    charm: charmValue[braceletData.charm - 1] || {},
    engraving: braceletData.engraving,
    engravingContent: braceletData.content,
    createdOn: braceletData.createdon,
    modifiedOn: braceletData.modifiedon,
    price: braceletData.price,
  };

  console.log(braceletValue);
  return (
    <div className="app">
      <Navigation />
      <BraceletCard data={braceletValue} keyId={1}/>
    </div>
  );
};

export default App;
