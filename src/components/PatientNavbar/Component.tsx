import { useContext, useEffect, useState } from 'react';
import classes from './styles.module.scss';

import { IPatient } from '../../interfaces/IPatient.interface';
import { getAge } from '../../utils/date/date.service';
import { deletePatient } from '../../services/firebase/firebase.service';
import { InformationContext } from '../../context';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

function PatientNavbar(): JSX.Element {
    const [patient, setPatient] = useState<IPatient>();

    const { fetchPatients, selectedPatient, informationState, setInformationState, onUpdatePatientHandle } =
        useContext(InformationContext);

    const onToggleEditHandler = (): void => setInformationState('EditPatient');
    const onToggleViewWindowHandle = (): void => setInformationState('ViewPatient');

    useEffect(() => {
        setPatient(() => selectedPatient);
    }, [selectedPatient]);

    const onDeletePatientHandle = async () => {
        deletePatient(patient?.id);
        fetchPatients();
    };

    return (
        <div className={classes['patient-navbar']}>
            <div className={classes.container}>
                <div className={classes['patient-navbar__name']}>
                    {informationState !== 'AddPatient' && patient && `${patient.name}  ${patient.surname}`}
                </div>

                {informationState === 'ViewPatient' && (
                    <div className={classes['patient-navbar__age']}>
                        {patient && `${getAge(patient.birthDate)} years old`}
                    </div>
                )}

                <div className={classes['patient-navbar__buttons']}>
                    {informationState === 'EditPatient' && (
                        <>
                            <Button
                                onClick={onUpdatePatientHandle}
                                endIcon={<SaveIcon />}
                                variant="contained"
                                color="success"
                            >
                                Save
                            </Button>

                            <Button
                                onClick={onToggleViewWindowHandle}
                                endIcon={<CloseIcon />}
                                variant="contained"
                                color="secondary"
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={onDeletePatientHandle}
                                endIcon={<DeleteIcon />}
                                variant="contained"
                                color="error"
                            >
                                Delete
                            </Button>
                        </>
                    )}

                    {informationState === 'ViewPatient' && (
                        <>
                            <Button
                                onClick={onToggleEditHandler}
                                endIcon={<EditIcon />}
                                variant="contained"
                                color="warning"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={onDeletePatientHandle}
                                endIcon={<DeleteIcon />}
                                variant="contained"
                                color="error"
                            >
                                Delete
                            </Button>
                        </>
                    )}

                    {informationState === 'AddPatient' && (
                        <>
                            <Button
                                onClick={onToggleViewWindowHandle}
                                endIcon={<CloseIcon />}
                                variant="contained"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PatientNavbar;
