import { Link } from 'react-router-dom';
import { BsYoutube, BsGithub, BsFacebook, BsInstagram } from 'react-icons/bs';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="pb-4  border">
      <div className="flex items-center justify-center space-x-4 mb-2 text-3xl mt-4">
        <Link
          to="https://github.com/deniodev/moz-services"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsGithub />
        </Link>
        <Link
          to="/"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsFacebook />
        </Link>
        <Link
          to="/"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsInstagram />
        </Link>
        <Link
          to="/"
          target="_blank"
          className="hover:scale-110 transition-transform duration-500"
        >
          <BsYoutube />
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
}
