import API from '../API/api-service';
import comingSoon from '../../images/coming-soon.jpg';

const api = new API();

async function createCardData(result) {
  const genres = await api.fetchMovieGenre();

  let cardList = [];

  cardList = result.map(
    ({ genre_ids, release_date, backdrop_path, poster_path, title, vote_average, id }) => {
      const genres_type = [];

      genre_ids.forEach(id => {
        const genre = genres.find(genre => genre.id === id);

        genres_type.push(genre.name);
      });

      if (!genres_type.length) genres_type.push('Coming soon');

      const date = release_date ? release_date.slice(0, 4) : '';
      const poster = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : comingSoon;

      return {
        backdrop_path,
        poster,
        title,
        vote_average,
        date,
        id,
        genres_type,
        date,
      };
    },
  );
  return cardList;
}

export default createCardData;
