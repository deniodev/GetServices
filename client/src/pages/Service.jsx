import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {useSelector} from 'react-redux';
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";
import Booking from "../components/Booking";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Service() {
  SwiperCore.use([Navigation]);
  const [service, setservice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [booking, setBooking] = useState(false);
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);
  const [appointment, setAppointment] = useState(null);


  useEffect(() => {
    const fetchservice = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/service/get/${params.serviceId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setservice(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchservice();

  }, [params.serviceId]);

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
  }, [service]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {appointment && (
            <div className="flex items-center gap-5 mb-4">
              <img
              src={
                appointment.avatar ||
                "https://i0.wp.com/florrycreativecare.com/wp-content/uploads/2020/08/blank-profile-picture-mystery-man-avatar-973460.jpg?ssl=1"
              }
              alt="service cover"
              className="w-[200px] h-[200px]"
            />
            </div>            
          )}
      {service && !loading && !error && (
        <div>
          <Swiper navigation>
            {service.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
             <p className="text-slate-800 ">
              <span className="font-semibold text-black">Description - </span>
              {service.description}
            </p>
            
            {currentUser && service.userRef !== currentUser._id &&  !booking && (
                  <button 
                  onClick={()=>setBooking(true)}
                  className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                      Book Appointment
                  </button>
            )}
            {booking && <Booking service={service}/>}          
          </div>
        </div>
      )}
    </main>
  );
}
