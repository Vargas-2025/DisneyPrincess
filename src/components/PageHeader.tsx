// Component 3 — Reusable page title block used at the top of every page.
// Accepts an optional subtitle for a short description below the heading.

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center mb-4">
      <h1 className="display-5 fw-bold text-primary">{title}</h1>
      {/* Only render the subtitle paragraph if one was passed in */}
      {subtitle && <p className="lead text-muted">{subtitle}</p>}
    </div>
  );
}
