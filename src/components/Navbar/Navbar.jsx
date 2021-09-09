
import s from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div>
                <a href="https://www.youtube.com/watch?v=00ZNuBIE-pM&ab_channel=IT-KAMASUTRA" className={s.item}>Profile</a>
            </div>
            <div>
                <a href="https://www.youtube.com/watch?v=00ZNuBIE-pM&ab_channel=IT-KAMASUTRA" className={`${s.item} ${s.active}`}>Messages</a>
            </div>
            <div>
                <a href="https://www.youtube.com/watch?v=00ZNuBIE-pM&ab_channel=IT-KAMASUTRA" className={s.item}>News</a>
            </div>
            <div>
                <a href="https://www.youtube.com/watch?v=00ZNuBIE-pM&ab_channel=IT-KAMASUTRA" className={s.item}>Music</a>
            </div>
            <div>
                <a href="https://www.youtube.com/watch?v=00ZNuBIE-pM&ab_channel=IT-KAMASUTRA" className={s.item}>Settings</a>
            </div>
        </nav>
    );
}

export default Navbar;