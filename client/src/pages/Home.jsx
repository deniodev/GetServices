import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceItem from '../components/ServiceItem';
import { Button } from '@/components/ui/button';



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
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find Home {" "} 
        <span className='text-slate-500'>Service/Repair</span> 
        <br /> Near You
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Home Services is the best place to explore for the best home service and repair.
          <br />
          We have a wide range of services for your needs.
        </div>
        <div>          
        </div>
        <Link to={"/search"}>
          <Button>Let's get started...</Button>
        </Link>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerServices && offerServices.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
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
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
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
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleServices.map((service) => (
                <ServiceItem service={service} key={service._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );


}

export default Home