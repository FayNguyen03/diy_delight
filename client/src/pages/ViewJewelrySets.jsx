import React, {useState, useEffect} from 'react'
import JewelrySetsAPI from '../services/JewelrySetsAPI';
import '../App.css'

const ViewJewelrySets = () => {
    const [data, setData] = useState([]);

    useEffect(() ={
        const getData = async () => {
            const data = await JewelrySetsAPI.getAllJewelrySets();
            setDataValue(data);
        };
        getData();
    }, []);

    return (
        <div>
            
        </div>
    )
}

export default ViewJewelrySets;