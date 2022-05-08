import classes from './styles.module.scss';
import PatientNavbar from '../../components/PatientNavbar';

interface IProps {
    children: React.ReactNode;
}

function InformationLayout({ children }: IProps): JSX.Element {
    return (
        <div className={classes['information-layout']}>
            <PatientNavbar />
            <div className={classes['information-container']}>{children}</div>
        </div>
    );
}

export default InformationLayout;
