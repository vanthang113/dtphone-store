import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

type Feature = {
  id: string;
  title: string;
  description: string;
};

type FAQSectionProps = {
  features: Feature[];
};

export default function FAQSection({ features }: FAQSectionProps) {
  return (
    <div className="mt-4 bg-[#00868B] rounded-lg px-2 py-1">
      <Accordion type="single" collapsible className="w-full">
        {features.map((feature) => (
          <AccordionItem key={feature.id} value={feature.id}>
            <AccordionTrigger>{feature.title}</AccordionTrigger>
            <AccordionContent>{feature.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}