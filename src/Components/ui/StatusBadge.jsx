// One status vocabulary for the whole app.
//
// Status used to be rendered six different ways across six files, and two of
// them lied: a fraud-flagged vendor appeared in success green, and an accepted
// ticket still read in pending amber. "Accepted" was also emerald on one screen
// and blue on another — screens a vendor and a customer compare side by side.
// Centralising the map is the only way those stay fixed.

const tones = {
  success: "border-success/30 bg-success-soft text-success-soft-fg",
  warning: "border-warning/30 bg-warning-soft text-warning-soft-fg",
  danger: "border-danger/30 bg-danger-soft text-danger-soft-fg",
  info: "border-info/30 bg-info-soft text-info-soft-fg",
  neutral: "border-default bg-sunken text-label",
};

// Canonical meaning for every status string the backend produces.
const statusMap = {
  paid: { tone: "success", label: "Paid" },
  accepted: { tone: "info", label: "Accepted" },
  pay: { tone: "info", label: "Accepted" },
  approved: { tone: "success", label: "Approved" },
  rejected: { tone: "danger", label: "Rejected" },
  fraud: { tone: "danger", label: "Fraud" },
  pending: { tone: "warning", label: "Pending" },
  "waiting for confirm": { tone: "warning", label: "Pending" },
};

export function statusTone(status) {
  return statusMap[String(status ?? "").toLowerCase()] ?? statusMap.pending;
}

export default function StatusBadge({ status, label, tone, className = "" }) {
  const resolved = statusTone(status);
  const toneKey = tone ?? resolved.tone;

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-micro font-semibold capitalize ${
        tones[toneKey] ?? tones.neutral
      } ${className}`}
    >
      {label ?? resolved.label}
    </span>
  );
}
