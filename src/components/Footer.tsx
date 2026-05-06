// Component 2 — Footer rendered at the bottom of every page.
// mt-auto pushes it to the bottom when the page has little content.

import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">
          ✨ Disney Princess Collection &copy; {new Date().getFullYear()} — Built with React &amp; MockAPI
        </p>
      </Container>
    </footer>
  );
}
