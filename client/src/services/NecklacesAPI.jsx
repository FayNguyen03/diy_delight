import React, {useState, useEffect} from 'react'

const getAllNecklaceDesigns = async () =>{
    try{
        const response = await fetch("/necklaces");
        if(!response.ok){
            throw new Error(`Failed to fetch necklace designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service NecklacesAPI getAllNecklaceDesigns error:", error);
    }
};

const getNecklaceById = async (id) =>{
    try{
        const response = await fetch(`/necklaces/${id}`);
        if(!response.ok){
            throw new Error(`Failed to fetch necklace designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service NecklacesAPI getNecklaceById error:", error);
    }
};

const createNecklaceDesign = async (detail) =>{
    try{
        const options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch('/necklaces', options);
        
    }
    catch(error){
        console.error("Service NecklacesAPI createNecklaceDesign error:", error);
    }
};

const updateNecklaceDesign = async(detail, id) =>{
    try{
        const options = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch(`/necklaces/${id}`, options);
        
    }
    catch(error){
        console.error("Service NecklacesAPI updateNecklaceDesign error:", error);
    }
};

const deleteNecklaceDesign = async(id) =>{
    try{
        const options = {
            method: "DELETE"
        };
        const respose = fetch(`/necklaces/${id}`, options);
        
    }
    catch(error){
        console.error("Service NecklacesAPI deleteNecklaceDesign error:", error);
    }
};

export const NecklacesAPI = {getAllNecklaceDesigns, getNecklaceById, createNecklaceDesign, updateNecklaceDesign, deleteNecklaceDesign};

export default NecklacesAPI;