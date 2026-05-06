// Page 4 — Edit Princess Page (UPDATE)
// Reads the :id param from the URL, fetches that princess from MockAPI,
// and pre-populates the shared PrincessForm with her current data.
// On submit, PUTs the updated data back to MockAPI and redirects to the collection.

import { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getPrincessById, updatePrincess } from '../services/api';
import type { Princess } from '../types/Princess';
import PageHeader from '../components/PageHeader';
import PrincessForm from '../components/PrincessForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

type FormData = Omit<Princess, 'id' | 'createdAt'>;

export default function EditPrincessPage() {
  // id comes from the route: /edit/:id
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State for the princess we're editing
  const [princess, setPrincess] = useState<Princess | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // State for the PUT request
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch the princess's current data when the page loads
  useEffect(() => {
    async function load() {
      try {
        if (!id) throw new Error('No princess ID in URL');
        const data = await getPrincessById(id); // READ one princess
        setPrincess(data);
      } catch {
        setFetchError('Could not load princess data. She may not exist.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]); // Re-run if the id in the URL changes

  // PUT the updated form data to MockAPI, then redirect to collection
  async function handleSubmit(data: FormData) {
    if (!id) return;
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await updatePrincess(id, data); // UPDATE operation
      navigate('/collection');         // Return to collection after saving
    } catch {
      setSubmitError('Failed to save changes. Please try again.');
      setIsSubmitting(false); // Re-enable the form on failure
    }
  }

  // Show a spinner while the princess data is loading
  if (loading) {
    return (
      <Container className="py-5">
        <LoadingSpinner />
      </Container>
    );
  }

  // Show an error if we couldn't fetch the princess
  if (fetchError) {
    return (
      <Container className="py-5">
        <ErrorAlert message={fetchError} />
      </Container>
    );
  }

  // Build the initial form values from the fetched princess data
  const initialValues: FormData = {
    name: princess?.name ?? '',
    movie: princess?.movie ?? '',
    imageUrl: princess?.imageUrl ?? '',
    description: princess?.description ?? '',
  };

  return (
    <Container className="py-5" style={{ maxWidth: '700px' }}>
      <PageHeader
        title={`Edit: ${princess?.name}`}
        subtitle="Update this princess's details in your collection."
      />

      {/* Show an error banner if the PUT request failed */}
      {submitError && <Alert variant="danger" className="mb-4">{submitError}</Alert>}

      {/* PrincessForm pre-populated with the current data */}
      <PrincessForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        submitLabel="Save Changes ✓"
      />
    </Container>
  );
}
