import { pool } from "../config/database.js";

//GET details/materials
const getAllMaterials = async (req, res) =>{
    try{
        const results = await pool.query("SELECT * FROM material ORDER BY id ASC");
        res.status(200).json(results.rows); 
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
};

//GET details/stones
const getAllCharms = async (req, res) =>{
    try{
        const results = await pool.query("SELECT * FROM charm ORDER BY id ASC;");
        res.status(200).json(results.rows); 
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
};

//GET details/earringStyles
const getAllEarringStyles = async (req, res) =>{
    try{
        const results = await pool.query("SELECT * FROM earringStyle ORDER BY id ASC;");
        res.status(200).json(results.rows); 
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
};

//GET details/stones
const getAllStones = async (req, res) =>{
    try{
        const results = await pool.query("SELECT * FROM stone ORDER BY id ASC;");
        res.status(200).json(results.rows); 
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
};

export default {getAllMaterials, getAllCharms, getAllStones, getAllEarringStyles};