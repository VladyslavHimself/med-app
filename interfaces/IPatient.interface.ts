type gender = 'male' | 'female';

type country = 'USA' | 'Canada' | 'Ukraine';

export interface IPatient {
    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    gender: gender;

    country: country;
    address: string;
}
