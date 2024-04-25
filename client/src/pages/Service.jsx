import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Booking from "../components/Booking";
import Tabs from "./Tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Service() {
  const [tab, setTab] = useState("about");
  SwiperCore.use([Navigation]);
  const [service, setservice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [booking, setBooking] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

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

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {service && !loading && !error && (
        <>
          <div className="lg:col-span-2">
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <div className="flex gap-4 ">
                <img
                  src={service.coverImg}
                  alt="service image"
                  className="max-w-[200px] max-h-[200px] rounded-lg"
                />

                <div className="">
                  <Badge>{service.title}</Badge>

                  <h3 className="text-[22px] leading-9 font-bold ">
                    {service.name}
                  </h3>

                  <div className="flex items-center gap-[6px]">
                    <span
                      className="flex items-center gap-[6px] text-headingColor text-[14px]
                              leading-5 lg:text-[16px] lg:leading-6 font-semibold"
                    >
                      ⭐ 3.6
                    </span>
                    <span
                      className="text-textColor text-[14px]
                              leading-5 lg:text-[16px] lg:leading-6 font-semibold"
                    >
                      10
                    </span>
                  </div>

                  <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                    {service.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <Tabs tab={tab} setTab={setTab} />
            </div>

            <div className="mt-8">
              {tab === "about" && (
                <div>
                  <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                    <p className="">{service.description}</p>
                  </div>
                </div>
              )}

              {tab === "gallery" && (
                <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                  <Carousel className="w-full ">
                    <CarouselContent>
                      {service.imageUrls.map((url, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <img
                                  src={url}
                                  alt={`Image ${index + 1}`}
                                  className="rounded-md"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              )}

              {tab === "reviews" && (
                <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                  <h1>Reviews</h1>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              {currentUser &&
                service.userRef !== currentUser._id &&
                !booking && (
                  <Button onClick={() => setBooking(true)}>
                    Book Appointment
                  </Button>
                )}
              {booking && <Booking service={service} />}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
