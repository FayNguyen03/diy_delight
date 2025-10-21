import React, {useState, useEffect} from 'react'

const getAllRingDesigns = async () =>{
    try{
        const response = await fetch("/rings");
        if(!response.ok){
            throw new Error(`Failed to fetch ring designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service RingsAPI getAllRingDesigns error:", error);
    }
};

const getRingById = async (id) =>{
    try{
        const response = await fetch(`/rings/${id}`);
        if(!response.ok){
            throw new Error(`Failed to fetch ring designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service RingsAPI getRingById error:", error);
    }
};

const createRingDesign = async (event, detail) =>{
    event.preventDefault();
    try{
        const options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch('/rings', options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service RingsAPI createRingDesign error:", error);
    }
};

const updateRingDesign = async(event, detail, id) =>{
    event.preventDefault();
    try{
        const options = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch(`/bracelets/${id}`, options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service RingsAPI updateRingDesign error:", error);
    }
};

const deleteRingDesign = async(event, id) =>{
    event.preventDefault();
    try{
        const options = {
            method: "DELETE"
        };
        const respose = fetch(`/rings/${id}`, options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service RingsAPI deleteRingDesign error:", error);
    }
};

export const RingsAPI = {getAllRingDesigns, getRingById, createRingDesign, updateRingDesign, deleteRingDesign};

export default RingsAPI;