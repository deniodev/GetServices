import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import YoutubeEmbed from '../components/YoutubeEmbed';

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div className="p-3 max-w-screen-xl mx-auto">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            GetServices
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">{t('aboutp1')}</p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">{t('aboutp2')}</p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">{t('aboutp3')}</p>

          <div className="max-w-screen-xl mx-auto mt-4 flex flex-col gap-4">
            <YoutubeEmbed embedId="sNb9g7cL6hY?si=yzt-a8e_vmwN91GY" />
            <YoutubeEmbed embedId="sNb9g7cL6hY?si=yzt-a8e_vmwN91GY" />
          </div>

          <h2 className="mt-10 scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl ">
            {t('faq')}
          </h2>

          <div className="[&:not(:first-child)]:mt-6">
            <Accordion type="single" collapsible className="w-full ">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t('faq1')}</AccordionTrigger>
                <AccordionContent>{t('faq1a')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t('faq2')}</AccordionTrigger>
                <AccordionContent>{t('faq2a')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t('faq3')}</AccordionTrigger>
                <AccordionContent>{t('faq3a')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t('faq4')}</AccordionTrigger>
                <AccordionContent>{t('faq4a')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>{t('faq5')}</AccordionTrigger>
                <AccordionContent>{t('faq5a')}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
