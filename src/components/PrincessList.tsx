// Component 8 — Renders a responsive Bootstrap grid of PrincessCard components.
// xs=1 column on phones, sm=2 on tablets, md=3 on laptops, lg=4 on large screens.

import { Row, Col } from 'react-bootstrap';
import type { Princess } from '../types/Princess';
import PrincessCard from './PrincessCard';

interface PrincessListProps {
  princesses: Princess[];
  onDelete: (id: string) => void; // Passed through to each card's delete button
}

export default function PrincessList({ princesses, onDelete }: PrincessListProps) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {/* Each princess gets its own column with a full-height card */}
      {princesses.map((princess) => (
        <Col key={princess.id}>
          <PrincessCard princess={princess} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
}
