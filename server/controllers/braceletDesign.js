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

//GET bracelets/
const getAllBraceletDesigns = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM braceletDesign ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
} 

//GET bracelets/:id
const getBraceletDesignById = async (req, res) =>{
    try{
        const selectQuery = `
            SELECT createdOn, modifiedOn, material, stone, charm, engraving, engravingContent, price
            FROM braceletDesign
            WHERE id=$1`;
        const braceletDesignId = req.params.id;
        const results = await pool.query(selectQuery, [braceletDesignId]);
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message} );
    }   
};

//POST bracelets/
const createBraceletDesign = async (req, res) =>{
    try{
        const { material, stone, charm, engraving, engravingContent, price } = req.body;
        const currentTime = formatCurrentDateTime();
        const results = await pool.query(`
            INSERT INTO braceletDesign (createdOn, modifiedOn, material, stone, charm, engraving, engravingContent, price)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [currentTime, currentTime, material, stone, charm, engraving, engravingContent, price]
        );
        res.status(201).json(results.rows[0]);
    }
    catch(error)
    {
        res.status(409).json( { error: error.message } );
    }
};

//PATCH bracelets/:id
const updateBraceletDesign = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const currentTime = formatCurrentDateTime();
        const { material, stone, charm, engraving, engravingContent, price } = req.body;
        const results = await pool.query(`
            UPDATE braceletDesign SET modifiedOn = $1, material = $2, stone = $3, charm = $4, engraving = $5, engravingContent = $6, price= $7 WHERE id = $8`,
            [currentTime, material, stone, charm, engraving, engravingContent, price, id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

//DELETE bracelets/:id
const deleteBraceletDesign = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM braceletDesign WHERE id = $1', [id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

export default {getAllBraceletDesigns, getBraceletDesignById, createBraceletDesign, updateBraceletDesign, deleteBraceletDesign};