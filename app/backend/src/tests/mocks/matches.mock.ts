const match = {
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
}

const matchInProgress = {
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Internacional"
  }
}

const matches = [{
  id: 1,
  ...match
}]

const matchesInProgress = [{
  id: 1,
  ...matchInProgress,
}]

const payloadData = {
  id: 1,
  role: 'mito'
}

export {
  match,
  matches,
  matchInProgress,
  matchesInProgress,
  payloadData
}