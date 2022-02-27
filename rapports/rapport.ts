enum Etat {
    'ATE',
    'FIN',
    'ENC',
    'ANN',
    'HID'
}

enum Type_Probleme {
    'serrurerie',
    'plomberie',
    'electricite',
    'autre'
}

class Rapport {
    type_probleme: Type_Probleme;
    description: string;
    etat: Etat;
    date_envoie: Date;
    id_user: number;
    id_immeuble: number;

    constructor(
        type_probleme: Type_Probleme, 
        description: string, 
        etat: Etat, 
        date_envoie: Date, 
        id_user: number, 
        id_immeuble: number
    ) {
        this.type_probleme = type_probleme
        this.description = description
        this.etat = etat
        this.date_envoie = date_envoie
        this.id_user = id_user
        this.id_immeuble = id_immeuble
      }

    
    
}

export default Rapport;