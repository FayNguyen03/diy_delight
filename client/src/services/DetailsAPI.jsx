import React, {useState, useEffect} from 'react'

const getAllCharms = async () =>{
    try{
        const response = await fetch("/details/charms");
        if(!response.ok){
            throw new Error(`Failed to fetch charm data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Service DetailsAPI getAllCharms error:", error);
    }
};

const getAllStones = async () =>{
    try{
        const response = await fetch("/details/stones");
        if(!response.ok){
            throw new Error(`Failed to fetch stone data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Service DetailsAPI getAllStones error:", error);
    }
};

const getAllEarringStyles = async () =>{
    try{
        const response = await fetch("/details/earringStyles");
        if(!response.ok){
            throw new Error(`Failed to fetch earringStyle data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Service DetailsAPI getAllEarringStyles error:", error);
    }
};

const getAllMaterials = async () =>{
    try{
        const response = await fetch("/details/materials");
        if(!response.ok){
            throw new Error(`Failed to fetch material data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Service DetailsAPI getAllMaterials error:", error);
    }
};

export const DetailsAPI = {getAllCharms, getAllEarringStyles, getAllMaterials, getAllStones};

export default DetailsAPI;