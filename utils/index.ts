type votes = {
  source: any,
  genre?: any,
}

export const calculateMaxVotes = ({ source, genre }: votes) => {
  let result = { MIN: 3000 };

  if (genre !== '' || source === 'tv') {
    return { ...result, MAX: 5000 }
  }

  return { ...result, MAX: 25000 }
}
