import { firestoreDb as db } from '../../configs/firebase';
import { IPatient } from '../../interfaces/IPatient.interface';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export async function addNewPatient(patient: IPatient) {
    const { name, surname, birthDate, gender, country, state, address, comments, id } = patient;

    try {
        const docRef = await addDoc(collection(db, 'patients'), {
            id,
            name,
            surname,
            birthDate,
            gender,
            country,
            state,
            address,
            comments,
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export async function getPatients(): Promise<IPatient[]> {
    const dataSnapshot = await getDocs(collection(db, 'patients'));
    const patients: IPatient[] = [];
    dataSnapshot.forEach((doc) => {
        patients.push(doc.data() as IPatient);
    });
    return patients;
}
