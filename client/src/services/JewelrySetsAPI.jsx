import React, {useState, useEffect} from 'react'

const getAllJewelrySets = async () =>{
    try{
        const response = await fetch("/jewelrySets");
        if(!response.ok){
            throw new Error(`Failed to fetch jewelry set data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service JewelrySetAPI getAllJewelrySets error:", error);
    }
};

const getJewelrySetById = async (id) =>{
    try{
        const response = await fetch(`/jewelrySets/${id}`);
        if(!response.ok){
            throw new Error(`Failed to fetch jewelry set designs data: ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error("Service JewelrySetAPI getJewelrySetById error:", error);
    }
};

const createJewelrySet = async (event, detail) =>{
    event.preventDefault();
    try{
        const options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch('/jewelrySets', options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service JewelrySetAPI createJewelrySet error:", error);
    }
};

const updateJewlerySet = async(event, detail, id) =>{
    event.preventDefault();
    try{
        const options = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        };
        const respose = fetch(`/jewelrySets/${id}`, options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service JewelrySetAPI updateJewlerySet error:", error);
    }
};

const deleteJewelrySet = async(event, id) =>{
    event.preventDefault();
    try{
        const options = {
            method: "DELETE"
        };
        const respose = fetch(`/jewelrySets/${id}`, options);
        //window.location = '/';
    }
    catch(error){
        console.error("Service JewelrySetAPI deleteJewelrySet error:", error);
    }
};

export const JewelrySetsAPI = {getAllJewelrySets, getJewelrySetById, createJewelrySet, updateJewlerySet, deleteJewelrySet};

export default JewelrySetsAPI;