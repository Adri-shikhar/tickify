const helpCards = [
  {
    icon: "🎫",
    title: "Booking Assistance",
    text: "Get help with searching routes, selecting seats, and confirming your booking smoothly.",
  },
  {
    icon: "💳",
    title: "Payments & Refunds",
    text: "Facing payment issues or refund questions? We ensure transparent and secure transactions.",
  },
  {
    icon: "🚌",
    title: "Travel Information",
    text: "View accurate schedules, boarding points, operators, and real-time updates.",
  },
  {
    icon: "✉️",
    title: "Ticket Issues",
    text: "Didn't receive your ticket or confirmation? Retrieve it instantly with our support.",
  },
  {
    icon: "🛡️",
    title: "Account & Security",
    text: "Manage your account, reset passwords, and keep your data secure at all times.",
  },
  {
    icon: "❓",
    title: "FAQs & Help Center",
    text: "Find quick answers to common questions without waiting for support.",
  },
];

export default function HelpPage() {
  return (
    <div className="page-bg mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-center text-3xl font-bold text-heading">
        Help & Support
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-body">
        Your journey matters to us. Get fast, reliable help at every step with Tickify.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {helpCards.map((card) => (
          <div key={card.title} className="rounded-card bg-surface p-6 shadow-card">
            <span className="text-3xl text-success">{card.icon}</span>
            <h2 className="mt-4 text-lg font-bold text-heading">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-body">{card.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-body">
        Still need help? Email us at{" "}
        <a href="mailto:support@tickify.com" className="font-semibold text-accent">
          support@tickify.com
        </a>
      </p>
    </div>
  );
}
