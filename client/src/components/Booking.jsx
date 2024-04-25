import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const Booking = ({ service }) => {
  const [appointment, setAppointment] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

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
      {appointment && (
        <div className="flex flex-col gap-2">
          <p className="">
            Contact{" "}
            <span className="font-semibold">{service.name.toLowerCase()}</span>
          </p>
          <Textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here"
          ></Textarea>

          <Link
            to={`whatsapp://send?phone=${
              service.phone
            }&text=${encodeURIComponent(message)}`}
          >
            <Button className="w-full">Send Message</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Booking;
