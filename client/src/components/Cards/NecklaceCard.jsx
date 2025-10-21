import React from 'react'

const NecklaceCard = (props) => {
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
                        <h3 style={{marginTop:0}}>Bracelet {props.keyId}</h3>
                        
                        <div style={{display:'grid', gridTemplateColumns: '100px 1fr', rowGap:8, columnGap:12, alignItems:'start'}}>
                            <strong>Created</strong><span>{formatTimestamp(props.data.createdOn)}</span>
                            <strong>Modified</strong><span>{formatTimestamp(props.data.modifiedOn)}</span>

                            <strong>Material</strong>
                            <div style = {{
                                backgroundImage: `url(${props.data.material.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100px',
                                height: '100px',
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
                                width: '100px',
                                height: '100px',
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
                                width: '100px',
                                height: '100px',
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

                            <strong>Price</strong>
                            <p>{
                                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.data.price)
                                }
                            </p>
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
                                style={{
                                    background: "#FF0000",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    border: "none",
                                    padding: "15px 25px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = "transparent", e.currentTarget.style.border = "2px solid #FF0000")}
                                onMouseOut={(e) => (e.currentTarget.style.background = "#FF0000", e.currentTarget.style.border = "none")}
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

export default NecklaceCard;
