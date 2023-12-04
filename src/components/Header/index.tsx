import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from '../../assets/spacex-logo.png';

const Header = () => {
  const navigate = useNavigate();

  const isSmallDevice = useMediaQuery({
    query: '(max-width: 576px)',
  });

  return (
    <div className="flex justify-between items-center px-[5%] py-7 border-b-[0.5px] border-black border-solid">
      <img
        src={Logo}
        alt="SpaceX"
        className="w-[250px] h-[48px] cursor-pointer"
        onClick={() => navigate('/')}
      />
      <div className="flex gap-5">
        <Button
            variant="contained"
            onClick={() => navigate('/')}
            className={`${isSmallDevice ? '!w-[92px]' : '!w-[141px] !h-[48px]'}`}
        >
            Get Started
        </Button>
      </div>
    </div>
  );
};

export default Header;
