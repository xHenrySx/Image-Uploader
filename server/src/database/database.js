const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
// Create a new client

const connection = {
    connectionString: process.env.DATABASE_URL,
    ssl:require
}

const connectionString = process.env.DATABASE_URL;

// Connect to the database and create a table named images with image BYTEA NOT NULL if it doesn't exists

async function connect(client) {
    try {
        await client.connect();
        await client.query(
            `CREATE TABLE IF NOT EXISTS images (
                id SERIAL PRIMARY KEY,
                image BYTEA NOT NULL
            )`
        );
        console.log("Connected to the database");
    } catch (err) {
        console.log(err);
    }
}

/*
    Connect to the database with the connect function and insert an image 
    If it was succesfully added the function insertImage will return the id of the image
    If not it will return false
    And  then close the connection
*/
async function insertImage(image) {

    try {
        
        const client = new Client(
            connection
        );
        await connect(client);
        const result = await client.query(
            `INSERT INTO images (image) VALUES ($1) RETURNING id`, [image]
        );
        await client.end()
        .then(() => console.log("Connection closed"));
        return result.rows[0].id;
    } catch (err) {
        console.log(err);
        return false;
    }

}

/* 
    Connect to the database and get an image with the given id
*/
async function getImage(id) {
    try {
        const client = new Client(
            connection
        );
        await connect(client);
        const result = await client.query(
            `SELECT image FROM images WHERE id = $1`, [id]
        );
        await client.end()
        .then(() => console.log("Connection closed"));
        if (result.rows.length === 0) {
            return false;
        }
        return result.rows[0].image;
    } catch (err) {
        console.log(err);
        return false;
    }
}




module.exports = {
    insertImage,
    getImage
}