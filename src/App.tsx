import GameBoard from './components/GameBoard';
import GameProvider from './context/GameProvider';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white">
      <GameProvider>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
              Acey-Ducey
            </h1>
            <p className="text-lg text-yellow-200">
              來自《BASIC Computer Games》的經典紙牌遊戲
            </p>
          </header>
          <GameBoard />
        </div>
      </GameProvider>
    </div>
  );
}

export default App;