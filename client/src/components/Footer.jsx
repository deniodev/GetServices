import {Link} from "react-router-dom"
import { BsTwitterX, BsYoutube, BsGithub, BsFacebook  } from "react-icons/bs";

export default function Footer() {
    const year = new Date().getFullYear();
  return (
    <div className="pb-4  border">
      <div className="text-center mt-4 text-sm pb-2 ">
        Want to contribute? Find it on <Link to='https://github.com/deniodev/home-services' target="_blank"><span className=" hover:underline font-semibold">GitHub</span></Link>
      </div>
      <div className="flex items-center justify-center space-x-4 mb-2 text-3xl">
        <Link to='https://github.com/deniodev' target="_blank" className="hover:scale-110 transition-transform duration-500" >
          <BsGithub />
        </Link>
        <Link to='/' target="_blank" className="hover:scale-110 transition-transform duration-500">
          <BsFacebook  />
        </Link>
        <Link to='/' target="_blank" className="hover:scale-110 transition-transform duration-500">
          <BsTwitterX />
        </Link>
        <Link to='/' target="_blank" lassName="hover:scale-110 transition-transform duration-500">
          <BsYoutube />
        </Link>
      </div>
      <p className="text-xs text-center"> Copyright © {year} DASN Lda.</p>
    </div>
  )
}