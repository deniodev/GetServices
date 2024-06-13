import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroBlack from '../assets/hero-black.png';
import HeroWhite from '../assets/hero-white.png';
import { Button } from '../components/ui/button';
import { FaTools, FaHome, FaLaptopCode } from 'react-icons/fa';
import { GiTeacher, GiPartyPopper } from 'react-icons/gi';
import { RiPaintBrushFill } from 'react-icons/ri';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="relative isolate">
          <svg className="dark:invisible  lg:dark:visible absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
            <defs>
              <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-100">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
            />
          </svg>
          <div className="max-w-screen-xl mx-auto px-6  sm:py-32 lg:flex lg:gap-x-10 lg:px-8 lg:py-20">
            <div className="max-w-2xl mx-auto lg:mx-0 lg:flex-auto">
              <h1 className="max-w-lg text-4xl font-bold tracking-tight sm:text-6xl mt-4 lg:mt-10 ">
                {t('hero')}
              </h1>
              <p className="mt-6 text-lg leading-8 ">
                {t('herop1')}
                <br />
                {t('herop2')}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link to="/search">
                  <Button>{t('getstarted')}</Button>
                </Link>
                <Link to="/about">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6"
                  >
                    {t('learnmore')}
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
              <svg
                viewBox="0 0 366 729"
                role="img"
                className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
              >
                <title>Screenshot</title>
                <defs>
                  <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                    <rect width={316} height={684} rx={36} />
                  </clipPath>
                </defs>
                <path
                  fill="#212325"
                  d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                />
                <path
                  fill="#131415"
                  d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                />
                <foreignObject
                  width={316}
                  height={684}
                  transform="translate(24 24)"
                  clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
                >
                  <img
                    src={HeroBlack}
                    alt="mobilescreen"
                    className="hidden dark:block"
                  />
                  <img
                    src={HeroWhite}
                    alt="mobilescreen"
                    className="dark:hidden"
                  />
                </foreignObject>
              </svg>
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto">
          <div className="">
            <div className="w-full py-12 md:py-12 lg:py-12">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      {t('services')}
                    </h2>
                    <p className="max-w-[900px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                      {t('servicesdesc')}
                    </p>
                  </div>
                </div>
                <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FaTools className="h-12 w-12" />
                    <h3 className="text-xl font-bold">{t('serviceName1')}</h3>
                    <p className="  text-center">{t('serviceDesc1')}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <GiTeacher className="h-12 w-12" />
                    <h3 className="text-xl font-bold">{t('serviceName2')}</h3>
                    <p className="  text-center">{t('serviceDesc2')}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FaLaptopCode className="h-12 w-12" />
                    <h3 className="text-xl font-bold">{t('serviceName3')}</h3>
                    <p className="  text-center">{t('serviceDesc3')}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <GiPartyPopper className="h-12 w-12" />
                    <h3 className="text-xl font-bold">{t('serviceName4')}</h3>
                    <p className="  text-center">{t('serviceDesc4')}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <RiPaintBrushFill className="h-12 w-12" />
                    <h3 className="text-xl font-bold">{t('serviceName5')}</h3>
                    <p className="  text-center">{t('serviceDesc5')}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FaHome className="h-12 w-12" />
                    <h3 className="text-xl font-bold">{t('serviceName6')}</h3>
                    <p className="  text-center">{t('serviceDesc6')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full">
          <section className="w-full py-12 md:py-12 lg:py-12">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  {t('booking')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t('booking1')}
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                  {t('booking2')}
                </p>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  src="https://www.youtube.com/embed/ujA1uBUa88Q?si=_Tzqt8zUiZ5JDtY0"
                  title="How to Book a Service"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <div className="order-last lg:order-first aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  src="https://www.youtube.com/embed/p9Eqi2TwEtQ?si=IbganteWbqCmt5Tp"
                  title="How to Register a Service"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg  bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  {t('register')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {t('register2')}
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                  {t('register3')}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
