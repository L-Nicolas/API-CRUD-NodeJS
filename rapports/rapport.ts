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
    titre: string;
    description: string;

    constructor(type_probleme: Type_Probleme, titre: string, description: string, ) {
        this.type_probleme = type_probleme
        this.titre = titre
        this.description = description
    }

    
    
}

export default Rapport;