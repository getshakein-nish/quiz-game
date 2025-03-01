import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the leaderboard data from an API or use dummy data
    const fetchLeaderboardData = async () => {
      // Replace with actual API call
      const data = [
        { name: 'Player1', wins: 20, losses: 5, points: 200 },
        { name: 'Player2', wins: 18, losses: 7, points: 180 },
        { name: 'Player3', wins: 15, losses: 10, points: 150 },
        { name: 'Player4', wins: 14, losses: 11, points: 140 },
        { name: 'Player5', wins: 13, losses: 12, points: 130 },
        { name: 'Player6', wins: 12, losses: 13, points: 120 },
        { name: 'Player7', wins: 11, losses: 14, points: 110 },
        { name: 'Player8', wins: 10, losses: 15, points: 100 },
        { name: 'Player9', wins: 9, losses: 16, points: 90 },
        { name: 'Player10', wins: 8, losses: 17, points: 80 },
      ];
      setPlayers(data);
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <button
        className="absolute top-4 left-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        onClick={() => navigate('/homepage')}
      >
        Back
      </button>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Wins</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Losses</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{player.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{player.wins}</td>
                <td className="py-2 px-4 border-b border-gray-200">{player.losses}</td>
                <td className="py-2 px-4 border-b border-gray-200">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;