import { AutoparkSection } from "./_components/autopark-section";
import { EventFormSection } from "./_components/event-form-section/event-form-section";
import { FaqSection } from "./_components/faq-section/faq-section";
import { InstructorsSection } from "./_components/instructors-section";
import { MainSection } from "./_components/main-section";
import { PriceSection } from "./_components/price-section";
// import { PriceSection } from "./_components/price-section";
import { ServiceSection } from "./_components/service-section";

export default function Home() {
  return (
    <div className="">
      <div className="mt-20">
        <MainSection />
      </div>

      <div className="mt-20">
        <ServiceSection />
      </div>

      <div className="mt-20">
        <InstructorsSection />
      </div>

      <div className="mt-20">
        <AutoparkSection />
      </div>

      <div className="mt-20">
        <PriceSection />
      </div>

      <div className="mt-20">
        <EventFormSection />
      </div>

      <div className="mt-20">
        <FaqSection />
      </div>
    </div>
  );
}
