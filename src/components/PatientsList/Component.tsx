import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { IPatient } from '../../interfaces/IPatient.interface';
import PatientCard from '../PatientCard/Component';
import classes from './styles.module.scss';
import HashLoader from 'react-spinners/HashLoader';

interface IProps {
    patients: () => IPatient[] | undefined;
    onPatientClickHandler: (patient: IPatient) => void;
}

function PatientsList({ patients, onPatientClickHandler }: IProps): JSX.Element {
    const [patientsData, setPatientsData] = useState<any>(patients);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => setIsLoading(false), []);
    useEffect(() => setPatientsData(patients), [patients]);

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: -10,
        },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.3 * i,
                duration: 1,
                type: 'spring',
            },
        }),
    };

    return (
        <div className={classes['patients-list']}>
            {isLoading ? (
                <div className={classes.wrapper}>
                    <HashLoader color={'#f4f4f4'} loading={isLoading} size={50} />
                </div>
            ) : (
                patientsData &&
                patientsData.map((patient: IPatient, index: number) => {
                    return (
                        <motion.div
                            key={patient.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            role="button"
                            onClick={() => onPatientClickHandler(patient)}
                        >
                            <PatientCard
                                id={patient.id}
                                name={patient.name}
                                surname={patient.surname}
                                birthDate={patient.birthDate}
                                gender={patient.gender}
                                country={patient.country}
                                address={patient.address}
                                state={patient.state}
                            />
                        </motion.div>
                    );
                })
            )}
        </div>
    );
}

export default PatientsList;
