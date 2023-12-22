// Aviture Leaderboard => https://adventofcode.com/2023/leaderboard/private/view/195712.json

const fetchAdventOfCodeLeaderboard = async () => {
  const leaderboardResults = await fetch('https://adventofcode.com/2023/leaderboard/private/view/195712.json', {
    headers: {
      'Cookie': `session=${process.env.AOC_SESSION_KEY}`
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
