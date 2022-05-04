import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import classes from '../scss/pages/index.module.scss';
import PatientsList from '../src/components/PatientsList';
import SearchField from '../src/components/SearchField';

const Home: NextPage = () => {
    const [patientsData, setPatientsData] = useState([]);
    const [searchInput, setSearchInput] = useState<string>('');

    const onAddNewPatientHandle = (): void => {
        // TODO: Add new patient
        setSearchInput('');
    };

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

                    <PatientsList />
                </div>
            </div>
        </div>
    );
};

export default Home;
