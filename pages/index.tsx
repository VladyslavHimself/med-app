import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import classes from '../scss/pages/index.module.scss';
import PatientsList from '../src/components/PatientsList';
import SearchField from '../src/components/SearchField';
import { IPatient } from '../src/interfaces/IPatient.interface';
import { addNewPatient, getPatients } from '../src/services/firebase/firebase.service';

const Home: NextPage = () => {
    const [patientsData, setPatientsData] = useState<IPatient[]>();
    const [searchInput, setSearchInput] = useState<string>('');

    const fetchPatients = async (): Promise<void> => {
        const patients: IPatient[] = await getPatients();
        setPatientsData(patients);
    };

    const onAddNewPatientHandle = async (): Promise<void> => {
        await addNewPatient({
            name: 'John',
            surname: 'Doe',
            birthDate: new Date('01/01/2000'),
            gender: 'male',
            country: 'USA',
            state: 'New Jersey',
            address: '114 Fairview Ave',
            comments: [],
        });
        await fetchPatients();
    };

    const filterPatients = patientsData?.filter((patient: IPatient) => {
        return (
            patient.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            patient.surname.toLowerCase().includes(searchInput.toLowerCase())
        );
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <div>
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

                    <PatientsList patients={filterPatients} />
                </div>
            </div>
        </div>
    );
};

export default Home;
