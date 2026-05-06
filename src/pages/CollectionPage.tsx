// Page 2 — Collection Page (READ + DELETE)
// Fetches all princesses from MockAPI and displays them in a responsive grid.
// Users can click Edit on a card (navigates to EditPrincessPage) or
// click Delete to open the confirmation modal, then remove the princess from the API.

import { useState, useEffect, useCallback } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { getAllPrincesses, deletePrincess } from '../services/api';
import type { Princess } from '../types/Princess';
import PageHeader from '../components/PageHeader';
import PrincessList from '../components/PrincessList';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import EmptyState from '../components/EmptyState';

export default function CollectionPage() {
  // The full list of princesses fetched from MockAPI
  const [princesses, setPrincesses] = useState<Princess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // deleteTarget holds the princess the user clicked "Delete" on.
  // A non-null value means the confirmation modal is open.
  const [deleteTarget, setDeleteTarget] = useState<Princess | null>(null);

  // Brief success banner shown after a successful deletion
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Fetch all princesses from the API; wrapped in useCallback so the effect dependency is stable
  const loadPrincesses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPrincesses();
      setPrincesses(data);
    } catch {
      setError('Could not load princesses. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Run once on mount to populate the collection
  useEffect(() => {
    loadPrincesses();
  }, [loadPrincesses]);

  // Called by PrincessCard's Delete button — opens the confirmation modal for that princess
  function handleDeleteRequest(id: string) {
    const target = princesses.find((p) => p.id === id) ?? null;
    setDeleteTarget(target);
  }

  // Called when the user confirms deletion in the modal
  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    try {
      // DELETE request to MockAPI
      await deletePrincess(deleteTarget.id);
      // Remove the princess from local state so the UI updates instantly (no re-fetch needed)
      setPrincesses((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteSuccess(true);
      // Auto-hide the success banner after 3 seconds
      setTimeout(() => setDeleteSuccess(false), 3000);
    } catch {
      setError('Failed to delete princess. Please try again.');
    } finally {
      setDeleteTarget(null); // Always close the modal
    }
  }

  return (
    <Container className="py-5">
      {/* Dynamic subtitle shows how many princesses are in the collection */}
      <PageHeader
        title="Princess Collection"
        subtitle={`${princesses.length} ${princesses.length === 1 ? 'princess' : 'princesses'} in your registry`}
      />

      {/* Dismissible success alert that appears after deleting a princess */}
      {deleteSuccess && (
        <Alert variant="success" onClose={() => setDeleteSuccess(false)} dismissible className="mb-4">
          Princess removed from your collection!
        </Alert>
      )}

      {/* Conditional rendering: loading → error → empty → list */}
      {loading && <LoadingSpinner />}
      {!loading && error && <ErrorAlert message={error} />}
      {!loading && !error && princesses.length === 0 && <EmptyState />}
      {!loading && !error && princesses.length > 0 && (
        <PrincessList princesses={princesses} onDelete={handleDeleteRequest} />
      )}

      {/* Delete confirmation modal — only visible when deleteTarget is set */}
      <ConfirmDeleteModal
        show={!!deleteTarget}
        princessName={deleteTarget?.name ?? ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Container>
  );
}
