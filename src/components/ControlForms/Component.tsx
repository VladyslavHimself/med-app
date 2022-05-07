import { Button, TextField } from '@mui/material';
import classes from './styles.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    buttonValue: string;
    inputState: string;
    setInputState: React.Dispatch<React.SetStateAction<string>>;
    onButtonClickHandler: () => void;
}

const inputStyles = {
    input: { color: '#fff' },
    label: { color: '#fff' },
};

function ControlForms({ buttonValue, onButtonClickHandler, inputState, setInputState, ...props }: IProps): JSX.Element {
    return (
        <div className={classes['search-field']} {...props}>
            <TextField
                sx={inputStyles}
                label={'Search'}
                variant="standard"
                value={inputState}
                onChange={(e): void => setInputState(e.target.value)}
            />
            <Button variant="contained" onClick={onButtonClickHandler}>
                {buttonValue}
            </Button>
        </div>
    );
}

export default ControlForms;
