// Component 4 — Centered loading spinner shown while data is being fetched from the API.

import { Spinner, Container } from 'react-bootstrap';

export default function LoadingSpinner() {
  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      {/* Bootstrap Spinner — the visually-hidden span satisfies screen reader accessibility */}
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span className="ms-3 text-muted fs-5">Loading the magic...</span>
    </Container>
  );
}
