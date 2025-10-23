import React from 'react'

const NecklaceCard = (props) => {
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const d = new Date(timestamp);
        return isNaN(d) ? String(timestamp) : d.toLocaleString();
    };
    return (
        <div className="necklace-card" style={{display: "flex", justifyContent: 'center'}}>
            
            {props.data && (
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div
                        style={{
                        background: "rgba(234, 224, 214, 0.2)",
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
                        <h3 style={{marginTop:0, color:'black'}}>Necklace {props.keyId}</h3>
                        
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
                                <strong>Price</strong>
                                <p style={{color:"black", fontSize:'15px'}}>{
                                    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.data.price)
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NecklaceCard;
