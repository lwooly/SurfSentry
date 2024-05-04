import ButtonWithArrow from '@src/components/global/ButtonWithArrow';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <p>Page not found</p>
            <ButtonWithArrow>
            <Link to={'/'}>Home</Link>
            </ButtonWithArrow>
            
        </div>
    );
};

export default NotFoundPage;