import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

const ServiceItem = ({ service }) => {
  return (
    <>
      <div className="border-solid border-2  shadow-md hover:shadow-2xl transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
        <Link to={`/service/${service._id}`}>
          <img
            src={
              service.coverImg ||
              "https://i0.wp.com/florrycreativecare.com/wp-content/uploads/2020/08/blank-profile-picture-mystery-man-avatar-973460.jpg?ssl=1"
            }
            alt="service cover"
            className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          />

          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-bold">{service.name}</p>
            <div className="flex items-center justify-between">
            <p className="text-sm  font-semibold">{service.title}</p>
            <div className="flex items-center gap-[6px]">
            <Star size={15}/> <span className="font-semibold">3.5</span>
            </div>
             
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={15} />
              <p className="text-sm truncate w-full">{service.city}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ServiceItem;
