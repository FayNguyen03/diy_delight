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

//GET jewelrysets/
const getAllJewelrySets = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM jewelrySet ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
} 

//GET jewelrysets/:id
const getJewelrySetById = async (req, res) =>{
    try{
        const selectQuery = `
            SELECT name, price, necklaceId, braceletId, ringId, earringId, price, createdOn, modifiedOn
            FROM jewelrySet
            WHERE id=$1`;
        const jewelrySetId = req.params.id;
        const results = await pool.query(selectQuery, [jewelrySetId]);
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message} );
    }   
};

//POST jewelrysets/
const createJewelrySet = async (req, res) =>{
    try{
        const { name, price, necklaceId, braceletId, ringId, earringId } = req.body;
        const currentTime = formatCurrentDateTime();
        const results = await pool.query(`
            INSERT INTO jewelrySet (name, price, necklaceId, braceletId, ringId, earringId, createdOn, modifiedOn)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [ name, price, necklaceId, braceletId, ringId, earringId, currentTime, currentTime]
        );
        res.status(201).json(results.rows[0]);
    }
    catch(error)
    {
        res.status(409).json( { error: error.message } );
    }
};

//PATCH jewelrysets/:id
const updateJewelrySet = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const currentTime = formatCurrentDateTime();
        const { name, price, necklaceId, braceletId, ringId, earringId } = req.body;
        const results = await pool.query(`
            UPDATE jewelrySet SET name = $1, price = $2, necklaceId = $3, braceletId = $4, ringId = $5, earringId = $6, modifiedOn= $7 WHERE id = $8`,
            [ name, price, necklaceId, braceletId, ringId, earringId, currentTime, id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

//DELETE jewelrysets/:id
const deleteJewelrySet = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM jewelrySet WHERE id = $1', [id]
        );
        res.status(200).json(results.rows[0]);
    }
    catch(error){
        res.status(409).json( { error: error.message } );
    }
}; 

export default {getAllJewelrySets, getJewelrySetById, createJewelrySet, updateJewelrySet, deleteJewelrySet};