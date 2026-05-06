// Page 1 — Home / Landing Page
// Greets the user and explains what the app does.
// Two call-to-action buttons let them jump straight to the collection or add a princess.

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function HomePage() {
  return (
    <Container className="py-5">
      {/* Reusable page heading component */}
      <PageHeader
        title="👑 Disney Princess Collection"
        subtitle="Your personal Royal Registry — collect, curate, and manage your favorite Disney princesses."
      />

      {/* Primary call-to-action buttons */}
      <div className="d-flex gap-3 justify-content-center flex-wrap mb-5">
        <Link to="/collection" className="btn btn-primary btn-lg">
          View Collection
        </Link>
        <Link to="/add" className="btn btn-outline-primary btn-lg">
          ✨ Add a Princess
        </Link>
      </div>

      {/* Feature highlight cards — explains the three core actions */}
      <Row className="g-4 text-center">
        <Col md={4}>
          <div className="p-4 border rounded shadow-sm h-100">
            <p className="display-4">📖</p>
            <h5 className="fw-bold">Browse</h5>
            <p className="text-muted">
              View your full princess collection in a beautiful responsive gallery.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-4 border rounded shadow-sm h-100">
            <p className="display-4">✏️</p>
            <h5 className="fw-bold">Edit</h5>
            <p className="text-muted">
              Update a princess's name, movie, image, or bio any time to keep your registry current.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-4 border rounded shadow-sm h-100">
            <p className="display-4">✨</p>
            <h5 className="fw-bold">Add &amp; Remove</h5>
            <p className="text-muted">
              Crown new royalty or remove princesses from your collection with a single click.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
