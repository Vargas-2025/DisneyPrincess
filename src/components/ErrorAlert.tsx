// Component 5 — Displays an error message inside a Bootstrap danger alert.
// Used whenever an API call fails so the user knows something went wrong.

import { Alert } from 'react-bootstrap';

interface ErrorAlertProps {
  message: string; // Human-readable error text
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert variant="danger" className="my-3">
      <Alert.Heading>Oops — something went wrong!</Alert.Heading>
      <p className="mb-0">{message}</p>
    </Alert>
  );
}
