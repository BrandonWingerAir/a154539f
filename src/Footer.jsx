import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser, faGear } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
  return (
    <footer>
        <div>
            <div className='bottom-nav-item'>
                <FontAwesomeIcon icon={faPhone} size='xl'/>
                <div className="notif-bubble">
                    <p>12</p>
                </div>
                <div className="active-bottom-nav"></div>
            </div>

            <FontAwesomeIcon icon={faUser} size='xl'/>

            <div className='circles-btn'>
                <div className='green-circle'>
                    <div className="circles-grid">
                        <span/><span/><span/>
                        <span/><span/><span/>
                        <span/><span/><span/>
                    </div>
                </div>
            </div>

            <FontAwesomeIcon icon={faGear} size='xl'/>

            <div className='circle-btn'>
                <span/>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
