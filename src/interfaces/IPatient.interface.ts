import { Timestamp } from 'firebase/firestore';

type Gender = 'male' | 'female';
type Country = 'USA' | 'Canada' | 'Ukraine';

export interface IComment {
    date: Timestamp;
    comment: string;
}

export interface IPatient {
    id?: number;
    name: string;
    surname: string;

    birthDate: Timestamp;
    gender: Gender;

    country: Country;
    state: string;
    address: string;

    comments?: IComment[];
}
