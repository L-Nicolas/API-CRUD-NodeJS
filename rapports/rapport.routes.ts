import { Router } from 'express';
import RapportCtrl from './rapport.controller';
const routeRapport = Router();

/* Route for admin */
/* routeRapport.get('/api/admin/rapport/liste', getRapport);
routeRapport.get('/api/admin/rapport/:id', getRapportUser);
routeRapport.get('/api/admin/liste/rapports/:id', getRapportUser);
routeRapport.put('/api/admin/rapport/create', () => { console.log('Création rapport'); });
routeRapport.post('/api/admin/rapport/update/:id_rapport', () => console.log('Rapport mis à jour'));
routeRapport.delete('/api/admin/delete/:id_rapport', () => console.log('Rapport suppression')); */


/* Route for user */
routeRapport.post('/api/user/rapport/get/', RapportCtrl.getRapportUser);
routeRapport.post('/api/user/rapport/liste/user/', RapportCtrl.getListRapportUser);
routeRapport.post('/api/user/rapport/liste/immeuble/', RapportCtrl.getRapportImm);

routeRapport.post('/api/user/rapport/create/', RapportCtrl.createRapportUser);
routeRapport.post('/api/user/rapport/update/', RapportCtrl.updateRapportUser);
routeRapport.delete('/api/user/rapport/delete/', RapportCtrl.delRapportUser);

export { routeRapport };
