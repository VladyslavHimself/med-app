import { Dispatch, SetStateAction } from 'react';
import ControlForms from '../../components/ControlForms';
import classes from './styles.module.scss';

interface IProps {
    children: React.ReactNode;
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
    onButtonClickHandler: () => void;
}

function Sidebar({ children, searchInput, setSearchInput, onButtonClickHandler }: IProps): JSX.Element {
    return (
        <div className={classes.sidebar}>
            <div className={classes.container}>
                <ControlForms
                    inputState={searchInput}
                    setInputState={setSearchInput}
                    onButtonClickHandler={onButtonClickHandler}
                />
                {children}
            </div>
        </div>
    );
}

export default Sidebar;
