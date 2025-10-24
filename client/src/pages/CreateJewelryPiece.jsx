import React, {useState, useEffect} from 'react'
import Selection from '../components/Selection'
import DetailsAPI from '../services/DetailsAPI'
import BraceletsAPI from '../services/BraceletsAPI'
import NecklacesAPI from '../services/NecklacesAPI'
import RingsAPI from '../services/RingsAPI'
import EarringsAPI from '../services/EarringsAPI'

const CreateJewelryPiece = (props) => { 
    const [stoneValue, setStoneValue] = useState([]);
    const [charmValue, setCharmValue] = useState([]);
    const [earringStyleValue, setEarringStyleValue] = useState([]);
    const [materialValue, setMaterialValue] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [material, setMaterial] = useState(null);
    const [stone, setStone] = useState(null);
    const [charm, setCharm] = useState(null);
    const [earringStyle, setEarringStyle] = useState(null);
    const [leftEarring, setLeftEarring] = useState(false);
    const [rightEarring, setRightEarring] = useState(false);
    const [engraving, setEngraving] = useState(false);
    const [engravingContent, setEngravingContent] = useState("");
    const [price, setPrice] = useState(null);

    const itemId = props.itemId;

    const jewelryPieceNames = ["bracelet", "earrings", "necklace", "ring"];

    const handleCreate = async () =>{

        const detail = { material: material + 1, engraving: Boolean(engraving) };
        if (stone !== null) detail.stone = stone + 1;
        if (charm !== null) detail.charm = charm + 1;
        if (earringStyle !== null) detail.earringStyle = earringStyle + 1;
        if (engraving) detail.engravingContent = engravingContent;
        if (itemId === 1) {
            detail.leftEarring = Boolean(leftEarring);
            detail.rightEarring = Boolean(rightEarring);
        }
        detail.price = price;
        console.log(detail)
        // validation
        if (
            price === null ||
            (itemId === 0 && (material == null || (engraving && !engravingContent?.length)))
            || (itemId === 1 && (material == null || earringStyle == null || (!leftEarring && !rightEarring)))
            || (itemId === 2 && material == null)
            || (itemId === 3 && (material == null || (engraving && !engravingContent?.length)))
        ) {
            alert("Cannot create this piece of jewelry: missing required fields.");
            return;
        }

        try {
            if(itemId === 0){
                await BraceletsAPI.createBraceletDesign(detail);
                alert(`You created a bracelet`);
            } else if(itemId === 1){
                await EarringsAPI.createEarringDesign(detail);
                alert(`You created earrings`);
            } else if(itemId === 2){
                await NecklacesAPI.createNecklaceDesign(detail);
                alert(`You created a necklace`);
            } else if(itemId === 3){
                await RingsAPI.createRingDesign(detail);
                alert(`You created a ring`);
            }
            handleReset();
            window.location = '/jewelrypieces';
        } catch (err) {
            console.error('Create failed', err);
            alert('Create failed. See console for details.');
        }
    }

    const handleReset = () => {
        setMaterial(null);
        setStone(null);
        setCharm(null);
        setEarringStyle(null);
        setLeftEarring(false);
        setRightEarring(false);
        setEngraving(false);
        setEngravingContent("");
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
            const [stones, charms, earringStyles, materials] = await Promise.all([
                DetailsAPI.getAllStones(),
                DetailsAPI.getAllCharms(),
                DetailsAPI.getAllEarringStyles(),
                DetailsAPI.getAllMaterials()            
            ]);

            setStoneValue(stones || []);
            setCharmValue(charms || []);
            setEarringStyleValue(earringStyles || []);
            setMaterialValue(materials || []);
            } catch (error) {
            console.error("Error fetching data:", error);
            } finally {
            setIsLoading(false);
            }
        };

        fetchAllData();
        }, []);

    return (
        <div className="create-jewelry" style={{
            minWidth: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div
                style={{
                background: "rgba(234, 224, 214, 0.5)",
                border: "2px solid rgba(23, 42, 58, 1)",
                borderRadius: "10px",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5%",
                minWidth: '800px'
                }}
            >
                <h2>Let's create a piece of {jewelryPieceNames[itemId]}</h2>
                <div style={{display:'grid', rowGap:10, columnGap:12, alignItems:'start'}}>
                    <div className='material'>
                        <Selection propertyName="Material" selected={material} onSelect={setMaterial} data={materialValue}/>
                    </div>
                    {itemId !== 1 && 
                    <div className='stone'>
                        <Selection propertyName="Stone" selected={stone} onSelect={setStone} data={stoneValue}/>
                    </div>}
                    {itemId === 1 && 
                    <div className='earring-style'>
                        <Selection propertyName="Earring Style" selected={earringStyle} onSelect={setEarringStyle} data={earringStyleValue}/>
                    </div>
                    }
                    {itemId === 1 && 
                    <div className='left-right'>
                        <input type="checkbox" className='left-earing' checked={leftEarring} onChange={(e) => setLeftEarring(e.target.checked)}/><strong>Left Earring</strong>
                        <br />                        
                        <input type="checkbox" className='right-earring'checked={rightEarring} onChange={(e) => setRightEarring(e.target.checked)}/><strong>Right Earring</strong>
                    </div> 
                    }
                    {!(itemId % 2) && 
                    <div className='charm'>
                        <Selection propertyName="Charm" selected={charm} onSelect={setCharm} data={charmValue}/>
                    </div>}
                    {!(itemId % 3) && 
                    <div className='engraving'>
                        <input type="checkbox" className='engraving' checked={engraving} onChange={(e) => setEngraving(e.target.checked)}/><strong>Engraving</strong>
                    </div>}
                    {engraving && 
                    <div className='engraving-content'>
                        <strong>Engraving Content</strong>
                        <br />
                        <input type="text" className='engraving-content' value={engravingContent} maxLength={20} onChange={(e) => setEngravingContent(e.target.value)}/>
                    </div>}
                    <strong>Price</strong>
                    <input type="number" min={1} width="100px" className='price' value={price} onChange={(e) => setPrice(e.target.value)}/>

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
                            onClick={handleCreate}
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
                            Create
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
    )    
};
export default CreateJewelryPiece;
