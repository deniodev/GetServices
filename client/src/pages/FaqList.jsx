import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqList = () => {
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center p-2">FAQ</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How can I find a professional suitable for me?</AccordionTrigger>
          <AccordionContent>
          To find a suitable professional, you can start by browsing our platform and filtering results based on your location, area of expertise and reviews from previous clients. We are also available to help you find the ideal professional to meet your specific needs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What are the costs involved in the services you offer?</AccordionTrigger>
          <AccordionContent>
          The costs of our services may vary depending on the type of work required, the professional's experience and other factors. We recommend that you contact the professional with more details about your project so that they can provide an accurate estimate of the costs involved.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you have available professionals in my region?</AccordionTrigger>
          <AccordionContent>
          Yes, we have a wide network of professionals in several regions. When performing a search on our platform, you can filter the results to find available professionals in your area.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What is the process for booking services?</AccordionTrigger>
          <AccordionContent>
          The scheduling process is simple. Once you have selected your desired professional on our platform, you can contact them directly to discuss availability and schedule a time that is convenient for both parties.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Can I see examples of professionals' previous work before making a decision?</AccordionTrigger>
          <AccordionContent>
          Certainly! Many of our professionals have online portfolios available on their profiles on our platform, where you can view examples of their previous work. Additionally, we can facilitate direct contact with the professional so you can discuss specific details and request references if desired.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FaqList;
