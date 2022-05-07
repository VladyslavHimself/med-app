import { Fab, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import classes from './styles.module.scss';
import Comment from '../Comment/Component';
import { IComment, IPatient } from '../../interfaces/IPatient.interface';

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
                <div className={classes.journal__comments}>
                    {selectedPatient?.comments?.length ? (
                        selectedPatient.comments.map((comment: IComment) => (
                            <Comment content={comment.comment} date={comment.date} />
                        ))
                    ) : (
                        <h3>No comments :(</h3>
                    )}
                </div>
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
