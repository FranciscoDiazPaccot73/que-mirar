type votes = {
  source: any,
  genre?: any,
}

const unPopularGenres = ['99', '10770'];

export const calculateMaxVotes = ({ source, genre }: votes) => {
  let result = { MIN: 3000 };

  if (unPopularGenres.includes(genre)) {
    return { MIN: 750, MAX: 1000 }
  }

  if (genre !== '' || source === 'tv') {
    return { ...result, MAX: 5000 }
  }

  return { ...result, MAX: 10000 }
}
