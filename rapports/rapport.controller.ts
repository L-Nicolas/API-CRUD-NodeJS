import { Request, Response } from 'express';
import RapportModel from './rapport.model';
import Rapport from './rapport';
import UserModel from '../users/user.model';
import ImmeubleModel from '../immeubles/immeuble.model';

class RapportCtrl {

    static createRapportUser = (req: Request, res: Response) => {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: true, message: "Bad request", data: [] });
        } else {
            let dataIpt = ['type_probleme','description','id_user','id_immeuble'];
            let listError: any[] = [];
            //vérification que le body est correctement rempli
            dataIpt.forEach((val) => {
                if(!Object.keys(req.body).includes(val)) {
                    listError.push(`Champ ${val} manquant`);
                }
            })
            Object.entries(req.body).forEach(([key, value]) => {
                if(!value || value === "") {
                    listError.push(`Champ ${key} vide`);
                }
            });
    
            if(listError.length > 0){
                return res.status(400).json({ error: true, message: "Erreur", data: [listError] });
            }
    
            let data: any[] = [];
            for (const [key, value] of Object.entries(req.body)) {
                data.push(value);
            }
    
            let rapport = new Rapport(req.body.type_probleme,
                                    req.body.description,
                                    req.body.etat,
                                    req.body.date_envoie,
                                    parseInt(req.body.id_user),
                                    parseInt(req.body.id_immeuble),
                                    );
    
            let rapportQuery = new RapportModel().queryCreateRapport(rapport);
            rapportQuery.then(response => {
                console.log(response);
                return res.status(200).json(response);
            }).catch(response => {
                console.log(response);
                return res.status(400).json(response);
            })
        }
    }
    
    static getRapport = (req: Request, res: Response) => {
        /* if(!req.params.id || req.params.id === "") {
            return res.status(400).json({ error: true, message: `Id de rapport vide`, data: [] });
        }
    
        let rapportQuery = new RapportModel().queryRapport(req.params.id);
        rapportQuery.then(response => {
            console.log(response);
            return res.status(200).json(response);
        }).catch(response => {
            console.log(response);
            return res.status(400).json(response);
        }) */
    }
    
    static getRapportImm = (req: Request, res: Response) => {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: true, message: "Bad request", data: [] });
        } else {
            let dataIpt = ['token','id'];
            let listError: any[] = [];
            //vérification que le body est correctement rempli
            dataIpt.forEach((val) => {
                if(!Object.keys(req.body).includes(val)) {
                    listError.push(`Champ ${val} manquant`);
                }
            })
            Object.entries(req.body).forEach(([key, value]) => {
                if(!value || value === "") {
                    listError.push(`Champ ${key} vide`);
                }
            });
    
            if(listError.length > 0){
                return res.status(400).json({ error: true, message: "Erreur", data: [listError] });
            }
    
            let userQuery = new UserModel().queryUser(req.body.token);
            userQuery.then(response => {
                let immeubleUserQuery = new ImmeubleModel().queryImmeuble(req.body.token);
                immeubleUserQuery.then(response2 => {
                    let rapportUserQuery = new RapportModel().queryRapportUser([req.body.token,req.body.id]);
                    rapportUserQuery.then(response3 => {
                        console.log(response3);
                        return res.status(200).json(response3);
                    }).catch(response3 => {
                        console.log(response3);
                        return res.status(400).json(response3);
                    })
                }).catch(response2 => {
                    console.log(response2);
                    return res.status(400).json(response2);
                })
            }).catch(response => {
                console.log(response);
                return res.status(400).json(response);
            })
        }
    }
    
    static getRapportUser = (req: Request, res: Response) => {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: true, message: "Bad request", data: [] });
        } else {
            let dataIpt = ['token','id'];
            let listError: any[] = [];
            //vérification que le body est correctement rempli
            dataIpt.forEach((val) => {
                if(!Object.keys(req.body).includes(val)) {
                    listError.push(`Champ ${val} manquant`);
                }
            })
            Object.entries(req.body).forEach(([key, value]) => {
                if(!value || value === "") {
                    listError.push(`Champ ${key} vide`);
                }
            });
    
            if(listError.length > 0){
                return res.status(400).json({ error: true, message: "Erreur", data: [listError] });
            }
    
            //demande au model la vérification de l'existance de l'utilisateur en base
            let userQuery = new UserModel().queryUser(req.body.token);
            userQuery.then(response => {
                //demande au model la recherche du rapport en base
                let rapportUserQuery = new RapportModel().queryRapportUser([req.body.token,req.body.id]);
                rapportUserQuery.then(response2 => {
                    console.log(response2);
                    return res.status(200).json(response2);
                }).catch(response2 => {
                    console.log(response2);
                    return res.status(400).json(response2);
                })
            }).catch(response => {
                console.log(response);
                return res.status(400).json(response);
            })
        }
    }
    
    static getListRapportUser = (req: Request, res: Response) => {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: true, message: "Bad request", data: [] });
        } else {
            let dataIpt = ['token'];
            let listError: any[] = [];
            //vérification que le body est correctement rempli
            dataIpt.forEach((val) => {
                if(!Object.keys(req.body).includes(val)) {
                    listError.push(`Champ ${val} manquant`);
                }
            })
            Object.entries(req.body).forEach(([key, value]) => {
                if(!value || value === "") {
                    listError.push(`Champ ${key} vide`);
                }
            });
    
            if(listError.length > 0){
                return res.status(400).json({ error: true, message: "Erreur", data: [listError] });
            }
        
            //demande au model la vérification de l'existance de l'utilisateur en base
            let userQuery = new UserModel().queryUser(req.body.token);
            userQuery.then(response => {
                //demande au model la recherche des rapports de l'utilisateur en base
                let rapportUserQuery = new RapportModel().queryListeRapportUser(req.body.token);
                rapportUserQuery.then(response2 => {
                    console.log(response2);
                    return res.status(200).json(response2);
                }).catch(response2 => {
                    console.log(response2);
                    return res.status(400).json(response2);
                })
            }).catch(response => {
                console.log(response);
                return res.status(400).json(response);
            })
        }
    }
    
    static updateRapportUser = (req: Request, res: Response) => {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: true, message: "Bad request", data: [] });
        } else {
            let array = ['type_probleme','description','token','id'];
            let dataIpt = ['token','id'];
            let listError: any[] = [];
            //vérification que le body est correctement rempli
            dataIpt.forEach((val) => {
                if(!Object.keys(req.body).includes(val)) {
                    listError.push(`Champ ${val} manquant`);
                }
            })
            Object.entries(req.body).forEach(([key, value]) => {
                if(!value || value === "") {
                    listError.push(`Champ ${key} vide`);
                }
            });
    
            if(listError.length > 0){
                return res.status(400).json({ error: true, message: "Erreur", data: [listError] });
            }
    
            //demande au model la vérification de l'existance de l'utilisateur en base
            let userQuery = new UserModel().queryUser(req.body.token);
            userQuery.then(response => {
                //demande au model la recherche du rapport en base
                let rapportUserQuery = new RapportModel().queryRapportUser([req.body.token,req.body.id]);
                rapportUserQuery.then(response2 => {
                    //demande au model de mettre à jours les champs du rapport concernés en base
                    let rapportDelRapportQuery = new RapportModel().queryUpdateRapportUser(req.body);
                    rapportDelRapportQuery.then(response3 => {
                        console.log(response3);
                        return res.status(200).json(response3);
                    }).catch(response3 => {
                        console.log(response3);
                        return res.status(400).json(response3);
                    })
                }).catch(response2 => {
                    console.log(response2);
                    return res.status(400).json(response2);
                })
            }).catch(response => {
                console.log(response);
                return res.status(400).json(response);
            })
        }
    }
    
    static delRapportUser = (req: Request, res: Response) => {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: true, message: "Bad request", data: [] });
        } else {
            let dataIpt = ['token','id'];
            let listError: any[] = [];
            //vérification que le body est correctement rempli
            dataIpt.forEach((val) => {
                if(!Object.keys(req.body).includes(val)) {
                    listError.push(`Champ ${val} manquant`);
                }
            })
            Object.entries(req.body).forEach(([key, value]) => {
                if(!value || value === "") {
                    listError.push(`Champ ${key} vide`);
                }
            });
    
            if(listError.length > 0){
                return res.status(400).json({ error: true, message: "Erreur", data: [listError] });
            }
    
            //demande au model la vérification de l'existance de l'utilisateur en base
            let userQuery = new UserModel().queryUser(req.body.token);
            userQuery.then(response => {
                //demande au model la recherche du rapport en base
                let rapportUserQuery = new RapportModel().queryRapportUser([req.body.token,req.body.id]);
                rapportUserQuery.then(response2 => {
                    //demande au model la suppression du rapport en base
                    let rapportDelRapportQuery = new RapportModel().queryDeleteRapportUser([req.body.token,req.body.id]);
                    rapportDelRapportQuery.then(response3 => {
                        console.log(response3);
                        return res.status(200).json(response3);
                    }).catch(response3 => {
                        console.log(response3);
                        return res.status(400).json(response3);
                    })
                }).catch(response2 => {
                    console.log(response2);
                    return res.status(400).json(response2);
                })
            }).catch(response => {
                console.log(response);
                return res.status(400).json(response);
            })
        }
    }
}



export default RapportCtrl;
