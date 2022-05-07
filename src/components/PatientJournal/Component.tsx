import classes from './styles.module.scss';

import { IPatient } from '../../interfaces/IPatient.interface';

function PatientJournal({ selectedPatient }: any) {
    return (
        <div className={classes.journal}>
            <h1>Patient Journal</h1>
        </div>
    );
}

export default PatientJournal;
