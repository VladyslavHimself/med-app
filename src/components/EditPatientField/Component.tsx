import { Input } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import classes from './styles.module.scss';

interface IProps {
    modifiedObject: object;
    setModifiedObject: Dispatch<SetStateAction<any>>;
}

function EditPatientField({ modifiedObject, setModifiedObject }: IProps): JSX.Element {
    return (
        <div className={classes['edit-field']}>
            {Object.keys(modifiedObject).map((key: string) => {
                if (key === 'birthDate') {
                    return (
                        <Input
                            key={key}
                            onChange={(e) =>
                                setModifiedObject({
                                    ...modifiedObject,
                                    [key]: new Date(e.target.value),
                                })
                            }
                            placeholder={key}
                        />
                    );
                } else {
                    return (
                        <Input
                            key={key}
                            onChange={(e) => setModifiedObject({ ...modifiedObject, [key]: e.target.value })}
                            placeholder={key}
                        />
                    );
                }
            })}
        </div>
    );
}

export default EditPatientField;
