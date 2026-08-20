"use client";

import Modal from "@/Components/ui/Modal";
import Button from "@/Components/ui/Button";

// Used for irreversible actions. Previously only "delete ticket" asked for
// confirmation at all — "mark as fraud", which cannot be undone, fired on a
// single click.
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onClose}
      title={title}
      description={description}
      size="sm"
      dismissable={!loading}
    >
      <div className="mt-6 flex gap-3">
        <Button
          variant="secondary"
          fullWidth
          disabled={loading}
          onClick={onClose}
        >
          {cancelLabel}
        </Button>
        <Button
          variant={variant}
          fullWidth
          loading={loading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
