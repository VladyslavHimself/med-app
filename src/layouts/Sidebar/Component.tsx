import classes from './styles.module.scss';

interface IProps {
    children: React.ReactNode;
}

function Sidebar({ children }: IProps): JSX.Element {
    return (
        <div className={classes.sidebar}>
            <div className={classes.container}>{children}</div>
        </div>
    );
}

export default Sidebar;
