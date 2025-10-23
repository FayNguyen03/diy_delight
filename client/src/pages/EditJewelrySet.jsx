import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsAPI from '../services/DetailsAPI';
import BraceletsAPI from '../services/BraceletsAPI';
import NecklacesAPI from '../services/NecklacesAPI';
import RingsAPI from '../services/RingsAPI';
import EarringsAPI from '../services/EarringsAPI';
import JewelrySetsAPI from '../services/JewelrySetsAPI';
import BraceletCardSimplified from '../components/Cards/BraceletCard_simplified';
import NecklaceCardSimplified from '../components/Cards/NecklaceCard_simplified';
import RingCardSimplified from '../components/Cards/RingCard_simplified';
import EarringCardSimplified from '../components/Cards/EarringsCard_simplified';
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
                onClick={() => onSelect(item.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(item.id); }}
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
                <Card data={item} keyId={item.id}/>
            </div>
            )
        }) : (
            <div style={{ padding: 12, color: '#6b7280' }}>No items</div>
        )}
    </div>
  );
};

const EditJewelrySet = (props) => {
    const { id } = useParams();
    const [braceletValue, setBraceletValue] = useState([]);
    const [necklaceValue, setNecklaceValue] = useState([]);
    const [ringValue, setRingValue] = useState([]);
    const [earringsValue, setEarringsValue] = useState([]);
    const [stoneValue, setStoneValue] = useState([]);
    const [charmValue, setCharmValue] = useState([]);
    const [earringStyleValue, setEarringStyleValue] = useState([]);
    const [materialValue, setMaterialValue] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [selectedBracelet, setSelectedBracelet] = useState(null);
    const [selectedNecklace, setSelectedNecklace] = useState(null);
    const [selectedRing, setSelectedRing] = useState(null);
    const [selectedEarrings, setSelectedEarrings] = useState(null);

    const [currentBracelet, setCurrentBracelet] = useState(null);
    const [currentEarrings, setCurrentEarrings] = useState(null);
    const [currentNecklace, setCurrentNecklace] = useState(null);
    const [currentRing, setCurrentRing] = useState(null);
    const [currentName, setCurrentName] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);


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
        const fetchCurrentSet = async (id) =>{
          try {
              const currentSet = await JewelrySetsAPI.getJewelrySetById(id);
              if (!currentSet) {
                console.error("No data returned for set ID:", id);
                return;
              }

              setCurrentBracelet(currentSet.braceletid);
              setCurrentNecklace(currentSet.necklaceid);
              setCurrentRing(currentSet.ringid);
              setCurrentEarrings(currentSet.earringid);
              setCurrentName(currentSet.name);
              setCurrentPrice(currentSet.price);

              setSelectedBracelet(currentSet.braceletid);
              setSelectedNecklace(currentSet.necklaceid);
              setSelectedRing(currentSet.ringid);
              setSelectedEarrings(currentSet.earringid);
              setName(currentSet.name);
              setPrice(currentSet.price);
            } catch (error) {
              console.error("Failed to fetch current jewelry set:", error);
            }
        };

        fetchAll();
        fetchCurrentSet(id);

    }, []);

    const atLeastOneSelected = () => {
        return !!(selectedBracelet !== null || selectedNecklace !== null|| selectedRing !== null || selectedEarrings !== null);
    };

  const handleEdit = async () => {
    if (!atLeastOneSelected()) {
      alert('Please select at least one piece for the set.');
      return;
    }

    const payload = {
      name: name?.trim() || `Set ${Date.now()}`,
      price: price !== '' ? Number(price) : null,
      braceletId: selectedBracelet,
      necklaceId: selectedNecklace,
      ringId: selectedRing,
      earringId: selectedEarrings
    };

    try {
      setIsLoading(true);
      await JewelrySetsAPI.updateJewlerySet(payload, id);
      alert(`You edited the ${payload.name} jewelry set.`);
    } catch (err) {
      console.error('Edit jewelry set failed', err);
      alert('Edit failed. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () =>{
    setSelectedBracelet(currentBracelet);
    setSelectedNecklace(currentNecklace);
    setSelectedRing(currentRing);
    setSelectedEarrings(currentEarrings);
    setName(currentName);
    setPrice(currentPrice);
  }
  useEffect(() => {
    const handlePrice = () => {
      let currentPrice = 0;

      if (selectedBracelet) {
        const found = braceletValue.find(x => x.id === selectedBracelet);
        if (found?.price) currentPrice += Number(found.price);
      }
      if (selectedEarrings) {
        const found = earringsValue.find(x => x.id === selectedEarrings);
        if (found?.price) currentPrice += Number(found.price);
      }
      if (selectedNecklace) {
        const found = necklaceValue.find(x => x.id === selectedNecklace);
        if (found?.price) currentPrice += Number(found.price);
      }
      if (selectedRing) {
        const found = ringValue.find(x => x.id === selectedRing);
        if (found?.price) currentPrice += Number(found.price);
      }

      setPrice(currentPrice);
    };

    handlePrice();
  }, [selectedBracelet, selectedEarrings, selectedNecklace, selectedRing, braceletValue, earringsValue, necklaceValue, ringValue]);

  

  if (isLoading) return <div style={{padding:20}}>Loading…</div>;

    return (
    <div style={{ padding: 20, display: 'grid', gap: "20px"}}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Edit Jewelry Set {id}</h2>
        <p style={{ color: 'white', fontSize:'20px' }}>Choose up to one instance per type</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 20 }}>
        <div style={colStyle}>
          <div>
            <label ><strong style={{color:'white'}}>Name</strong></label>
            <input value={name} required onChange={(e) => setName(e.target.value)} maxLength={50} placeholder="e.g. Spring Trio" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e6e6e6' }} />
          </div>

          <div>
            <label ><strong style={{color:'white'}}>Price ($)</strong></label>
            <input value={price} required onChange={(e) => setPrice(e.target.value)} type="number" placeholder="0.00" min={0} style={{ width: '160px', padding: 8, borderRadius: 6, border: '1px solid #e6e6e6' }} />
          </div>

          <div style={{ marginTop: 8 }}>
            <strong style={{color: 'white', fontSize:'20px'}}>Pick a Bracelet (optional)</strong>
            <CardGrid data={braceletValue} Card={BraceletCardSimplified} selected={selectedBracelet} onSelect={setSelectedBracelet}   materialValue={materialValue} charmValue={charmValue} stoneValue={stoneValue} earringStyleValue={earringStyleValue}/>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong style={{color: 'white', fontSize:'20px'}}>Pick a Necklace (optional)</strong>
            <CardGrid data={necklaceValue} Card={NecklaceCardSimplified} selected={selectedNecklace} onSelect={setSelectedNecklace} materialValue={materialValue} charmValue={charmValue} stoneValue={stoneValue} earringStyleValue={earringStyleValue}/>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong style={{color: 'white', fontSize:'20px'}}>Pick a Ring (optional)</strong>
            <CardGrid data={ringValue} Card={RingCardSimplified} selected={selectedRing} onSelect={setSelectedRing} materialValue={materialValue} charmValue={charmValue} stoneValue={stoneValue} earringStyleValue={earringStyleValue}/>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong style={{color: 'white', fontSize:'20px'}}>Pick Earrings (optional)</strong>
            <CardGrid data={earringsValue} Card={EarringCardSimplified} selected={selectedEarrings} onSelect={setSelectedEarrings} materialValue={materialValue} charmValue={charmValue} stoneValue={stoneValue} earringStyleValue={earringStyleValue}/>
          </div>

          <div className="button-section" style={{
                padding: "30px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "10%",
            }}>
                <button
                    onClick={handleEdit}
                    style={{
                        background: "rgba(23, 42, 58, 1)",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "18px",
                        border: "none",
                        padding: "15px 25px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "transparent", e.currentTarget.style.border = "2px solid rgba(23, 42, 58, 1)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "rgba(23, 42, 58, 1)", e.currentTarget.style.border = "none")}
                >
                    Edit
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        background: "#C6AC8F",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "18px",
                        border: "none",
                        padding: "15px 25px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "transparent", e.currentTarget.style.border = "2px solid #C6AC8F")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "#C6AC8F", e.currentTarget.style.border = "none")}
                >
                    Reset
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditJewelrySet;