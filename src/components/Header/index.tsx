import { useMediaQuery } from 'react-responsive';
import Button from '@mui/material/Button';
import Logo from '../../assets/images/spacex-logo.png';

const Header = () => {
  const isSmallDevice = useMediaQuery({
    query: '(max-width: 576px)',
  });

  return (
    <div className="flex justify-between items-center px-[5%] py-7">
      <img
        src={Logo}
        alt="SpaceX"
        className="w-[250px] h-[48px] cursor-pointer"
      />
      <div className="flex gap-5">
        <Button
            color='warning'
            variant='outlined'
            className={`${isSmallDevice ? '!w-[92px]' : '!w-[141px] !h-[48px]'}`}
        >
            Get Started
        </Button>
      </div>
    </div>
  );
};

export default Header;
