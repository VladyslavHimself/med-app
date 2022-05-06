import classes from './styles.module.scss';

interface IProps {
    children: React.ReactNode;
}

function InformationLayout({ children }: IProps): JSX.Element {
    return <div className={classes['information-layout']}>{children}</div>;
}

export default InformationLayout;
