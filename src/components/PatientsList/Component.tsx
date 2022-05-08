import React, { useEffect, useState } from 'react';
import { IPatient } from '../../interfaces/IPatient.interface';
import PatientCard from '../PatientCard/Component';
import classes from './styles.module.scss';
import HashLoader from 'react-spinners/HashLoader';

interface IProps {
    patients: () => IPatient[] | undefined;
    onPatientClickHandler: (patient: IPatient) => void;
}

function PatientsList({ patients, onPatientClickHandler }: IProps): JSX.Element {
    const [patientsData, setPatientsData] = useState<IPatient[]>(patients);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => setIsLoading(false), []);
    useEffect(() => setPatientsData(patients), [patients]);

    return (
        <div className={classes['patients-list']}>
            {isLoading ? (
                <div className={classes.wrapper}>
                    <HashLoader color={'#f4f4f4'} loading={isLoading} size={50} />
                </div>
            ) : (
                patientsData &&
                patientsData.map((patient: IPatient) => {
                    return (
                        <div role="button" onClick={() => onPatientClickHandler(patient)}>
                            <PatientCard
                                key={patient.id}
                                id={patient.id}
                                name={patient.name}
                                surname={patient.surname}
                                birthDate={patient.birthDate}
                                gender={patient.gender}
                                country={patient.country}
                                address={patient.address}
                                state={patient.state}
                            />
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default PatientsList;
