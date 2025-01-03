import { useNavigate } from "react-router-dom";
import brustBild from "./images/12xasd3.png.jpg";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 font-mono">
          Simon und Victors Gewichtspeicher APP
        </h1>
      </header>

      <div className="flex flex-col items-center justify-center">
        {/* Alle Buttons in einer Spalte */}
        <div className="flex flex-col gap-4 w-full max-w-[500px]">
          <button
            onClick={() => navigate("/brust")}
            className="w-full h-[200px] md:h-[400px] bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md text-2xl md:text-4xl font-bold flex flex-col items-center justify-center"
          >
            <img
              src={brustBild}
              alt="Brust"
              className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] object-cover mb-2 md:mb-4 rounded-lg transition-all duration-300 hover:scale-125"
            />
            Brust
          </button>
          <button className="w-full h-[200px] md:h-[400px] bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md text-2xl md:text-4xl font-bold">
            Rücken
          </button>
          <button className="w-full h-[200px] md:h-[400px] bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md text-2xl md:text-4xl font-bold">
            Beine
          </button>
          <button className="w-full h-[200px] md:h-[400px] bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md text-2xl md:text-4xl font-bold">
            Ausdauer
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
