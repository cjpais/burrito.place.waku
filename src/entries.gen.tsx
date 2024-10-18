import { createPages } from 'waku';
import type { PathsForPages } from 'waku/router';

import Layout, { getConfig as Layout_getConfig } from './pages/_layout';
import About, { getConfig as About_getConfig } from './pages/about';
import Index from './pages/index';

const _pages = createPages(async (pagesFns) => [
  pagesFns.createLayout({ path: '/', component: Layout, ...(await Layout_getConfig()) }),
  pagesFns.createPage({ path: '/about', component: About, ...(await About_getConfig()) }),
  pagesFns.createPage({ path: '/', component: Index, render: 'dynamic' }),
]);

  declare module 'waku/router' {
    interface RouteConfig {
      paths: PathsForPages<typeof _pages>;
    }
    interface CreatePagesConfig {
      pages: typeof _pages;
    }
  }

  export default _pages;
  