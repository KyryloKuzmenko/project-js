import { getPhotos } from './unsplash-api';

getPhotos('cat')
  .then(res => console.log(res))
  .catch(err => console.log(err));
