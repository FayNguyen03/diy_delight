import { pool } from "./database.js"
import charmData from "../data/charm.js"
import stoneData from "../data/stone.js"
import earringStyleData from "../data/earringStyle.js"
import materialData from "../data/material.js"
import "./dotenv.js"

//table to store available materials 
const createMaterialTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS material CASCADE;

        CREATE TABLE IF NOT EXISTS material (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            img VARCHAR(255) NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('material table created successfully')
    }
    catch (err) {
        console.error('Errors creating material table', err)
    };
};

//table to store available stones
const createStoneTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS stone CASCADE;

        CREATE TABLE IF NOT EXISTS stone (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            img VARCHAR(255) NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('stone table created successfully')
    }
    catch (err) {
        console.error('Errors creating stone table', err)
    };
};

//table to store available earring styles
const createEarringStyleTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS earringStyle CASCADE;

        CREATE TABLE IF NOT EXISTS earringStyle (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            img VARCHAR(255) NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('earringStyle table created successfully')
    }
    catch (err) {
        console.error('Errors creating earringStyle table', err)
    };
};

//table to store available charms
const createCharmTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS charm CASCADE;

        CREATE TABLE IF NOT EXISTS charm (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            img VARCHAR(255) NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('charm table created successfully')
    }
    catch (err) {
        console.error('Errors creating charm table', err)
    };
};

const createRingDesignTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS ringDesign CASCADE;

        CREATE TABLE IF NOT EXISTS ringDesign (
            id SERIAL PRIMARY KEY,
            createdOn TIMESTAMP NOT NULL,
            modifiedOn TIMESTAMP NOT NULL,
            material INTEGER NOT NULL REFERENCES material(id),
            stone INTEGER REFERENCES stone(id),
            engraving BOOLEAN NOT NULL,
            engravingContent VARCHAR(100),
            price INTEGER NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('ringDesign table created successfully')
    }
    catch (err) {
        console.error('Errors creating ringDesign table', err)
    };
};

const createNecklaceDesignTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS necklaceDesign CASCADE;

        CREATE TABLE IF NOT EXISTS necklaceDesign (
            id SERIAL PRIMARY KEY,
            createdOn TIMESTAMP NOT NULL,
            modifiedOn TIMESTAMP NOT NULL,
            material INTEGER NOT NULL REFERENCES material(id),
            stone INTEGER REFERENCES stone(id),
            charm INTEGER REFERENCES charm(id),
            price INTEGER NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('necklaceDesign table created successfully')
    }
    catch (err) {
        console.error('Errors creating necklaceDesign table', err)
    };
};

const createBraceletDesignTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS braceletDesign CASCADE;

        CREATE TABLE IF NOT EXISTS braceletDesign (
            id SERIAL PRIMARY KEY,
            createdOn TIMESTAMP NOT NULL,
            modifiedOn TIMESTAMP NOT NULL,
            material INTEGER NOT NULL REFERENCES material(id),
            stone INTEGER REFERENCES stone(id),
            charm INTEGER REFERENCES charm(id),
            engraving BOOLEAN NOT NULL,
            engravingContent VARCHAR(100),
            price INTEGER NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('braceletDesign table created successfully')
    }
    catch (err) {
        console.error('Errors creating braceletDesign table', err)
    };
};

const createEarringDesignTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS earringDesign CASCADE;

        CREATE TABLE IF NOT EXISTS earringDesign (
            id SERIAL PRIMARY KEY,
            createdOn TIMESTAMP NOT NULL,
            modifiedOn TIMESTAMP NOT NULL,
            material INTEGER NOT NULL REFERENCES material(id),
            earringStyle INTEGER NOT NULL REFERENCES earringStyle(id),
            leftEarring BOOLEAN NOT NULL,
            rightEarring BOOLEAN NOT NULL,
            stone INTEGER REFERENCES stone(id),
            price INTEGER NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('earringDesign table created successfully')
    }
    catch (err) {
        console.error('Errors creating earringDesign table', err)
    };
};

const createJewelrySetTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS jewelrySet CASCADE;

        CREATE TABLE IF NOT EXISTS jewelrySet (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            necklaceId INTEGER REFERENCES necklaceDesign(id),
            braceletId INTEGER REFERENCES braceletDesign(id),
            ringId INTEGER REFERENCES ringDesign(id),
            earringId INTEGER REFERENCES earringDesign(id),
            createdOn TIMESTAMP NOT NULL,
            modifiedOn TIMESTAMP NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('Jewelry Set table created successfully')
    }
    catch (err) {
        console.error('Errors creating Jewelry Sets table', err)
    };
};

const seedMaterialTable = async () => {
    await createMaterialTable();
    materialData.forEach((material) => {
        const insertQuery = {
            text: 'INSERT INTO material (name, img) VALUES ($1, $2)'
        };
        const values = [
            material.name,
            material.img
        ];
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('Error: inserting material ', err)
                return
            }

            console.log(`${material.name} added successfully`)
        });
    });

};

const seedStoneTable = async () => {
    await createStoneTable();
    stoneData.forEach((stone) => {
        const insertQuery = {
            text: 'INSERT INTO stone (name, img) VALUES ($1, $2)'
        };
        const values = [
            stone.name,
            stone.img
        ];
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('Error: inserting stone ', err)
                return
            }

            console.log(`${stone.name} added successfully`)
        });
    });

};

const seedEarringStyleTable = async () => {
    await createEarringStyleTable();
    earringStyleData.forEach((earringStyle) => {
        const insertQuery = {
            text: 'INSERT INTO earringStyle (name, img) VALUES ($1, $2)'
        };
        const values = [
            earringStyle.name,
            earringStyle.img
        ];
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('Error: inserting earringStyle ', err)
                return
            }

            console.log(`${earringStyle.name} added successfully`)
        });
    });

};

const seedCharmTable = async () => {
    await createCharmTable();
    charmData.forEach((charm) => {
        const insertQuery = {
            text: 'INSERT INTO charm (name, img) VALUES ($1, $2)'
        };
        const values = [
            charm.name,
            charm.img
        ];
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('Error: inserting charm ', err)
                return
            }

            console.log(`${charm.name} added successfully`)
        });
    });

};

const seedBaseTables = async () =>{
    try {
        await seedStoneTable();  
        await seedEarringStyleTable();  
        await seedMaterialTable();  
        await seedCharmTable();

    } catch (err) {
        console.error('Error seeding diy_delight database', err)
    }
}

const createDesignTables =  async () =>{
    try {
        await createBraceletDesignTable();
        await createEarringDesignTable();
        await createNecklaceDesignTable();
        await createRingDesignTable();
        await createJewelrySetTable();

    } catch (err) {
        console.error('Error seeding diy_delight database', err)
    }
}

const main = async () => {
    await seedBaseTables();
    await createDesignTables();
};

main();