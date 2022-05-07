import type { NextPage } from 'next';
import Head from 'next/head';
import classes from '../scss/pages/index.module.scss';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addNewPatient, getPatients } from '../src/services/firebase/firebase.service';
import { IPatient } from '../src/interfaces/IPatient.interface';
import InformationLayout from '../src/layouts/InformationLayout/Component';
import PatientNavbar from '../src/components/PatientNavbar/Component';
import PatientsList from '../src/components/PatientsList';
import SearchField from '../src/components/SearchField';

import { convertDateToTimestamp } from '../src/utils/date/date.service';
import PatientMedicalBook from '../src/components/PatientMedicalBook/Component';

const Home: NextPage = () => {
    const [patientsData, setPatientsData] = useState<IPatient[]>();
    const [selectedPatient, setSelectedPatient] = useState<IPatient>();
    const [searchInput, setSearchInput] = useState<string>('');

    const fetchPatients = async (): Promise<void> => {
        const patients: IPatient[] = await getPatients();
        setPatientsData(patients);
        setSelectedPatient(patients[0]);
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const onAddNewPatientHandle = async (): Promise<void> => {
        await addNewPatient({
            id: uuidv4(),
            name: 'John',
            surname: 'Doe',
            birthDate: convertDateToTimestamp(new Date('01/01/2000')),
            gender: 'male',
            country: 'USA',
            state: 'New Jersey',
            address: '114 Fairview Ave',
            comments: [],
        });
        await fetchPatients();
    };

    const onSelectPatientHandle = (patient: IPatient) => {
        setSelectedPatient(patient);
    };

    const filterPatients = patientsData?.filter((patient: IPatient) => {
        const fullname = `${patient.name} ${patient.surname}`;
        return fullname.toLowerCase().includes(searchInput.toLowerCase());
    });

    return (
        <div className={classes['main-layout']}>
            <Head>
                <title>VITech Med App</title>
            </Head>

            <div className={classes.contacts}>
                <div className={classes.container}>
                    <div className={classes['search-patient']}>
                        <SearchField
                            buttonValue="New Patient"
                            inputState={searchInput}
                            setInputState={setSearchInput}
                            onButtonClickHandler={onAddNewPatientHandle}
                        />
                    </div>

                    <hr />

                    <PatientsList onPatientClickHandler={onSelectPatientHandle} patients={filterPatients} />
                </div>
            </div>

            <InformationLayout>
                <PatientNavbar selectedPatient={selectedPatient} fetch={fetchPatients} />
                <PatientMedicalBook selectedPatient={selectedPatient} />
            </InformationLayout>
        </div>
    );
};

export default Home;
