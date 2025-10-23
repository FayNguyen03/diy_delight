import React from 'react'

const RingCardSimplified = (props) => {
    return (
        <div className="ring-card" style={{display: "flex", justifyContent: 'center'}}>
            
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
                        <h3 style={{marginTop:0, color:'black'}}>Ring {props.keyId}</h3>
                        
                        <div style={{display:'grid', gridTemplateColumns: `${props.size}px 1fr`, rowGap:8, columnGap:12, alignItems:'start'}}>
                            <div style={{display:'flex', flexDirection:'row', gap:'10%'}}>
                                <strong>Material</strong>
                                <p>{props.data.material.name}</p>
                            </div>

                            {props.data.stone && <div style={{display:'flex', flexDirection:'row', gap:'10%'}}><strong>Stone</strong> 
                            <p>{props.data.stone.name}</p></div>}

                            <div style={{display:'flex', flexDirection:'row', gap:'10%'}}>
                                <strong>Engraving</strong>
                                <input type="checkbox" disabled checked={props.data.engraving}/>
                            </div>

                            {props.data.engraving && props.data.engravingcontent &&
                                <div style={{display:'flex', flexDirection:'row', gap:'10%'}}><strong>Content</strong><p>{props.data.engravingcontent}</p></div>}

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

export default RingCardSimplified;
