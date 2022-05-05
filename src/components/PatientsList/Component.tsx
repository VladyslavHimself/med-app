import { useEffect, useState } from 'react';
import { IPatient } from '../../interfaces/IPatient.interface';
import PatientCard from '../PatientCard/Component';
import classes from './styles.module.scss';
import HashLoader from 'react-spinners/HashLoader';

function PatientsList(patients: any): JSX.Element {
    const [patientsData, setPatientsData] = useState<{ patients: IPatient[] }>(patients);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setPatientsData(patients);
    }, [patients]);

    return (
        <div className={classes['patients-list']}>
            {isLoading ? (
                <div className={classes.wrapper}>
                    <HashLoader color={'#f4f4f4'} loading={isLoading} size={50} />
                </div>
            ) : (
                patientsData &&
                patientsData.patients?.map((patient: IPatient) => {
                    return (
                        <PatientCard
                            key={patient.name + patient.surname + patient.birthDate + Math.random()}
                            name={patient.name}
                            surname={patient.surname}
                            birthDate={patient.birthDate}
                            gender={patient.gender}
                            country={patient.country}
                            address={patient.address}
                            state={patient.state}
                        />
                    );
                })
            )}
        </div>
    );
}

export default PatientsList;
