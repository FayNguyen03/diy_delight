import { pool } from "../config/database.js";
//GET /stones
const getAllStones = async (req, res) =>{
    try{
        const results = await pool.query("SELECT * FROM stones ORDER BY id ASC;");
        res.status(200).json(results.rows); 
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
};

export default {getAllStones};