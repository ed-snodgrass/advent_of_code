// Aviture Leaderboard => https://adventofcode.com/2023/leaderboard/private/view/195712.json

const fetchAdventOfCodeLeaderboard = async () => {
  const leaderboardResults = await fetch('https://adventofcode.com/2023/leaderboard/private/view/195712.json', {
    headers: {
      'Cookie': 'session=53616c7465645f5ffcf3209426b62cabf8e9dac197177d640a4e04b8b3564b4497795e4d9a1d343a02a39fec4a7587f1b93ec93e6b15993cc60aa01bb23fad24'
    }
  })
  return leaderboardResults.json()
}

fetchAdventOfCodeLeaderboard().then((leaderboardData) => {
  const allMembers =  Object.values(leaderboardData.members)
  const starsCount = allMembers.reduce((acc, member) => acc + member.stars, 0)
  console.log(starsCount)
  console.log(starsCount / 650);
})
