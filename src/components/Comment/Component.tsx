import { Timestamp } from 'firebase/firestore';
import { getDateByDefaultFormat } from '../../utils/date/date.service';
import classes from './styles.module.scss';

interface IProps {
    content: string;
    date: Timestamp;
}

function Comment({ content, date }: IProps): JSX.Element {
    return (
        <div className={classes.comment}>
            <h3 className={classes.comment__date}>{getDateByDefaultFormat(date)}</h3>
            <p className={classes.comment__content}>{content}</p>
        </div>
    );
}

export default Comment;
