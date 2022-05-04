import PatientCard from '../PatientCard/Component';
import classes from './styles.module.scss';

function PatientsList(): JSX.Element {
    return (
        <div className={classes['patients-list']}>
            <PatientCard
                id={0}
                name={'Vlad'}
                surname={'Lutchyn'}
                birthDate={new Date('13 March 2002')}
                gender={'male'}
                country={'USA'}
                address={'114 Fairview'}
            />
        </div>
    );
}

export default PatientsList;
