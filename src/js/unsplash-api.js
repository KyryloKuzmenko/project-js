// export function getPhotos(query, page) {
//     const API_KEY = 'L6DfZAiGwsspJd4cvUrj1Vf1mjnqIGAcaSeAWdUf3Fo';
//     const BASE_URL = 'https://api.unsplash.com';
//     const END_POINT = '/search/photos';

//     const params = new URLSearchParams({
//         client_id: API_KEY,
//         query,
//         page,
//         per_page: 12,
//         orientation: 'portrait',
//     });
//     return fetch(`${BASE_URL}${END_POINT}?${params}`)
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error(res.status)
//             }
//             return res.json();
//         })
// }

import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] =
  'Client-ID L6DfZAiGwsspJd4cvUrj1Vf1mjnqIGAcaSeAWdUf3Fo';

export async function getPhotos(query, page) {
    return await axios
        .get('/search/photos', {
            params: {
                query,
                page,
                per_page: 12,
                orientation: 'portrait',
            },
        });
}
