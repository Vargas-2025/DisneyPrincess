// Component 6 — Shown on the Collection page when no princesses exist yet.
// Gives the user a clear call-to-action to add their first princess.

import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <div className="text-center py-5">
      <p className="display-1">👑</p>
      <h3 className="text-muted">Your collection is empty!</h3>
      <p className="text-muted mb-4">Add a princess to start building your royal registry.</p>
      {/* Link styled as a Bootstrap primary button */}
      <Link to="/add" className="btn btn-primary btn-lg">
        Add Your First Princess
      </Link>
    </div>
  );
}
