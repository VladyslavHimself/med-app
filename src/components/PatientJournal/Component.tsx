import { Fab, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import classes from './styles.module.scss';
import Comment from '../Comment/Component';
import { IComment } from '../../interfaces/IPatient.interface';
import { useState } from 'react';
import { updatePatient } from '../../services/firebase/firebase.service';

const inputStyles = {
    input: { color: '#fff' },
    label: { color: '#fff' },
};

// #TODO: need textField comopnent scalability

function PatientJournal({ selectedPatient, fetchData }: any) {
    const [commentInput, setCommentInput] = useState<string>('');

    const onAddCommentHandle = (): void => {
        if (commentInput.length) {
            setCommentInput('');

            const upd = {
                ...selectedPatient,
                comments: [...selectedPatient.comments, { comment: commentInput, date: new Date() }],
            };
            updatePatient(selectedPatient.id, selectedPatient, upd);
            fetchData();
        }
    };

    return (
        <div className={classes['journal-container']}>
            <div className={classes.journal}>
                <p className={classes.journal__header}>Comments:</p>
                <div className={classes.journal__comments}>
                    {selectedPatient?.comments?.length ? (
                        selectedPatient.comments
                            .map((comment: IComment) => <Comment content={comment.comment} date={comment.date} />)
                            .reverse()
                    ) : (
                        <h3>No comments :(</h3>
                    )}
                </div>
                <div className={classes['journal__input-field']}>
                    <TextField
                        required
                        value={commentInput}
                        onChange={(e: any) => setCommentInput(e.target.value)}
                        sx={inputStyles}
                        type="text"
                        variant="filled"
                        placeholder="Add new comment"
                        fullWidth
                    />
                    <Fab onClick={onAddCommentHandle} sx={{ borderRadius: '0px' }} color="primary" aria-label="add">
                        <SendIcon />
                    </Fab>
                </div>
            </div>
        </div>
    );
}

export default PatientJournal;
