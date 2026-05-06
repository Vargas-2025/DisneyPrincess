// Page 3 — Add Princess Page (CREATE)
// Renders the shared PrincessForm with empty fields.
// On submit, POSTs the new princess to MockAPI and redirects to the collection page.

import { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createPrincess } from '../services/api';
import type { Princess } from '../types/Princess';
import PageHeader from '../components/PageHeader';
import PrincessForm from '../components/PrincessForm';

// Only the user-editable fields (MockAPI generates id and createdAt)
type FormData = Omit<Princess, 'id' | 'createdAt'>;

export default function AddPrincessPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // POST the new princess to MockAPI, then navigate back to the collection
  async function handleSubmit(data: FormData) {
    try {
      setIsLoading(true);
      setError(null);
      await createPrincess(data); // CREATE operation
      navigate('/collection');    // Go back to collection to see the new entry
    } catch {
      setError('Failed to add princess. Please try again.');
      setIsLoading(false); // Re-enable the form on failure
    }
  }

  return (
    <Container className="py-5" style={{ maxWidth: '700px' }}>
      <PageHeader
        title="Add a Princess"
        subtitle="Crown a new princess and add her to your royal collection."
      />

      {/* Show an error banner if the POST request failed */}
      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

      {/* PrincessForm with no initialValues so all fields start blank */}
      <PrincessForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Add to Collection 👑"
      />
    </Container>
  );
}
