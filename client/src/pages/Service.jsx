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
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AiFillStar } from "react-icons/ai";
import { formateDate } from "@/utils/formateDate";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Service() {
  const { t } = useTranslation();
  const [tab, setTab] = useState("about");
  SwiperCore.use([Navigation]);
  const [service, setservice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [booking, setBooking] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const { serviceId } = useParams();

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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error("Rating & Review Fields are required");
      }

      const res = await fetch(`/api/service/${serviceId}/reviews`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      toast.success(result.message);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

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
                      <AiFillStar /> {service.averageRating}
                    </span>
                    <span
                      className="text-textColor text-[14px]
                              leading-5 lg:text-[16px] lg:leading-6 font-semibold"
                    >
                      ({service.totalRating})
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
                <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 items-center">
                  <Carousel className="w-full max-w-xl ">
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
                  <div>
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-3xl font-bold">
                          {t("allreviews")} ({service.totalRating})
                        </h1>

                        {service.reviews?.map((review, index) => (
                          <div
                            key={index}
                            className="flex justify-between gap-10 mb-[30px] mt-4"
                          >
                            <div className="flex gap-3">
                              <Avatar className="w-10 h-10 border">
                                <AvatarImage
                                  alt="user image"
                                  src={review?.user?.avatar}
                                />
                              </Avatar>

                              <div className="">
                                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                                  {review?.user?.username}
                                </h5>
                                <p className="text-[14px] leadding-6 text-textColor">
                                  {formateDate(review?.createdAt)}
                                </p>
                                <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                                  {review.reviewText}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-1">
                              {[...Array(review?.rating).keys()].map(
                                (_, index) => (
                                  <AiFillStar key={index} />
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold">{t("leavereview")}</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                        {t("leavereview1")}
                        </p>
                        <form className="mt-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="rating">{t("rating")}</Label>

                            <div>
                              {[...Array(5).keys()].map((_, index) => {
                                index += 1;

                                return (
                                  <button
                                    key={index}
                                    type="button"
                                    className={`${
                                      index <= ((rating && hover) || hover)
                                        ? "text-yellowColor"
                                        : "text-gray-400"
                                    } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                    onDoubleClick={() => {
                                      setHover(0);
                                      setRating(0);
                                    }}
                                  >
                                    <span>
                                      <AiFillStar />
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="review">{t("review")}</Label>
                            <Textarea
                              id="review"
                              placeholder="Enter your review"
                              onChange={(e) => setReviewText(e.target.value)}
                              required
                            />
                          </div>
                          <Button
                            className=""
                            type="submit"
                            onClick={handleSubmitReview}
                          >
                            {t("submitreview")}
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
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
                    {t("booknow")}
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