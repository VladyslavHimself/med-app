import { useEffect, useState } from 'react';

import classes from './styles.module.scss';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { IPatient } from '../../interfaces/IPatient.interface';

import { getAge } from '../../utils/date/date.service';

function PatientNavbar({ selectedPatient }: any): JSX.Element {
    const [patient, setPatient] = useState<IPatient>();

    useEffect(() => {
        setPatient(() => selectedPatient);
    }, [selectedPatient]);

    return (
        <div className={classes['patient-navbar']}>
            <div className={classes.container}>
                <div className={classes['patient-navbar__name']}>{patient && `${patient.name} ${patient.surname}`}</div>
                <div className={classes['patient-navbar__age']}>
                    {patient && `${getAge(patient.birthDate)} years old`}
                </div>

                <div className={classes['patient-navbar__buttons']}>
                    <Button endIcon={<EditIcon />} variant="contained" color="warning">
                        Edit
                    </Button>
                    <Button endIcon={<DeleteIcon />} variant="contained" color="error">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PatientNavbar;
