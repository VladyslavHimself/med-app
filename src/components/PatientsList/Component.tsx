import { useEffect, useState } from 'react';
import { IPatient } from '../../interfaces/IPatient.interface';
import PatientCard from '../PatientCard/Component';
import classes from './styles.module.scss';

function PatientsList(patients: any): JSX.Element {
    const [patientsData, setPatientsData] = useState<{ patients: IPatient[] }>(patients);

    useEffect(() => {
        setPatientsData(patients);
    }, [patients]);

    return (
        <div className={classes['patients-list']}>
            {patientsData &&
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
                })}
        </div>
    );
}

export default PatientsList;
