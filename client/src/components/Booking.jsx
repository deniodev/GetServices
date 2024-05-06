import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "react-i18next";

const Booking = ({ service }) => {
  const { t } = useTranslation();
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
            <span className="font-semibold">{service.name}</span>
          </p>
          <Textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder={t("yourmessage")}
          ></Textarea>

          <Link
            to={`whatsapp://send?phone=${
              service.phone
            }&text=${encodeURIComponent(message)}`}
          >
            <Button className="w-full">{t("send")}</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Booking;
