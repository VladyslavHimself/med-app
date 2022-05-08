import type { NextPage } from 'next';
import Head from 'next/head';
import classes from '../scss/pages/index.module.scss';
import { useEffect, useState } from 'react';
import { addNewPatient, getPatients, updatePatient } from '../src/services/firebase/firebase.service';
import { convertDateToTimestamp } from '../src/utils/date/date.service';
import { IPatient } from '../src/interfaces/IPatient.interface';
import InformationLayout from '../src/layouts/InformationLayout';
import PatientsList from '../src/components/PatientsList';
import PatientMedicalBook from '../src/components/PatientMedicalBook';
import PatientJournal from '../src/components/PatientJournal';
import Sidebar from '../src/layouts/Sidebar';
import { Button, Input } from '@mui/material';
import { InformationStateType } from '../src/types/general.types';
import { InformationContext } from '../src/context';

const Home: NextPage = () => {
    const [patientsData, setPatientsData] = useState<IPatient[]>();
    const [selectedPatient, setSelectedPatient] = useState<IPatient>();
    const [informationState, setInformationState] = useState<InformationStateType>('ViewPatient');
    const [searchInput, setSearchInput] = useState<string>('');
    const [editablePatientData, setEditablePatientData] = useState<any>();
    const [newPatientData, setNewPatientData] = useState<any>();

    const fetchPatients = async (): Promise<void> => {
        const patients: IPatient[] = await getPatients();
        setPatientsData(patients);
        setSelectedPatient(patients[0]);
    };

    const filterPatients = (): IPatient[] | undefined =>
        patientsData?.filter((patient: IPatient) => {
            const fullname = `${patient.name} ${patient.surname}`;
            return fullname.toLowerCase().includes(searchInput.toLowerCase());
        });

    useEffect(() => {
        fetchPatients();
    }, []);

    const onSelectPatientHandle = (patient: IPatient): void => setSelectedPatient(patient);

    const onUpdatePatientHandle = (): void => {
        updatePatient(selectedPatient?.id, selectedPatient!, editablePatientData);
        setInformationState('ViewPatient');
        fetchPatients();
    };

    const onCreatePatientHandle = (): void => {
        addNewPatient(newPatientData);
        fetchPatients();
        setInformationState('ViewPatient');
    };

    const onSwitchStateToPatientAddHandle = (): void => setInformationState('AddPatient');

    return (
        <div className={classes.wrapper}>
            <Head>
                <title>VITech Med App</title>
            </Head>

            <Sidebar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onButtonClickHandler={onSwitchStateToPatientAddHandle}
            >
                <PatientsList onPatientClickHandler={onSelectPatientHandle} patients={filterPatients} />
            </Sidebar>
            <InformationContext.Provider
                value={{
                    informationState,
                    setInformationState,
                    selectedPatient,
                    fetchPatients,
                    onCreatePatientHandle,
                    onUpdatePatientHandle,
                }}
            >
                <InformationLayout>
                    {informationState === 'EditPatient' && (
                        <div className={classes['edit-field']}>
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
                                value={editablePatientData?.gender}
                                placeholder="Sex"
                            />
                            <Input
                                onChange={(e) =>
                                    setEditablePatientData({ ...editablePatientData, country: e.target.value })
                                }
                                value={editablePatientData?.country}
                                placeholder="Country"
                            />
                            <Input
                                onChange={(e) =>
                                    setEditablePatientData({ ...editablePatientData, state: e.target.value })
                                }
                                value={editablePatientData?.state}
                                placeholder="State"
                            />
                            <Input
                                onChange={(e) =>
                                    setEditablePatientData({ ...editablePatientData, address: e.target.value })
                                }
                                value={editablePatientData?.address}
                                placeholder="Address"
                            />
                        </div>
                    )}

                    {informationState === 'AddPatient' && (
                        <div className={classes['edit-field']}>
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

                            <Button onClick={onCreatePatientHandle}>Add Patient</Button>
                        </div>
                    )}

                    {informationState === 'ViewPatient' && (
                        <>
                            <PatientMedicalBook selectedPatient={selectedPatient} />
                            <PatientJournal selectedPatient={selectedPatient} fetchData={fetchPatients} />
                        </>
                    )}
                </InformationLayout>
            </InformationContext.Provider>
        </div>
    );
};

export default Home;

// Винести в окремий хук

// const [fetchPatients, isLoading, error] = useFetch(async () => {
//     const patients: IPatient[] = await getPatients();
//     setPatientsData(patients);
//     setSelectedPatient(patients[0]);
// });
