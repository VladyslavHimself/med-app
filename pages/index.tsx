import type { NextPage } from 'next';
import Head from 'next/head';
import classes from '../scss/pages/index.module.scss';
import { useEffect, useState } from 'react';
import { addNewPatient, getPatients, updatePatient } from '../src/services/firebase/firebase.service';
import { convertDateToTimestamp } from '../src/utils/date/date.service';
import { IPatient } from '../src/interfaces/IPatient.interface';
import InformationLayout from '../src/layouts/InformationLayout';
import PatientNavbar from '../src/components/PatientNavbar';
import PatientsList from '../src/components/PatientsList';
import ControlForms from '../src/components/ControlForms';

import PatientMedicalBook from '../src/components/PatientMedicalBook';
import PatientJournal from '../src/components/PatientJournal';
import Sidebar from '../src/layouts/Sidebar';
import { Button, Input } from '@mui/material';

type InformationStateType = 'AddPatient' | 'EditPatient' | 'ViewPatient';

const Home: NextPage = () => {
    const [patientsData, setPatientsData] = useState<IPatient[]>();
    const [selectedPatient, setSelectedPatient] = useState<IPatient>();
    const [searchInput, setSearchInput] = useState<string>('');
    const [editablePatientData, setEditablePatientData] = useState<any>({});
    const [newPatientData, setNewPatientData] = useState<any>({});

    const [informationState, setInformationState] = useState<InformationStateType>('ViewPatient');

    const fetchPatients = async (): Promise<void> => {
        const patients: IPatient[] = await getPatients();
        setPatientsData(patients);
        setSelectedPatient(patients[0]);
    };

    const filterPatients = patientsData?.filter((patient: IPatient) => {
        const fullname = `${patient.name} ${patient.surname}`;
        return fullname.toLowerCase().includes(searchInput.toLowerCase());
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const onAddNewPatientHandle = async (): Promise<void> => {
        setInformationState('AddPatient');
    };

    const onSelectPatientHandle = (patient: IPatient): void => {
        setSelectedPatient(patient);
    };

    const onUpdatePatientHandle = (): void => {
        updatePatient(selectedPatient?.id, selectedPatient!, editablePatientData);
        setInformationState('EditPatient');
        fetchPatients();
    };

    const onCreateNewPatientHandle = (): void => {
        addNewPatient(newPatientData);
        fetchPatients();
        setInformationState('ViewPatient');
    };

    const onToggleEditPatientHandle = (): void => setIsEditingPatient((prevState) => !prevState);

    return (
        <div className={classes['main-layout']}>
            <Head>
                <title>VITech Med App</title>
            </Head>

            <Sidebar>
                <div className={classes['search-patient']}>
                    <ControlForms
                        buttonValue="New Patient"
                        inputState={searchInput}
                        setInputState={setSearchInput}
                        onButtonClickHandler={onAddNewPatientHandle}
                    />
                </div>

                <hr />

                <PatientsList onPatientClickHandler={onSelectPatientHandle} patients={filterPatients} />
            </Sidebar>
            <InformationLayout>
                <PatientNavbar
                    informationState={informationState}
                    onToggleEditHandler={onToggleEditPatientHandle}
                    onUpdatePatientHandler={onUpdatePatientHandle}
                    selectedPatient={selectedPatient}
                    fetch={fetchPatients}
                />

                {informationState === 'EditPatient' && (
                    <div className={classes['information-container']}>
                        <div className={classes['edit-patient']}>
                            <Input
                                onChange={(e) =>
                                    setEditablePatientData({
                                        ...editablePatientData,
                                        birthDate: convertDateToTimestamp(new Date(e.target.value)),
                                    })
                                }
                                placeholder="Date of Birth"
                            />
                            <Input
                                onChange={(e) =>
                                    setEditablePatientData({ ...editablePatientData, gender: e.target.value })
                                }
                                value={editablePatientData.gender}
                                placeholder="Sex"
                            />
                            <Input
                                onChange={(e) =>
                                    setEditablePatientData({ ...editablePatientData, country: e.target.value })
                                }
                                value={editablePatientData.country}
                                placeholder="Country"
                            />
                            <Input
                                onChange={(e) =>
                                    setEditablePatientData({ ...editablePatientData, state: e.target.value })
                                }
                                value={editablePatientData.state}
                                placeholder="State"
                            />
                            <Input
                                onChange={(e) =>
                                    setEditablePatientData({ ...editablePatientData, address: e.target.value })
                                }
                                value={editablePatientData.address}
                                placeholder="Address"
                            />
                        </div>
                    </div>
                )}

                {informationState === 'AddPatient' && (
                    <div className={classes['information-container']}>
                        <div className={classes['add-patient']}>
                            <Input
                                onChange={(e) => setNewPatientData({ ...newPatientData, name: e.target.value })}
                                placeholder="Name"
                            />
                            <Input
                                onChange={(e) => setNewPatientData({ ...newPatientData, surname: e.target.value })}
                                placeholder="Surname"
                            />
                            <Input
                                onChange={(e) =>
                                    setNewPatientData({ ...newPatientData, birthDate: new Date(e.target.value) })
                                }
                                placeholder="Date of Birth"
                            />
                            <Input
                                onChange={(e) => setNewPatientData({ ...newPatientData, gender: e.target.value })}
                                placeholder="Sex"
                            />

                            <Input
                                onChange={(e) => setNewPatientData({ ...newPatientData, country: e.target.value })}
                                placeholder="Country"
                            />

                            <Input
                                onChange={(e) => setNewPatientData({ ...newPatientData, state: e.target.value })}
                                placeholder="State"
                            />

                            <Input
                                onChange={(e) => setNewPatientData({ ...newPatientData, address: e.target.value })}
                                placeholder="Address"
                            />

                            <Button onClick={onCreateNewPatientHandle}>Add Patient</Button>
                        </div>
                    </div>
                )}

                {informationState === 'ViewPatient' && (
                    <div className={classes['information-container']}>
                        <PatientMedicalBook selectedPatient={selectedPatient} />
                        <PatientJournal selectedPatient={selectedPatient} fetchData={fetchPatients} />
                    </div>
                )}
            </InformationLayout>
        </div>
    );
};

export default Home;
