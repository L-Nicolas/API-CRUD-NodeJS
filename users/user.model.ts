import { pool } from '../mysql/db.model';

class UserModel{
    queryUser = async (array) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = "SELECT * FROM Users WHERE token=? AND etat='VAL'";
                pool.query(sql, array, (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (!results[0]) {
                        return reject({ error: true, message: 'Utilisateur introuvable', data: results });
                    }
                    return resolve({ error: false, message: 'Connexion réussi', data: results }); 
                });
            });
        });
    }

    queryConnectUser = async (array) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = `SELECT token FROM Users WHERE email=? AND password=? AND etat='VAL';`;
                pool.query(sql, array, (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (!results[0]) {
                        return reject({ error: true, message: 'Utilisateur introuvable', data: results });
                    }
                    return resolve({ error: false, message: 'Connexion réussi', data: results }); 
                });
            });
        });
    }
}
export default UserModel;