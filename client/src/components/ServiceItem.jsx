import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const ServiceItem = ({ service }) => {
  return (
    <>
      <div className="border-solid border-2  shadow-md hover:shadow-2xl dark:hover:shadow-[0px_0px_5px_2px_#fff] transition-shadow overflow-hidden rounded-lg w-full sm:w-[302px]">
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
            <AiFillStar size={15}/> <span className="font-semibold">{service.averageRating}</span>
            </div>
             
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt  size={12} />
              <p className="text-sm truncate w-full">{service.city}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ServiceItem;