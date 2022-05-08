import { Timestamp } from 'firebase/firestore';

type Gender = 'male' | 'female';

export interface IComment {
    date: Timestamp;
    comment: string;
}

export interface IPatient {
    id?: string;
    name: string;
    surname: string;

    birthDate: Timestamp;
    gender: Gender;

    country: string;
    state: string;
    address: string;

    comments?: IComment[];
}
