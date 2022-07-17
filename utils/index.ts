type votes = {
  source: any,
  genre?: any,
}

const unPopularGenres = ['99', '10770'];
const unPopularTVGenres = ['37', '80', '35', '99', '10768', '10763', '10762', '10764', '10766', '10767'];
export const excludedGenres = ['12', '28'];
export const availableRegions = ['AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'DM', 'EC', 'ES', 'MX', 'PA', 'PE', 'PY', 'UY', 'VE']

export const calculateMaxVotes = ({ source, genre }: votes) => {
  let result = { MIN: 100 };

  const isTvAndUnpopular = source === 'tv' && unPopularTVGenres.includes(genre);
  const isMovieAndUnpopular = source === 'movie' && unPopularGenres.includes(genre);

  if (isMovieAndUnpopular) {
    return { MIN: 25, MAX: 100 }
  }

  if (isTvAndUnpopular) {
    return { MIN: 0, MAX: 10 }
  }

  if (genre !== '' || source === 'tv') {
    return { MIN: 100, MAX: 250 }
  }

  return { ...result, MAX: 400 }
}

export const getDeviceTrackWording = (device: string) => {
  if (device === 'mobile') return device;

  const screenSize = window.innerWidth;

  const wording = screenSize < 750 ? `${device}-smallscreen-${screenSize}` : `${device}-${screenSize}`

  return wording;
}

export const formatDuration = (duration: number) => {
  if (duration < 60) return  `${duration} min.`

  const hours = (duration / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return `${rhours} h ${rminutes} min.`
}
