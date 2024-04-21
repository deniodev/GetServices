import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ServiceItem = ({ service }) => {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/user/${service.userRef}`);
        const data = await res.json();
        setAppointment(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointment();
  }, [service.userRef]);

  return (
    <>
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
        <Link to={`/service/${service._id}`}>
          {appointment && (
            <img
              src={
                appointment.avatar ||
                "https://i0.wp.com/florrycreativecare.com/wp-content/uploads/2020/08/blank-profile-picture-mystery-man-avatar-973460.jpg?ssl=1"
              }
              alt="service cover"
              className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
            />
          )}
          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700">
              {service.name}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {service.description}
            </p>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="text-sm text-gray-600 truncate w-full">
                {service.address}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ServiceItem;
