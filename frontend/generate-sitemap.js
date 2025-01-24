import { createWriteStream } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

const BASE_URL = 'https://verbix.onrender.com'; 
const routes = [
  '/',
  '/login',
]; 

(async () => {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const writeStream = createWriteStream('./public/sitemap.xml'); 
  sitemap.pipe(writeStream);

  // Add each route to the sitemap
  routes.forEach((route) => {
    sitemap.write({ url: route, changefreq: 'daily', priority: 0.7 });
  });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log('Sitemap generated successfully!');
})();
