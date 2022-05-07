import { Button, Fab, Input, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import classes from './styles.module.scss';

const inputStyles = {
    input: { color: '#fff' },
    label: { color: '#fff' },
};

// #TODO: need textField comopnent scalability

function PatientJournal({ selectedPatient }: any) {
    return (
        <div className={classes['journal-container']}>
            <div className={classes.journal}>
                <p className={classes.journal__header}>Comments:</p>
                <div className={classes.journal__comments}>comm fields</div>
                <div className={classes['journal__input-field']}>
                    <TextField sx={inputStyles} type="text" variant="filled" placeholder="Add new comment" fullWidth />
                    <Fab sx={{ borderRadius: '0px' }} color="primary" aria-label="add">
                        <SendIcon />
                    </Fab>
                </div>
            </div>
        </div>
    );
}

export default PatientJournal;
