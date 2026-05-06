// Component 10 — Shared form used for both adding (Create) and editing (Update) a princess.
// The parent page passes initialValues for the edit flow; defaults are empty for the add flow.
// Bootstrap's built-in HTML5 validation is used via the `noValidate` + `validated` pattern.

import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import type { Princess } from '../types/Princess';

// Only the editable fields — id and createdAt are handled by MockAPI
type FormData = Omit<Princess, 'id' | 'createdAt'>;

interface PrincessFormProps {
  initialValues?: FormData;     // Pre-populated for edit; empty for add
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  submitLabel: string;          // "Add to Collection" or "Save Changes"
}

// Default blank form state used when adding a new princess
const DEFAULT_VALUES: FormData = {
  name: '',
  movie: '',
  imageUrl: '',
  description: '',
};

export default function PrincessForm({
  initialValues = DEFAULT_VALUES,
  onSubmit,
  isLoading,
  submitLabel,
}: PrincessFormProps) {
  // Local state mirrors the four editable fields
  const [formData, setFormData] = useState<FormData>(initialValues);

  // validated=true turns on Bootstrap's visual feedback (red/green borders)
  const [validated, setValidated] = useState(false);

  // Generic change handler — updates the matching key in formData state
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Prevent default submission, run HTML5 validity check, then call parent handler
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true); // Show red borders on invalid fields
      return;
    }
    onSubmit(formData);
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        {/* Princess name — required field */}
        <Col md={6}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Princess Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="e.g., Cinderella"
              value={formData.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a princess name.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Movie — required field */}
        <Col md={6}>
          <Form.Group className="mb-3" controlId="movie">
            <Form.Label>Movie / Film <span className="text-danger">*</span></Form.Label>
            <Form.Control
              required
              type="text"
              name="movie"
              placeholder="e.g., Cinderella (1950)"
              value={formData.movie}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter the film this princess is from.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Image URL — optional */}
      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="url"
          name="imageUrl"
          placeholder="https://example.com/princess.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Optional. Paste a direct link to a photo of the princess.
        </Form.Text>
      </Form.Group>

      {/* Description — optional multi-line textarea */}
      <Form.Group className="mb-4" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          placeholder="Tell us about this princess..."
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Submit button — disabled while the API call is in flight */}
      <Button type="submit" variant="primary" disabled={isLoading} size="lg">
        {isLoading ? 'Saving...' : submitLabel}
      </Button>
    </Form>
  );
}
