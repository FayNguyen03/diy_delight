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

const createBraceletDesign = async (detail) =>{
    try{
        const options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const response = fetch('/bracelets', options);
        window.location = '/';
    }
    catch(error){
        console.error("Service BraceletsAPI createBraceletDesign error:", error);
    }
};

const updateBraceletDesign = async(detail, id) =>{
    try{
        const options = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const response = fetch('/bracelets/${id}', options);
        window.location = '/';
    }
    catch(error){
        console.error("Service BraceletsAPI updateBraceletDesign error:", error);
    }
};

const deleteBraceletDesign = async(id) =>{
    try{
        const options = {
            method: "DELETE"
        };
        const response = fetch('/bracelets/${id}', options);
        window.location = '/';
    }
    catch(error){
        console.error("Service BraceletsAPI deleteBraceletDesign error:", error);
    }
};

export const BraceletsAPI = {getAllBraceletsDesigns, getBraceletById, createBraceletDesign, updateBraceletDesign, deleteBraceletDesign};

export default BraceletsAPI;