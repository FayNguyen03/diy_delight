import React, {useState, useEffect} from 'react'

const getAllEarringDesigns = async () =>{
    try{
        const response = await fetch("/earrings");
        if(!response.ok){
            throw new Error(`Failed to fetch earring designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service EarringsAPI getAllEarringDesigns error:", error);
    }
};

const getEarringById = async (id) =>{
    try{
        const response = await fetch(`/earrings/${id}`);
        if(!response.ok){
            throw new Error(`Failed to fetch earring designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service EarringsAPI getEarringById error:", error);
    }
};


const createEarringDesign = async (detail) =>{
    try{
        const options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const response = fetch(`/earrings`, options);
        
    }
    catch(error){
        console.error("Service EarringsAPI createEarringDesign error:", error);
    }
};

const updateEarringDesign = async(detail, id) =>{
    try{
        const options = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const response = fetch(`/earrings/${id}`, options);
        
    }
    catch(error){
        console.error("Service EarringsAPI updateEarringDesign error:", error);
    }
};

const deleteEarringDesign = async( id) =>{
    try{
        const options = {
            method: "DELETE"
        };
        const response = fetch(`/earrings/${id}`, options);
        
    }
    catch(error){
        console.error("Service EarringsAPI deleteEarringDesign error:", error);
    }
};

const EarringsAPI = {getAllEarringDesigns, createEarringDesign, getEarringById, deleteEarringDesign, updateEarringDesign};

export default EarringsAPI;