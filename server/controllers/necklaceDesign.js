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

//GET necklaces/
const getAllNecklaceDesign = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM necklaceDesign ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
} 

//GET necklaces/:id
const getNecklaceDesignById = async (req, res) =>{
    try{
        const selectQuery = `
            SELECT createdOn, modifiedOn, material, stone, charm, price
            FROM necklaceDesign
            WHERE id=$1`;
        const necklaceDesignId = req.params.id;
        const results = await pool.query(selectQuery, [necklaceDesignId]);
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message} );
    }   
};

//POST necklaces/
const createNecklaceDesign = async (req, res) =>{
    try{
        const { material, stone, charm, price } = req.body;
        const currentTime = formatCurrentDateTime();
        const results = await pool.query(`
            INSERT INTO necklaceDesign (createdOn, modifiedOn, material, stone, charm, price)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [currentTime, currentTime, material, stone, charm, price]
        );
        res.status(201).json(results.rows[0]);
    }
    catch(error)
    {
        res.status(409).json( { error: error.message } );
    }
};

//PATCH necklaces/:id
const updateNecklaceDesign = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const currentTime = formatCurrentDateTime();
        const { material, stone, charm, price } = req.body;
        const results = await pool.query(`
            UPDATE necklaceDesign SET modifiedOn = $1, material = $2, stone = $3, charm = $4, price = $5 WHERE id = $6`,
            [currentTime, material, stone, charm, price, id]
        );
        res.status(200).json(results.rows[0]);
    }    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

//DELETE necklaces/:id
const deleteNecklaceDesign = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM necklaceDesign WHERE id = $1', [id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

export default {getAllNecklaceDesign, getNecklaceDesignById, createNecklaceDesign, updateNecklaceDesign, deleteNecklaceDesign};