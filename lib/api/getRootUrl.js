import { PORT, NODE_ENV } from '../../config';

export default function getRootUrl() {
  const port = PORT || 8000;
  const dev = NODE_ENV !== 'production';
  const ROOT_URL = dev ? `http://localhost:${port}` : 'https://builderbook.org';

  return ROOT_URL;
}
