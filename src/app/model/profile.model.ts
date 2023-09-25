export class User {
    id?: string;
    nom?: string;
    status?: number;
    etat?: string;
    prenom?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
}

export class UpdatePassword {
    id?: string;
    password?: string;
    newPassword?: string;
}