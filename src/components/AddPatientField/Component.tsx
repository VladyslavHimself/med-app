import classes from './styles.module.scss';

import { Button, Input } from '@mui/material';

function AddPatientField({ setNewPatientData, newPatientData, onCreatePatientHandle }: any): JSX.Element {
    return (
        <div className={classes['edit-field']}>
            {Object.keys(newPatientData).map((key: string) => {
                if (key === 'birthDate') {
                    return (
                        <Input
                            key={key}
                            onChange={(e) =>
                                setNewPatientData({
                                    ...newPatientData,
                                    [key]: new Date(e.target.value),
                                })
                            }
                            placeholder={key}
                        />
                    );
                } else if (key === 'comments') {
                } else {
                    return (
                        <Input
                            key={key}
                            onChange={(e) => setNewPatientData({ ...newPatientData, [key]: e.target.value })}
                            placeholder={key}
                        />
                    );
                }
            })}

            <Button onClick={onCreatePatientHandle}>Add Patient</Button>
        </div>
    );
}

export default AddPatientField;
