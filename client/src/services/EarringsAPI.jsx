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


const createEarringDesign = async (event, detail) =>{
    event.preventDefault();
    try{
        const options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch('/earrings', options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service EarringsAPI createEarringDesign error:", error);
    }
};

const updateEarringDesign = async(event, detail, id) =>{
    event.preventDefault();
    try{
        const options = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch(`/earrings/${id}`, options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service EarringsAPI updateEarringDesign error:", error);
    }
};

const deleteEarringDesign = async(event, id) =>{
    event.preventDefault();
    try{
        const options = {
            method: "DELETE"
        };
        const respose = fetch(`/earrings/${id}`, options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service EarringsAPI deleteEarringDesign error:", error);
    }
};

export const EarringsAPI = {getAllEarringDesigns, createEarringDesign, getEarringById, deleteEarringDesign, updateEarringDesign};

export default EarringsAPI;