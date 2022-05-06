import { firestoreDb as db } from '../../configs/firebase';
import { IPatient } from '../../interfaces/IPatient.interface';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

const patientsCollectionRef = collection(db, 'patients');

export async function addNewPatient(patient: IPatient) {
    const { name, surname, birthDate, gender, country, state, address, comments } = patient;

    try {
        const docRef = await addDoc(patientsCollectionRef, {
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
    const dataSnapshot = await getDocs(patientsCollectionRef);

    const patients: IPatient[] = dataSnapshot.docs.map((doc) => ({
        ...(doc.data() as IPatient),
        id: doc.id,
    }));

    return patients;
}

export async function deletePatient(id: string | undefined) {
    if (!id) console.error('No id provided');
    try {
        await deleteDoc(doc(patientsCollectionRef, id));
    } catch (e) {
        console.error('Error removing document: ', e);
    }
}

// TODO: add update patient
