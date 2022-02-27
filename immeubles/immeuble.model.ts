import { pool } from '../mysql/db.model';
import mysql from 'mysql';


class ImmeubleModel{
    queryImmeuble = async (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = `SELECT * FROM Immeubles WHERE id=(SELECT id_immeuble FROM users WHERE token=?);`;
                pool.query(sql, data, (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (!results[0]) {
                        return reject({ error: true, message: 'Immeuble introuvable', data: results });
                    }
                    return resolve({ error: false, message: 'Immeuble trouvé', data: results }); 
                });
            });
        });
    }
}
export default ImmeubleModel;