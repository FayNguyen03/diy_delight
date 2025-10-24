import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailsAPI from '../services/DetailsAPI';
import BraceletsAPI from '../services/BraceletsAPI';
import NecklacesAPI from '../services/NecklacesAPI';
import RingsAPI from '../services/RingsAPI';
import EarringsAPI from '../services/EarringsAPI';
import JewelrySetsAPI from '../services/JewelrySetsAPI';
import BraceletCard from '../components/Cards/BraceletCard';
import NecklaceCard from '../components/Cards/NecklaceCard';
import RingCard from '../components/Cards/RingCard';
import EarringCard from '../components/Cards/EarringsCard';
import '../App.css';

const colStyle = { display: 'flex', flexDirection: 'column', gap: 12 };
const previewStyle = { display: 'flex', gap: 12, alignItems: 'center' };
const placeholder = { width: 100, height: 100, borderRadius: 8, background: '#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', color:'#6b7280' };

const CardGrid = ({ data = [], Card, selected, onSelect, materialValue, stoneValue, charmValue, earringStyleValue }) => {
    const enrich = (item) => {
        if (!item) return null;
        return {
            ...item,
            material: materialValue[item.material - 1] ?? null,
            stone: stoneValue[item.stone - 1] ?? null,
            charm: charmValue[item.charm - 1] ?? null,
            earringstyle: earringStyleValue[item.earringstyle - 1] ?? null,
          };
    };
    return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: 20,
        alignItems: 'start',
        justifyContent: 'center',
        marginTop: 8
        }}>
        {Array.isArray(data) && data.length > 0 ? data.map((item, idx) => {
            const isSelected = (selected !== null) && (selected === Number(item.id));
            item = enrich(item);
            return (
            <div
                key={item.id}
                role="button"
                tabIndex={0}
                style={{
                padding: 8,
                borderRadius: 10,
                border: isSelected ? '3px solid rgba(16, 185, 129, 0.9)' : '1px solid rgba(0,0,0,0.06)',
                boxShadow: isSelected ? '0 8px 20px rgba(16,185,129,0.08)' : 'none',
                cursor: 'pointer',
                background: '#fff',
                display: 'flex',
                justifyContent: 'center',
                }}
                aria-pressed={isSelected}
                aria-label={item.name ?? `item-${item.id}`}
            >
                <Card data={item} keyId={item.id} size="100"/>
            </div>
            )
        }) : (
            <div style={{ padding: 12, color: '#6b7280' }}>No items</div>
        )}
    </div>
  );
};

const ViewJewelryPieces = () => {
    const navigate = useNavigate();
    const [braceletValue, setBraceletValue] = useState([]);
    const [necklaceValue, setNecklaceValue] = useState([]);
    const [ringValue, setRingValue] = useState([]);
    const [earringsValue, setEarringsValue] = useState([]);
    const [stoneValue, setStoneValue] = useState([]);
    const [charmValue, setCharmValue] = useState([]);
    const [earringStyleValue, setEarringStyleValue] = useState([]);
    const [materialValue, setMaterialValue] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
        try {
            const [stones, charms, earringStyles, materials, bracelets, necklaces, rings, earrings] 
            = await Promise.all([
            DetailsAPI.getAllStones(),
            DetailsAPI.getAllCharms(),
            DetailsAPI.getAllEarringStyles(),
            DetailsAPI.getAllMaterials(),
            BraceletsAPI.getAllBraceletsDesigns(),
            NecklacesAPI.getAllNecklaceDesigns(),
            RingsAPI.getAllRingDesigns(),
            EarringsAPI.getAllEarringDesigns()
            ]);

            setBraceletValue(bracelets || []);
            setNecklaceValue(necklaces || []);
            setRingValue(rings || []);
            setEarringsValue(earrings || []);
            setStoneValue(stones || []);
            setCharmValue(charms || []);
            setEarringStyleValue(earringStyles || []);
            setMaterialValue(materials || []);
        } catch (err) {
            console.error('fetch error', err);
        } finally {
            setIsLoading(false);
        }
        };

        fetchAll();
    }, []);

  if (isLoading) return <div style={{padding:20}}>Loading…</div>;

    return (
    <div style={{ padding: 20, display: 'grid', gap: "20px"}}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 20 }}>
        <div style={colStyle}>
          <div style={{ marginTop: 8 }}>
            <strong style={{color: 'white', fontSize:'20px'}}>Bracelets</strong>
            <CardGrid data={braceletValue} Card={BraceletCard} materialValue={materialValue} charmValue={charmValue} stoneValue={stoneValue} earringStyleValue={earringStyleValue}/>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong style={{color: 'white', fontSize:'20px'}}>Necklaces</strong>
            <CardGrid data={necklaceValue} Card={NecklaceCard} materialValue={materialValue} charmValue={charmValue} stoneValue={stoneValue} earringStyleValue={earringStyleValue}/>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong style={{color: 'white', fontSize:'20px'}}>Rings</strong>
            <CardGrid data={ringValue} Card={RingCard} materialValue={materialValue} charmValue={charmValue} stoneValue={stoneValue} earringStyleValue={earringStyleValue}/>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong style={{color: 'white', fontSize:'20px'}}>Earrings</strong>
            <CardGrid data={earringsValue} Card={EarringCard} materialValue={materialValue} charmValue={charmValue} stoneValue={stoneValue} earringStyleValue={earringStyleValue}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJewelryPieces;