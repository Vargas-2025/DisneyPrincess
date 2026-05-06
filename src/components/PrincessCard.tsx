// Component 7 — Displays a single princess as a Bootstrap card.
// Shows her image, name, movie, and a short description.
// Edit button navigates to the edit page; Delete triggers the parent's confirmation flow.

import { Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Princess } from '../types/Princess';

interface PrincessCardProps {
  princess: Princess;
  onDelete: (id: string) => void; // Lifted to parent so parent controls the confirmation modal
}

export default function PrincessCard({ princess, onDelete }: PrincessCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm">
      {/* Princess image — falls back to a crown emoji placeholder if no URL is set */}
      {princess.imageUrl ? (
        <Card.Img
          variant="top"
          src={princess.imageUrl}
          alt={princess.name}
          style={{ height: '220px', objectFit: 'cover' }}
          onError={(e) => {
            // If the image fails to load, swap to placeholder text
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-light"
          style={{ height: '220px' }}
        >
          <span style={{ fontSize: '5rem' }}>👑</span>
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{princess.name}</Card.Title>

        {/* Movie badge under the title */}
        <Badge bg="secondary" className="mb-2 align-self-start">
          {princess.movie || 'Unknown Film'}
        </Badge>

        {/* Description — grows to fill remaining card height */}
        <Card.Text className="text-muted flex-grow-1 small">
          {princess.description || 'No description yet.'}
        </Card.Text>

        {/* Action buttons at the bottom of the card */}
        <div className="d-flex gap-2 mt-3">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => navigate(`/edit/${princess.id}`)}
          >
            ✏️ Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(princess.id)} // Bubbles up to CollectionPage
          >
            🗑️ Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
