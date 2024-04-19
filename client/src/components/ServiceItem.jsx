import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const ServiceItem = ({ service }) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
    <Link to={`/service/${service._id}`}>
      <img
        src={
          service.imageUrls[0] ||
          'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
        }
        alt='service cover'
        className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
      />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>
          {service.name}
        </p>
        <div className='flex items-center gap-1'>
          <MdLocationOn className='h-4 w-4 text-green-700' />
          <p className='text-sm text-gray-600 truncate w-full'>
            {service.address}
          </p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'>
          {service.description}
        </p>
        <p className='text-slate-500 mt-2 font-semibold '>
          $
          {service.offer
            ? service.discountPrice.toLocaleString('en-US')
            : service.regularPrice.toLocaleString('en-US')}
          {service.type === 'rent' && ' / month'}
        </p>
        <div className='text-slate-700 flex gap-4'>
          <div className='font-bold text-xs'>
            {service.bedrooms > 1
              ? `${service.bedrooms} beds `
              : `${service.bedrooms} bed `}
          </div>
          <div className='font-bold text-xs'>
            {service.bathrooms > 1
              ? `${service.bathrooms} baths `
              : `${service.bathrooms} bath `}
          </div>
        </div>
      </div>
    </Link>
  </div>
);
}

export default ServiceItem