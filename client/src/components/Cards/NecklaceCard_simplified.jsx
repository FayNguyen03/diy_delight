import React from 'react'

const NecklaceCardSimplified = (props) => {
    return (
        <div className="necklace-card" style={{display: "flex", justifyContent: 'center'}}>
            
            {props.data && (
                <div style={{
                    width: "300px",
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
                        justifyContent: "center",
                        gap: "5%",
                        width: 'min(1100px, 95%)'
                        }}
                    >
                        <h3 style={{marginTop:0, color:'black'}}>Necklace {props.keyId}</h3>
                        
                        <div style={{display:'grid', gridTemplateColumns: `${props.size}px 1fr`, rowGap:8, columnGap:12, alignItems:'start'}}>
                            <div style={{display:'flex', flexDirection:'row', gap:'10%'}}>
                                <strong>Material</strong>
                                <p>{props.data.material.name}</p>
                            </div>

                            {props.data.stone && <div style={{display:'flex', flexDirection:'row', gap:'10%'}}><strong>Stone</strong>
                            <p>{props.data.stone.name}</p>
                            </div>}

                            {props.data.charm && <div style={{display:'flex', flexDirection:'row', gap:'10%'}}><strong>Charm</strong>
                            <p>{props.data.charm.name}</p>
                            </div>}

                            <div style={{display:'flex', flexDirection:'row', gap:'10%'}}>
                                <strong>Price</strong>
                                <p style={{color:'black', fontSize:'15px'}}>{
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

export default NecklaceCardSimplified;
