import classes from './styles.module.scss';

interface IProps {
    children: React.ReactNode;
}

function DetailedInformationLayout({ children }: IProps): JSX.Element {
    return <div className={classes['detailed-information-layout']}>{children}</div>;
}

export default DetailedInformationLayout;
