import React, {useState} from 'react'
import RingsAPI from '../../services/RingsAPI';

const RingCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const d = new Date(timestamp);
        return isNaN(d) ? String(timestamp) : d.toLocaleString();
    };
    const deleteRing = async (id) =>{
        if (!id) return;
        if (!window.confirm('Are you sure you want to delete this jewelry piece?')) return;
        try {
            setIsLoading(true);
            await RingsAPI.deleteRingDesign(id);
            window.location = '/jewelrypieces'
        } catch (error) {
            alert('Failed to delete jewelry piece:' + error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="ring-card" style={{display: "flex", justifyContent: 'center'}}>
            
            {props.data && (
                <div style={{
                    width: "400px",
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
                        width: 'min(1100px, 95%)'
                        }}
                    >
                        <h3 style={{marginTop:0, color:'black'}}>Ring {props.keyId}</h3>
                        
                        <div style={{display:'grid', gridTemplateColumns: `150px 1fr`, rowGap:20, columnGap:20, alignItems:'start'}}>
                            <strong>Created</strong><p>{formatTimestamp(props.data.createdon)}</p>
                            <strong>Modified</strong><p>{formatTimestamp(props.data.modifiedon)}</p>

                            <strong>Material</strong>
                            <div style = {{
                                backgroundImage: `url(${props.data.material.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: `${props.size}px`,
                                height: `${props.size}px`,
                                border: "2px solid rgba(23, 42, 58, 1)",
                                cursor: "pointer",
                                borderRadius: "10%",
                                transition: "transform 0.18s ease, box-shadow 0.18s ease, border 0.12s ease",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                            </div>

                            {props.data.stone && <div style={{display:'flex', flexDirection:'column', gap:'10%', alignItems: 'center'}}><strong>Stone</strong>
                            <div style = {{
                                backgroundImage: `url(${props.data.stone.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: `${props.size}px`,
                                height: `${props.size}px`,
                                border: "2px solid rgba(23, 42, 58, 1)",
                                borderRadius: "10%",
                                transition: "transform 0.18s ease, box-shadow 0.18s ease, border 0.12s ease",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                            </div></div>}

                                <div style={{display:'flex', flexDirection:'row', gap:'10%'}}>
                                    <strong>Engraving</strong>
                                    <input type="checkbox" disabled checked={props.data.engraving}/>
                                </div>
                            
                                {props.data.engraving && props.data.engravingcontent &&
                                    <div style={{display:'flex', flexDirection:'row', gap:'10%'}}><strong>Content</strong><p>{props.data.engravingcontent}</p></div>}
                            <div></div>
                            <div style={{display:'flex', flexDirection:'column', gap:'10%'}}>
                                <strong>Price</strong>
                                <p style={{color:"black"}}>{
                                    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.data.price)
                                    }
                                </p>
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
                            onClick={() => deleteRing(props.data.id)}
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
            )}
        </div>
    )
}

export default RingCard;
