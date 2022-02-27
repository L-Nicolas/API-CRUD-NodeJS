import { Request, Response } from 'express';
import UserModel from './user.model';
import QueryResponse from 'interfaces/queryInterface';

class UserCtrl{

    static getUser = (req: Request, res: Response) => {
        //vérification des champs
        if(!req.params.token || req.params.token === "") {
            let response: QueryResponse = { error: true, message: 'Token vide', data: [] };
            return res.status(400).json(response);
        }
        
        let user = new UserModel().queryUser(req.params.token);
        user.then(response => {
            console.log(response);
            return res.status(200).json(response);
        }).catch(response => {
            console.log(response);
            return res.status(400).json(response);
        })
    }
    
    static connectUser = async (req: Request, res: Response) => {
        if(Object.keys(req.body).length === 0) {
            return res.status(500).json({});
        } else {
            //vérification des champs
            let dataIpt = ['email','password'];
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

            let data = [req.body.email,req.body.password];
            let user = new UserModel().queryConnectUser(data);
            user.then(response => {
                return res.status(200).json(response);
            }).catch(response => {
                return res.status(400).json(response);
            })
        }
    }
    
}


export default UserCtrl;
