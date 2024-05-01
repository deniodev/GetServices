import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceItem from "../components/ServiceItem";
import { Button } from "@/components/ui/button";
import { FaTools, FaHome, FaLaptopCode } from "react-icons/fa";
import { GiTeacher, GiPartyPopper } from "react-icons/gi";
import { RiPaintBrushFill } from "react-icons/ri";
import Footer from "@/components/Footer";

const Home = () => {
  const [assistenciaServices, setAssistenciaServices] = useState([]);
  const [domesticosServices, setDomesticosServices] = useState([]);
  const [reformasServices, setReformasServices] = useState([]);
  const [aulasServices, setAulasServices] = useState([]);
  const [techServices, setTechServices] = useState([]);
  const [eventosServices, setEventosServices] = useState([]);

  useEffect(() => {
    const fetchAssistenciaServices = async () => {
      try {
        const res = await fetch(
          "/api/service/get?category=Assistência+Técnica&limit=6"
        );
        const data = await res.json();
        setAssistenciaServices(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDomesticosServices = async () => {
      try {
        const res = await fetch(
          "/api/service/get?category=Serviços+Domésticos&limit=6"
        );
        const data = await res.json();
        setDomesticosServices(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchReformasServices = async () => {
      try {
        const res = await fetch("/api/service/get?category=Reformas&limit=6");
        const data = await res.json();
        setReformasServices(data);
      } catch (error) {
        log(error);
      }
    };

    const fetchAulasServices = async () => {
      try {
        const res = await fetch("/api/service/get?category=Aulas&limit=6");
        const data = await res.json();
        setAulasServices(data);
      } catch (error) {
        log(error);
      }
    };

    const fetchTechServices = async () => {
      try {
        const res = await fetch(
          "/api/service/get?category=Design+e+Tecnologia&limit=6"
        );
        const data = await res.json();
        setTechServices(data);
      } catch (error) {
        log(error);
      }
    };

    const fetchEventosServices = async () => {
      try {
        const res = await fetch("/api/service/get?category=Eventos&limit=6");
        const data = await res.json();
        setEventosServices(data);
      } catch (error) {
        log(error);
      }
    };

    fetchAssistenciaServices();
    fetchAulasServices();
    fetchDomesticosServices();
    fetchEventosServices();
    fetchReformasServices();
    fetchTechServices();
  }, []);
  return (
    <>
      <div>
        <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto">
          <h1 className="font-bold text-4xl lg:text-6x ">
            Discover Premier <br /> Home Services and Repairs in Your Area
          </h1>
          <div className=" text-xl ">
            Unlock a world of top-tier home services tailored to your needs.
            <br />
            From repairs to renovations, we've got you covered.
          </div>
          <div></div>
          <Link to={"/search"}>
            <Button>Get Started</Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {assistenciaServices && assistenciaServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <FaTools size={35} />
                  Assistência Técnica
                </h2>
                <Button variant="link" className="p-0">
                  <Link
                    className=""
                    to={"/search?category=Assistência+Técnica"}
                  >
                    Show more...
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {assistenciaServices.map((service) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          )}
          {domesticosServices && domesticosServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <FaHome size={35} />
                  Servicos Domésticos
                </h2>
                <Button variant="link" className="p-0">
                  <Link
                    className=""
                    to={"/search?category=Serviços+Domésticos"}
                  >
                    Show more...
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {domesticosServices.map((service) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          )}
          {reformasServices && reformasServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <RiPaintBrushFill size={35} />
                  Reformas
                </h2>
                <Button variant="link" className="p-0">
                  <Link className="" to={"/search?category=Reformas"}>
                    Show more...
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {reformasServices.map((service) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          )}
          {aulasServices && aulasServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <GiTeacher size={35} />
                  Aulas
                </h2>
                <Button variant="link" className="p-0">
                  <Link className="" to={"/search?category=Aulas"}>
                    Show more...
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {aulasServices.map((service) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          )}
          {techServices && techServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <FaLaptopCode size={35} />
                  Design e Tecnologia
                </h2>
                <Button variant="link" className="p-0">
                  <Link
                    className=""
                    to={"/search?category=Design+e+Tecnologia"}
                  >
                    Show more...
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {techServices.map((service) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          )}
          {eventosServices && eventosServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <GiPartyPopper size={35} />
                  Eventos
                </h2>
                <Button variant="link" className="p-0">
                  <Link className="" to={"/search?category=Eventos"}>
                    Show more...
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {eventosServices.map((service) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
