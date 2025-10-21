import React, {useState, useEffect} from 'react'

const Selection = (props) => {
    const numberElements = props.data ? Math.max(1, Math.floor(props.data.length / 2)) : 1;
    
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);
    
    const handleSelect = (id) => {
        setSelected(id);
    };

    const handleReset = () => {
        setSelected(null);
    };
    
    const handleDone = () => {
        if (selected) alert(`You selected ${props.propertyName} ${selected}`);
        else alert(`Please select a(n) ${props.propertyName}!`);
    };

    return (
        <div className={props.propertyName} style={{display: "flex", justifyContent: 'center'}}>
            
            {props.data?.length > 0 && (
                <div className="selection-box" style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div
                        style={{
                        background: "rgba(234, 224, 214, 0.5)",
                        border: "2px solid rgba(23, 42, 58, 1)",
                        borderRadius: "20px",
                        padding: "30px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5%",
                        width: 'min(1100px, 95%)'
                        }}
                    >
                        <h3>{props.propertyName}</h3>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(${numberElements}, 200px)`,
                                gap: "20px",
                                justifyContent: 'center'
                            }}
                        >
                        {props.data?.map((element, index) => {
                            const keyId = element.id ?? index;
                            const imgUrl = element?.img ? `url("${element.img}")` : undefined;

                            const isHovered = hovered === keyId;
                            const isSelected = selected === keyId;

                            const baseStyle = {
                                backgroundImage: imgUrl,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '200px',
                                height: '200px',
                                border: isSelected ? "3px solid rgba(221, 15, 15, 1)" : "2px solid rgba(23, 42, 58, 1)",
                                cursor: "pointer",
                                borderRadius: "10%",
                                transition: "transform 0.18s ease, box-shadow 0.18s ease, border 0.12s ease",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            };

                            const hoverStyle = isHovered || isSelected ? {
                                transform: 'scale(1.08)',
                                boxShadow: '0 12px 30px rgba(15,23,42,0.35)',
                            } : {
                                transform: 'scale(1)',
                                boxShadow: 'none'
                            };

                            const overlayStyle = {
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                padding: '10px 8px',
                                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)',
                                color: '#fff',
                                textAlign: 'center',
                                transform: isHovered ? 'translateY(0%)' : 'translateY(100%)',
                                opacity: isHovered ? 1 : 0,
                                transition: 'transform 220ms cubic-bezier(.2,.8,.2,1), opacity 180ms ease',
                                pointerEvents: 'none',
                                fontSize: 14,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            };

                            return (
                                <div
                                    key={keyId}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleSelect(keyId)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(keyId) }}
                                    onMouseEnter={() => setHovered(keyId)}
                                    onMouseLeave={() => setHovered(null)}
                                    onFocus={() => setHovered(keyId)}
                                    onBlur={() => setHovered(null)}
                                    style={{...baseStyle, ...hoverStyle}}
                                    aria-label={element?.name ?? `${props.propertyName}-${index}`}
                                >
                                    {!element?.img && <span style={{color:'#6b7280', fontSize:12}}>No image</span>}
                                    <div style={overlayStyle} aria-hidden={!isHovered}>
                                        <span style={{padding: '0 6px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '90%'}}>
                                            {element.name}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
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
                                onClick={handleDone}
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
                                Select
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
            )}
        </div>
    )
}

export default Selection;
