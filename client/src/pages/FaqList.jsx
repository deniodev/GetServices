import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const FaqList = () => {
  const { t } = useTranslation();
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center p-2">{t('faq')}</h1>
      <Accordion type="single" collapsible className="w-full">
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
  );
};

export default FaqList;
