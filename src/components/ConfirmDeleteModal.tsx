// Component 9 — Modal dialog that asks the user to confirm before permanently deleting a princess.
// This prevents accidental deletions since the MockAPI operation cannot be undone.

import { Modal, Button } from 'react-bootstrap';

interface ConfirmDeleteModalProps {
  show: boolean;
  princessName: string; // Shown in the message so the user knows what they're deleting
  onConfirm: () => void; // Called when user clicks "Yes, Delete"
  onCancel: () => void;  // Called when user clicks "Cancel" or closes the modal
}

export default function ConfirmDeleteModal({
  show,
  princessName,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Remove Princess</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to remove{' '}
        <strong>{princessName}</strong> from your collection?
        <br />
        <span className="text-danger small">This cannot be undone.</span>
      </Modal.Body>

      <Modal.Footer>
        {/* Cancel keeps the princess in the collection */}
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        {/* Confirm triggers the DELETE API call */}
        <Button variant="danger" onClick={onConfirm}>
          Yes, Remove Her
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
