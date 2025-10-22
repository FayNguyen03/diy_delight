import React from 'react'

const BraceletCard = (props) => {
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const d = new Date(timestamp);
        return isNaN(d) ? String(timestamp) : d.toLocaleString();
    };
    return (
        <div className="bracelet-card" style={{display: "flex", justifyContent: 'center'}}>
            
            {props.data && (
                <div style={{
                    width: "100%",
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
                        <h3 style={{marginTop:0, color:'black'}}>Bracelet {props.keyId}</h3>
                        
                        <div style={{display:'grid', gridTemplateColumns: `${props.size}px 1fr`, rowGap:8, columnGap:12, alignItems:'start'}}>
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

                            <strong>Stone</strong>
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
                            </div>

                            <strong>Charm</strong>
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
                            </div>

                            <strong>Engraving</strong>
                            <input type="checkbox" checked={props.data.engraving}/>
                            
                            {props.data.engraving &&
                                <><input type="text" disabled checked={props.data.engravingContent}/></>}

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
