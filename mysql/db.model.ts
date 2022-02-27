import mysql from 'mysql';

const config = {
    host: "localhost",
    user: 'root',
    password: 'root',
    database: "ProjetSwift",
    port: '8889'
};
const pool = mysql.createPool(config);

export { pool };