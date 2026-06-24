"use client";

const steps = [
  {
    title: "Search",
    text: "Choose your origin, destination and journey date to find available trips.",
    icon: "🔍",
  },
  {
    title: "Select",
    text: "Select your preferred bus, launch or route and choose your seat.",
    icon: "👆",
  },
  {
    title: "Pay",
    text: "Pay securely using Stripe, cards or other payment methods.",
    icon: "💳",
  },
];

export default function EasySteps() {
  return (
    <section className="page-bg mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 className="text-center text-3xl font-black bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
        Buy tickets in 3 easy steps
      </h2>
      <p className="mt-2 text-center text-sm text-gray-500">
        Book your tickets quickly and securely with Tickify
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-50 text-2xl">
              {step.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
