import { Button, TextField } from '@mui/material';
import classes from './styles.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    inputState: string;
    onButtonClickHandler: () => void;
    setInputState: React.Dispatch<React.SetStateAction<string>>;
}

const inputStyles = {
    input: { color: '#fff' },
    label: { color: '#fff' },
};

function ControlForms({ onButtonClickHandler, inputState, setInputState }: IProps): JSX.Element {
    return (
        <div className={classes['search-patient']}>
            <div className={classes['search-field']}>
                <TextField
                    sx={inputStyles}
                    label={'Search'}
                    variant="standard"
                    value={inputState}
                    onChange={(e): void => setInputState(e.target.value)}
                />
                <Button variant="contained" onClick={onButtonClickHandler}>
                    New Patient
                </Button>
            </div>
        </div>
    );
}

export default ControlForms;
