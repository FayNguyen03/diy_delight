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

//GET earring/
const getAllRingDesigns = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM ringDesign ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
} 

//GET rings/:id
const getRingDesignById = async (req, res) =>{
    try{
        const selectQuery = `
            SELECT createdOn, modifiedOn, material, stone, engraving, engravingContent, price
            FROM ringDesign
            WHERE id=$1`;
        const ringDesignId = req.params.id;
        const results = await pool.query(selectQuery, [ringDesignId]);
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message} );
    }   
};

//POST rings/
const createRingDesign = async (req, res) =>{
    try{
        const { material, stone, engraving, engravingContent, price } = req.query;
        const currentTime = formatCurrentDateTime();
        const results = await pool.query(`
            INSERT INTO ringDesign (createdOn, modifiedOn, material, stone, engraving, engravingContent, price)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [currentTime, currentTime, material, stone, engraving, engravingContent, price]
        );
        res.status(201).json(results.rows[0]);
    }
    catch(error)
    {
        res.status(409).json( { error: error.message } );
    }
};

//PATCH rings/:id
const updateRingDesign = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const currentTime = formatCurrentDateTime();
        const { material, stone, engraving, engravingContent, price } = req.query;
        const results = await pool.query(`
            UPDATE ringDesign SET modifiedOn = $1, material = $2, stone = $3, engraving = $4, engravingContent = $5, price = $6 WHERE id = $7`,
            [currentTime, material, stone, engraving, engravingContent, price, id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

//DELETE rings/:id
const deleteRingDesign = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM ringDesign WHERE id = $1', [id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

export default {getAllRingDesigns, getRingDesignById, createRingDesign, updateRingDesign, deleteRingDesign};