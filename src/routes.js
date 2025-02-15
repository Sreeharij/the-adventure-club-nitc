// src/routes.js
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import People from './pages/People';
import Contact from './pages/Contact';

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/events", name: "Events", component: Events },
  { path: "/gallery", name: "Gallery", component: Gallery },
  { path: "/people", name: "People", component: People },
  { path: "/contact", name: "Contact", component: Contact },
];

export default routes;
