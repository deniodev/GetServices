import { Link } from 'react-router-dom';
import {
  BsYoutube,
  BsGithub,
  BsFacebook,
  BsInstagram,
  BsTiktok,
} from 'react-icons/bs';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="pb-4  border mt-auto">
      <div className="flex items-center justify-center space-x-4 mb-2 text-3xl mt-4 ">
        <Link
          to="https://github.com/deniodev/get-services"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsGithub size={20} />
        </Link>
        <Link
          to="/"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsFacebook size={20} />
        </Link>
        <Link
          to="/"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsInstagram size={20} />
        </Link>
        <Link
          to="/"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsYoutube size={20} />
        </Link>
        <Link
          to="https://www.youtube.com/@GetServices"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsTiktok size={20} />
        </Link>
      </div>

      <p className="text-xs text-center">
        {' '}
        ©{year} Developed by{' '}
        <Link
          to="https://denio-portfolio.vercel.app/"
          target="_blank"
          className="hover:underline font-semibold"
        >
          Denio Nhanale
        </Link>
      </p>
    </div>
  );
};
export default Footer;
