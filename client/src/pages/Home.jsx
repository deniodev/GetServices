import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceItem from "../components/ServiceItem";
import { Button } from "@/components/ui/button";
import { FaTools, FaHome, FaLaptopCode } from "react-icons/fa";
import { GiTeacher, GiPartyPopper } from "react-icons/gi";
import { RiPaintBrushFill } from "react-icons/ri";
import Footer from "@/components/Footer";
import Hero from "./Hero";

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [technicalAssistanceServices, setTechnicalAssistanceServices] =
    useState([]);
  const [homeServices, setHomeServices] = useState([]);
  const [reformsServices, setReformsServices] = useState([]);
  const [classesServices, setClassesServices] = useState([]);
  const [techServices, setTechServices] = useState([]);
  const [eventsServices, setEventsServices] = useState([]);

  useEffect(() => {
    const fetchTechnicalAssistanceServices = async () => {
      try {
        const res = await fetch(
          "/api/service/get?category=Assistência+Técnica&limit=8"
        );
        const data = await res.json();
        setTechnicalAssistanceServices(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchHomeServices = async () => {
      try {
        const res = await fetch(
          "/api/service/get?category=Serviços+Domésticos&limit=8"
        );
        const data = await res.json();
        setHomeServices(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchReformsServices = async () => {
      try {
        const res = await fetch("/api/service/get?category=Reformas&limit=8");
        const data = await res.json();
        setReformsServices(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchClassesServices = async () => {
      try {
        const res = await fetch("/api/service/get?category=Aulas&limit=8");
        const data = await res.json();
        setClassesServices(data);
      } catch (error) {
        log(error);
      }
    };

    const fetchTechServices = async () => {
      try {
        const res = await fetch(
          "/api/service/get?category=Design+e+Tecnologia&limit=8"
        );
        const data = await res.json();
        setTechServices(data);
      } catch (error) {
        log(error);
      }
    };

    const fetchEventsServices = async () => {
      try {
        const res = await fetch("/api/service/get?category=Eventos&limit=8");
        const data = await res.json();
        setEventsServices(data);
      } catch (error) {
        log(error);
      }
    };
    fetchTechnicalAssistanceServices();
    fetchHomeServices();
    fetchReformsServices();
    fetchClassesServices();
    fetchTechServices();
    fetchEventsServices();
  }, []);
  return (
    <>
      <div>
        <div className="mx-auto">
          <Hero />
        </div>

        <div className="max-w-screen-xl mx-auto p-3 flex flex-col gap-8 my-10">
          {technicalAssistanceServices &&
            technicalAssistanceServices.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-3xl font-semibold flex gap-2">
                    <FaTools size={35} />
                    {t("technicalassistance")}
                  </h2>
                  <Button variant="link" className="p-0">
                    <Link
                      className=""
                      to={"/search?category=Assistência+Técnica"}
                    >
                      {t("showmore")}
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {technicalAssistanceServices.map((service) => (
                    <ServiceItem service={service} key={service._id} />
                  ))}
                </div>
              </div>
            )}
          {homeServices && homeServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <FaHome size={35} />
                  {t("homeservices")}
                </h2>
                <Button variant="link" className="p-0">
                  <Link
                    className=""
                    to={"/search?category=Serviços+Domésticos"}
                  >
                    {t("showmore")}
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {homeServices.map((service) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          )}
          {reformsServices && reformsServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <RiPaintBrushFill size={35} />
                  {t("reforms")}
                </h2>
                <Button variant="link" className="p-0">
                  <Link className="" to={"/search?category=Reformas"}>
                    {t("showmore")}
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {reformsServices.map((service) => (
                  <ServiceItem service={service} key={service._id} />
                ))}
              </div>
            </div>
          )}
          {classesServices && classesServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <GiTeacher size={35} />
                  {t("classes")}
                </h2>
                <Button variant="link" className="p-0">
                  <Link className="" to={"/search?category=Aulas"}>
                    {t("showmore")}
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {classesServices.map((service) => (
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
                  {t("tech")}
                </h2>
                <Button variant="link" className="p-0">
                  <Link
                    className=""
                    to={"/search?category=Design+e+Tecnologia"}
                  >
                    {t("showmore")}
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
          {eventsServices && eventsServices.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-3xl font-semibold flex gap-2">
                  <GiPartyPopper size={35} />
                  {t("events")}
                </h2>
                <Button variant="link" className="p-0">
                  <Link className="" to={"/search?category=Eventos"}>
                    {t("showmore")}
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {eventsServices.map((service) => (
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
