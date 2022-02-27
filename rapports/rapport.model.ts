import { pool } from '../mysql/db.model';
import Rapport from './rapport';


class RapportModel{

    queryCreateRapport = async (rapport: Rapport) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                connexion.release();

                if (err) throw err; // not connected!

                const sql = "INSERT INTO `Rapports` (type_probleme, description, id_user, id_immeuble) VALUES ('" + 
                                                    rapport.type_probleme + "', '" +
                                                    rapport.description + "' , " +
                                                    rapport.id_user + " , " +
                                                    rapport.id_immeuble + ");";
                pool.query(sql, [], (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (results.affectedRows == 1) {
                        return resolve({ error: false, message: 'Rapport créé', data: results });
                    } 
                    return reject({ error: true, message: "Erreur lors de l'insertion du rapport", data: [] });
                });
            });
        });
    }

    queryRapport = async (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                connexion.release();

                if (err) { return reject({ error: true, message: err, data: [] })}

                const sql = "SELECT * FROM rapport WHERE id=? AND etat != HID";
                pool.query(sql, id, (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (!results[0]) {
                        return reject({ error: true, message: 'Aucun rapport trouvé', data: [] });
                    }
                    return resolve({ error: false, message: 'Rapport trouvé', data: results }); 
                });
            });
        });
    }
    
    queryRapportImm = async (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                connexion.release();

                if (err) { return reject({ error: true, message: err, data: [] })}

                const sql = "SELECT * FROM rapports WHERE id_immeuble=? AND etat != HID";
                pool.query(sql, id, (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (!results[0]) {
                        return reject({ error: true, message: 'Aucun rapport trouvé', data: [] });
                    }
                    return resolve({ error: false, message: 'Rapport trouvé', data: results }); 
                });
            });
        });
    }
    

    queryRapportUser = async (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                connexion.release();

                if (err) { return reject({ error: true, message: err, data: [] })}

                const sql = "SELECT R.* FROM rapports as R INNER JOIN (SELECT id,id_immeuble FROM users WHERE token=?) as U ON  R.id_user = U.id WHERE R.id=? AND R.id_immeuble = U.id_immeuble AND etat!='HID' LIMIT 1;";
                pool.query(sql, data, (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (!results[0]) {
                        return reject({ error: true, message: 'Rapport indisponible', data: results });
                    }
                    return resolve({ error: false, message: 'Rapport trouvé', data: results }); 
                });
            });
        });
    }

    queryListeRapportUser = async (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                connexion.release();

                if (err) { return reject({ error: true, message: err, data: [] })}

                const sql = "SELECT R.* FROM rapports as R INNER JOIN (SELECT id FROM users WHERE token=?) as U ON  R.id_user = U.id WHERE etat != HID;";
                pool.query(sql, id, (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (!results[0]) {
                        return reject({ error: true, message: 'Aucun rapport trouvé pour cette utilisateur', data: results });
                    }
                    return resolve({ error: false, message: `${results.length} rapports trouvés`, data: results }); 
                });
            });
        });
    }

    queryUpdateRapportUser = async (data) => {
        return await new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                connexion.release();

                if (err) { return reject({ error: true, message: err, data: [] })}

                let change = "  ";
                let cpt = 0;
                let error = "Aucune données envoyées";
                for (const [key, value] of Object.entries(data)) {
                    if(typeof value === 'string' && key != "token" && key != "id") {
                        if(value.length > 0){
                            cpt += 1;
                            if (cpt > 1 && cpt < data.length) {
                                change += " , ";
                            }
                            change += key + ' = "' + value + '"';
                        }
                    } else {
                        error = "Données incorrectes";
                    }
                }
                if (change.trim().length == 0){return reject({ error: true, message: error, data: [] })};

                const sql = `UPDATE rapports SET ${change} WHERE id=? AND id_user=(SELECT id FROM users WHERE token=?)`;
                pool.query(sql, [data.id,data.token], (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (results.affectedRows == 1) {
                        return resolve({ status: 200, error: false, message: 'Rapport modifié avec succès', data: [] });
                    } 
                    return reject({ error: true, message: 'Error lors de la modification du rapport', data: results });
                });
            });
        });
    }

    queryDeleteRapportUser = async (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connexion) => {
                connexion.release();

                if (err) { return reject({ error: true, message: err, data: [] })}

                const sql = "UPDATE rapports as R SET R.etat='HID' WHERE R.id_user=(SELECT id FROM users WHERE token=?) AND R.id=?";
                pool.query(sql, data, (error, results) => {
                    if (error) {
                        return reject({ error: true, message: error, data: [] });
                    }
                    if (results.affectedRows == 1) {
                        return resolve({ error: false, message: 'Rapport supprimé avec succè', data: results }); 
                    }
                    return reject({ error: true, message: 'Error lors de la suppression du rapport', data: results });
                });
            });
        });
    }
}

export default RapportModel;

