export class Module {
    id?: number;
    nom?: string;
    date?: Date;
    code?: number;
}
export class FileByModule {
    id?: number;
    fileName?: string;
    type?: string;
    extension?: string;
    date?: Date;
    idModule?: number;
}


export class FileByModulee {
    id?: number;
    fileName?: string;
    type?: string;
    extension?: string;
    date?: Date;
    module?: Module;
}
export class Examen {
    id?: number;
    idFile?: number;
    idUser?: string;
    date?: Date;
    status?: number;
    idModule?: number
}
export class User {
    id?: string;
    nom?: string;
    status?: number;
    etat?: string;
    prenom?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    role?: string;
    payer?: number;


}
export class ExamenList {
    id?: number;
    idFile?: number;
    idUser?: string;
    date?: Date;
    status?: number;
    idModule?: number;
    fileByModule?: FileByModulee
    user?: User
    isCorrection?: number
}

export class ExamenByList {
    idModule?: number;
    sumStatus?: number;
    user?: User
}

export class Correction {
    id?: number;
    status?: string;
    examen?: Examen;
    extension?: string;
    fileName?: string;
}

export class CorrectionRequest {
    status?: string;
    idExamen?: number;
}
export class CorrectionList {
    id?: number;
    examen?: Examen;
    date?: Date;
    status?: string;
    extension?: string;
    fileName?: string
}
