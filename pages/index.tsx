import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import classes from '../scss/pages/index.module.scss';
import { IPatient } from '../src/interfaces/IPatient.interface';
import { addNewPatient, getPatients, updatePatient } from '../src/services/firebase/firebase.service';
import { InformationStateType } from '../src/types/general.types';
import { InformationContext } from '../src/context';
import InformationLayout from '../src/layouts/InformationLayout';
import Sidebar from '../src/layouts/Sidebar';
import EditPatientField from '../src/components/EditPatientField';
import AddPatientField from '../src/components/AddPatientField/Component';
import PatientsList from '../src/components/PatientsList';
import PatientMedicalBook from '../src/components/PatientMedicalBook';
import PatientJournal from '../src/components/PatientJournal';

const newPatientDataTemplate = {
    name: '',
    surname: '',
    birthDate: '',
    gender: '',
    country: '',
    state: '',
    address: '',
    comments: [],
};

const editPatientDataTemplate = {
    birthDate: '',
    gender: '',
    country: '',
    state: '',
    address: '',
};

const Home: NextPage = () => {
    const [patientsData, setPatientsData] = useState<IPatient[]>();
    const [selectedPatient, setSelectedPatient] = useState<IPatient>();
    const [informationState, setInformationState] = useState<InformationStateType>('ViewPatient');
    const [searchInput, setSearchInput] = useState<string>('');
    const [newPatientData, setNewPatientData] = useState<any>(newPatientDataTemplate);
    const [editPatientTemplate, setEditPatientTemplate] = useState<any>(editPatientDataTemplate);

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

    const onCreatePatientHandle = (): void => {
        const incapsulatedData = {
            comments: [],
        };

        addNewPatient(Object.assign(newPatientData, incapsulatedData));
        fetchPatients();
        setInformationState('ViewPatient');
    };
    const onUpdatePatientHandle = (): void => {
        Object.keys(editPatientTemplate).forEach((key) => {
            if (editPatientTemplate[key] === '') {
                delete editPatientTemplate[key];
            }
        });

        updatePatient(selectedPatient?.id, selectedPatient!, editPatientTemplate);
        setInformationState('ViewPatient');
        setEditPatientTemplate(editPatientDataTemplate);
        fetchPatients();
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
                    onUpdatePatientHandle,
                }}
            >
                <InformationLayout>
                    {informationState === 'EditPatient' && (
                        <EditPatientField
                            modifiedObject={editPatientTemplate}
                            setModifiedObject={setEditPatientTemplate}
                        />
                    )}

                    {informationState === 'AddPatient' && (
                        <AddPatientField
                            newPatientData={newPatientData}
                            setNewPatientData={setNewPatientData}
                            onCreatePatientHandle={onCreatePatientHandle}
                        />
                    )}

                    {informationState === 'ViewPatient' && (
                        <>
                            <PatientMedicalBook />
                            <PatientJournal />
                        </>
                    )}
                </InformationLayout>
            </InformationContext.Provider>
        </div>
    );
};

export default Home;
