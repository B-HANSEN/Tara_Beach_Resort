// creating environment variables to not publish tokens


import { createClient } from 'contentful';

export default createClient({
    space: import.meta.env.VITE_API_SPACE,
    accessToken: import.meta.env.VITE_ACCESS_TOKEN
});