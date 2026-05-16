import MultiStepForm from "@/components/MultiStepForm";

export default function CTA() {
  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-heading"
      className="scroll-mt-16 py-4 lg:py-7"
    >
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="section-label mb-3">Kontakt</p>
          <h2
            id="kontakt-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Sprawdźmy, czy automatyzacja ma u Ciebie sens
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Pięć krótkich kroków. W odpowiedzi dostaniesz informację, czy widzę
            potencjał na automatyzację, co poprawić jako pierwsze i jaki byłby
            sensowny kolejny krok.
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-left">
          <MultiStepForm formId="diagnosis" />
        </div>
      </div>
    </section>
  );
}
