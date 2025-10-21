import React, {useState, useEffect} from 'react'

const getAllBraceletsDesigns = async () =>{
    try{
        const response = await fetch("/bracelets");
        if(!response.ok){
            throw new Error(`Failed to fetch bracelet designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service BraceletsAPI getAllBraceletsDesigns error:", error);
    }
};

const getBraceletById = async (id) =>{
    try{
        const response = await fetch(`/bracelets/${id}`);
        if(!response.ok){
            throw new Error(`Failed to fetch bracelet designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service BraceletsAPI getBraceletById error:", error);
    }
};


const createBraceletDesign = async (event, detail) =>{
    event.preventDefault();
    try{
        const options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch('/bracelets', options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service BraceletsAPI createBraceletDesign error:", error);
    }
};

const updateBraceletDesign = async(event, detail, id) =>{
    event.preventDefault();
    try{
        const options = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch('/bracelets/${id}', options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service BraceletsAPI updateBraceletDesign error:", error);
    }
};

const deleteBraceletDesign = async(event, id) =>{
    event.preventDefault();
    try{
        const options = {
            method: "DELETE"
        };
        const respose = fetch('/bracelets/${id}', options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service BraceletsAPI deleteBraceletDesign error:", error);
    }
};

export const BraceletsAPI = {getAllBraceletsDesigns, getBraceletById, createBraceletDesign, updateBraceletDesign, deleteBraceletDesign};

export default BraceletsAPI;