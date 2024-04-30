import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceItem from '../components/ServiceItem';
import { Button } from '@/components/ui/button';
import { FaTools, FaHome  } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { RiPaintBrushFill } from "react-icons/ri";
import Footer from '@/components/Footer';


const Home = () => {
  const [offerServices, setOfferServices] = useState([]);
  const [saleServices, setSaleServices] = useState([]);
  const [rentServices, setRentServices] = useState([]);
  console.log(offerServices);
  useEffect(() => {
    const fetchOfferServices = async () => {
      try {
        const res = await fetch('/api/service/get?offer=true&limit=4');
        const data = await res.json();
        setOfferServices(data);
        fetchRentServices();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentServices = async () => {
      try {
        const res = await fetch('/api/service/get?type=rent&limit=4');
        const data = await res.json();
        setRentServices(data);
        fetchSaleServices();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleServices = async () => {
      try {
        const res = await fetch('/api/service/get?type=sale&limit=4');
        const data = await res.json();
        setSaleServices(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferServices();
  }, []);
  return (
    <><div>
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto">
        <h1 className='font-bold text-4xl lg:text-6x '>
          Discover Premier <br /> Home Services and Repairs in Your Area
        </h1>
        <div className=" text-xl ">
          Unlock a world of top-tier home services tailored to your needs.
          <br />
          From repairs to renovations, we've got you covered.
        </div>
        <div>
        </div>
        <Link to={"/search"}>
          <Button>Get Started</Button>
        </Link>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerServices && offerServices.length > 0 && (
          <div className=''>
            <div className='my-3'>

              <h2 className='text-3xl font-semibold flex gap-2'><FaTools size={35} />Assistência Técnica</h2>
              <Button variant="link" className="p-0">
                <Link className='' to={'/search?offer=true'}>Show more...</Link>
              </Button>

            </div>
            <div className='flex flex-wrap gap-4'>
              {offerServices.map((service) => (
                <ServiceItem service={service} key={service._id} />
              ))}
            </div>
          </div>
        )}
        {rentServices && rentServices.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold flex gap-2'><FaHome size={35} />Servicos Domésticos</h2>
              <Button variant="link" className="p-0">
                <Link className='' to={'/search?type=rent'}>Show more...</Link>
              </Button>

            </div>
            <div className='flex flex-wrap gap-4'>
              {rentServices.map((service) => (
                <ServiceItem service={service} key={service._id} />
              ))}
            </div>
          </div>
        )}
        {saleServices && saleServices.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold flex gap-2'><RiPaintBrushFill size={35} />Reformas</h2>
              <Button variant="link" className="p-0">
                <Link className='' to={'/search?type=sale'}>Show more...</Link>
              </Button>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleServices.map((service) => (
                <ServiceItem service={service} key={service._id} />
              ))}
            </div>
          </div>
        )}
        {saleServices && saleServices.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold flex gap-2'><GiTeacher size={35} />Aulas</h2>
              <Button variant="link" className="p-0">
                <Link className='' to={'/search?type=sale'}>Show more...</Link>
              </Button>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleServices.map((service) => (
                <ServiceItem service={service} key={service._id} />
              ))}
            </div>
          </div>
        )}


      </div>
    </div><Footer /></>
  );


}

export default Home