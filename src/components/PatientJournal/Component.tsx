import { Fab, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import classes from './styles.module.scss';
import Comment from '../Comment/Component';
import { IComment } from '../../interfaces/IPatient.interface';
import { useContext, useState } from 'react';
import { updatePatient } from '../../services/firebase/firebase.service';
import { InformationContext } from '../../context';

const inputStyles = {
    input: { color: '#fff' },
    label: { color: '#fff' },
};

// #TODO: need textField comopnent scalability

function PatientJournal() {
    const [commentInput, setCommentInput] = useState<string>('');

    const { fetchPatients, selectedPatient } = useContext(InformationContext);

    const onAddCommentHandle = (): void => {
        if (commentInput.length) {
            const upd = {
                ...selectedPatient,
                comments: [...selectedPatient.comments, { comment: commentInput, date: new Date() }],
            };

            setCommentInput('');

            updatePatient(selectedPatient.id, selectedPatient, upd);
            fetchPatients();
        }
    };

    return (
        <div className={classes['journal-container']}>
            <div className={classes.journal}>
                <p className={classes.journal__header}>Comments:</p>
                <div className={classes.journal__comments}>
                    {selectedPatient?.comments?.length ? (
                        selectedPatient.comments
                            .map((comment: IComment) => (
                                <Comment
                                    key={comment.comment + Math.random() * 20}
                                    content={comment.comment}
                                    date={comment.date}
                                />
                            ))
                            .reverse()
                    ) : (
                        <div className={classes.wrapper}>
                            <span>No comments :(</span>
                        </div>
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
