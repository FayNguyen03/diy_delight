import React, {useState} from 'react'
import BraceletsAPI from '../../services/BraceletsAPI';
const BraceletCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const d = new Date(timestamp);
        return isNaN(d) ? String(timestamp) : d.toLocaleString();
    };

    const deleteBracelet = async (id) =>{
            if (!id) return;
            if (!window.confirm('Are you sure you want to delete this jewelry piece?')) return;
            try {
                setIsLoading(true);
                await BraceletsAPI.deleteBraceletDesign(id);
                window.location = '/jewelrypieces'
            } catch (error) {
                alert('Failed to delete jewelry piece:' + error);
            } finally {
                setIsLoading(false);
            }
        }
    return (
        <div className="bracelet-card" style={{display: "flex", justifyContent: 'center'}}>
            
            {props.data && (
                <div style={{
                    width: "300px",
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
                        justifyContent: "center",
                        gap: "5%",
                        width: 'min(1100px, 95%)'
                        }}
                    >
                        <h3 style={{marginTop:0, color:'black'}}>Bracelet {props.keyId}</h3>
                        
                        <div style={{display:'grid', gridTemplateColumns: `${props.size}px 1fr`, rowGap:8, columnGap:12, alignItems:'start'}}>
                            <strong>Created</strong><p>{formatTimestamp(props.data.createdon)}</p>
                            <strong>Modified</strong><p>{formatTimestamp(props.data.modifiedon)}</p>
                            <strong>Material</strong>
                            <div style={{display:'flex', flexDirection:'column', gap:'10%'}}><div style = {{
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
                            </div></div>

                            {props.data.stone && <div style={{display:'flex', flexDirection:'column', gap:'10%'}}><strong>Stone</strong>
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

                            {props.data.charm && <div style={{display:'flex', flexDirection:'column', gap:'10%'}}><strong>Charm</strong>
                            <div style = {{
                                backgroundImage:  `url(${props.data.charm.img})`,
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
                            </div></div>}

                            <div style={{display:'flex', flexDirection:'row', gap:'10%'}}>
                                <strong>Engraving</strong>
                                <input type="checkbox" disabled checked={props.data.engraving}/>
                             </div>

                            {props.data.engraving &&
                                <div style={{display:'flex', flexDirection:'row', gap:'10%'}}><strong>Content</strong><strong>Content</strong><p>{props.data.engravingcontent}</p></div>}

                            <strong>Price</strong>
                            <p style={{color:"black"}}>{
                                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.data.price)
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BraceletCard;
