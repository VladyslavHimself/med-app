import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import classes from '../scss/pages/index.module.scss';
import PatientsList from '../src/components/PatientsList';
import SearchField from '../src/components/SearchField';
import { IPatient } from '../src/interfaces/IPatient.interface';
import InformationLayout from '../src/layouts/InformationLayout/Component';
import { addNewPatient, getPatients } from '../src/services/firebase/firebase.service';
import { convertDateToTimestamp } from '../src/utils/date/date.service';

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
            birthDate: convertDateToTimestamp(new Date('01/01/2000')),
            gender: 'male',
            country: 'USA',
            state: 'New Jersey',
            address: '114 Fairview Ave',
            comments: [],
        });
        await fetchPatients();
    };

    const filterPatients = patientsData?.filter((patient: IPatient) => {
        const fullname = `${patient.name} ${patient.surname}`;
        return fullname.toLowerCase().includes(searchInput.toLowerCase());
    });

    useEffect(() => {
        fetchPatients();
    }, []);

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

                    <PatientsList patients={filterPatients} />
                </div>
            </div>

            <InformationLayout />
        </div>
    );
};

export default Home;
