type Gender = 'male' | 'female';
type Country = 'USA' | 'Canada' | 'Ukraine';

export interface IComment {
    date: Date;
    comment: string;
}

export interface IPatient {
    id: number;
    name: string;
    surname: string;

    birthDate: Date;
    gender: Gender;

    country: Country;
    state?: string;
    address: string;

    comments?: IComment[];
}
