import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsAPI from '../services/DetailsAPI';
import BraceletsAPI from '../services/BraceletsAPI';
import NecklacesAPI from '../services/NecklacesAPI';
import RingsAPI from '../services/RingsAPI';
import EarringsAPI from '../services/EarringsAPI';
import JewelrySetsAPI from '../services/JewelrySetsAPI';
import BraceletCard from '../components/Cards/BraceletCard';
import RingCard from '../components/Cards/RingCard';
import NecklaceCard from '../components/Cards/NecklaceCard';
import EarringsCard from '../components/Cards/EarringsCard';
import '../App.css';

const ViewJewelrySetDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [stoneValue, setStoneValue] = useState([]);
  const [charmValue, setCharmValue] = useState([]);
  const [earringStyleValue, setEarringStyleValue] = useState([]);
  const [materialValue, setMaterialValue] = useState([]);
  const [braceletValue, setBraceletValue] = useState([]);
  const [necklaceValue, setNecklaceValue] = useState([]);
  const [ringValue, setRingValue] = useState([]);
  const [earringsValue, setEarringsValue] = useState([]);
  const [jewelrySetValue, setJewelrySetValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return isNaN(d) ? String(timestamp) : d.toLocaleString();
  };

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

  const deleteJewelrySet = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this jewelry set?')) return;
    try {
      setIsLoading(true);
      await JewelrySetsAPI.deleteJewelrySet(id);
      navigate('/'); 
    } catch (error) {
      console.error('Failed to delete jewelry set', error);
      alert('Failed to delete jewelry set. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const editJewelrySet = (id) => {
    if (!id) return;
    console.log("Editing set", id);
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          stones,
          charms,
          earringStyles,
          materials,
          bracelets,
          necklaces,
          rings,
          earrings,
          jewelrySetRes,
        ] = await Promise.all([
          DetailsAPI.getAllStones(),
          DetailsAPI.getAllCharms(),
          DetailsAPI.getAllEarringStyles(),
          DetailsAPI.getAllMaterials(),
          BraceletsAPI.getAllBraceletsDesigns(),
          NecklacesAPI.getAllNecklaceDesigns(),
          RingsAPI.getAllRingDesigns(),
          EarringsAPI.getAllEarringDesigns(),
          JewelrySetsAPI.getJewelrySetById(id),
        ]);

        setStoneValue(stones || []);
        setCharmValue(charms || []);
        setEarringStyleValue(earringStyles || []);
        setMaterialValue(materials || []);
        setBraceletValue(bracelets || []);
        setNecklaceValue(necklaces || []);
        setRingValue(rings || []);
        setEarringsValue(earrings || []);
        setJewelrySetValue(jewelrySetRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  if (isLoading) return <div>Loading jewelry set details...</div>;

  if (!jewelrySetValue) return <div>No jewelry set found.</div>;

  const bId = jewelrySetValue.braceletid ? jewelrySetValue.braceletid - 1 : null;
  const nId = jewelrySetValue.necklaceid ? jewelrySetValue.necklaceid - 1 : null;
  const rId = jewelrySetValue.ringid ? jewelrySetValue.ringid - 1 : null;
  const eId = jewelrySetValue.earringid ? jewelrySetValue.earringid - 1 : null;

  const braceletItem = bId != null ? enrich(braceletValue[bId]) : null;
  const necklaceItem = nId != null ? enrich(necklaceValue[nId]) : null;
  const ringItem = rId != null ? enrich(ringValue[rId]) : null;
  const earringsItem = eId != null ? enrich(earringsValue[eId]) : null;

  return (
    <div
      className="view-jewelry-sets"
      style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 20 }}
    >
      <div
        key={jewelrySetValue.id}
        className="jewelry-set"
        style={{
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 8,
          padding: 16,
          background: 'rgba(255,255,255,0.9)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: 0, color: 'black' }}>
            {jewelrySetValue.name?.toUpperCase()}
          </h3>
          <div style={{ fontWeight: 700, fontSize: 20, color: 'black' }}>
            {jewelrySetValue.price != null ? `$${jewelrySetValue.price}` : '—'}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <strong>Created</strong>
            <p>{formatTimestamp(jewelrySetValue.createdon)}</p>
            <strong>Modified</strong>
            <p>{formatTimestamp(jewelrySetValue.modifiedon)}</p>
          </div>
          <div style={{ display: 'flex', flexDirection:'row', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {braceletItem && <BraceletCard data={braceletItem} keyId={bId + 1} size="100" />}
          {necklaceItem && <NecklaceCard data={necklaceItem} keyId={nId + 1} size="100" />}
          {ringItem && <RingCard data={ringItem} keyId={rId + 1} size="100" />}
          {earringsItem && <EarringsCard data={earringsItem} keyId={eId + 1} size="100" />}
          </div>
        </div>

        <div
          className="button-section"
          style={{
            padding: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10%',
          }}
        >
          <button
            onClick={() => editJewelrySet(id)}
            style={{
              background: 'rgba(23, 42, 58, 1)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              border: 'none',
              padding: '15px 25px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.border = '2px solid rgba(23, 42, 58, 1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(23, 42, 58, 1)';
              e.currentTarget.style.border = 'none';
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteJewelrySet(id)}
            style={{
              background: '#FF0000',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              border: 'none',
              padding: '15px 25px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.border = '2px solid #FF0000';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#FF0000';
              e.currentTarget.style.border = 'none';
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewJewelrySetDetail;
