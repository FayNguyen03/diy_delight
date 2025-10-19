import { pool } from "../config/database.js";

const formatCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

//GET earrings/
const getAllEarringDesigns = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM earringDesign ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
} 

//GET earrings/:id
const getEarringDesignById = async (req, res) =>{
    try{
        const selectQuery = `
            SELECT createdOn, modifiedOn, material, earringStyle, leftEarring, rightEarring, stone, price
            FROM earringDesign
            WHERE id=$1`;
        const earringDesignId = req.params.id;
        const results = await pool.query(selectQuery, [earringDesignId]);
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message} );
    }   
};

//POST earrings/
const createEarringDesign = async (req, res) =>{
    try{
        const { material, earringStyle, leftEarring, rightEarring, stone, price } = req.query;
        const currentTime = formatCurrentDateTime();
        const results = await pool.query(`
            INSERT INTO earringDesign (createdOn, modifiedOn, material, earringStyle, leftEarring, rightEarring, stone, price)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [currentTime, currentTime, material, earringStyle, leftEarring, rightEarring, stone, price]
        );
        res.status(201).json(results.rows[0]);
    }
    catch(error)
    {
        res.status(409).json( { error: error.message } );
    }
};

//PATCH earrings/:id
const updateEarringDesign = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const currentTime = formatCurrentDateTime();
        const { material, earringStyle, leftEarring, rightEarring, stone, price } = req.query;
        const results = await pool.query(`
            UPDATE earringDesign SET modifiedOn = $1, material = $2, earringStyle = $3, leftEarring = $4, rightEarring = $5, stone = $6, price= $7 WHERE id = $8`,
            [currentTime, material, earringStyle, leftEarring, rightEarring, stone, price, id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

//DELETE earrings/:id
const deleteEarringDesign = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM earringDesign WHERE id = $1', [id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

export default {getAllEarringDesigns, getEarringDesignById, createEarringDesign, updateEarringDesign, deleteEarringDesign};