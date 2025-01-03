import bankdruecken from "./images/Bankdrucken.jpg";
import schraegbank from "./images/Schragbankdrucken.jpg";
import schraegbankdruecken from "./images/Schragbankdrucken.jpg";
import butterfly from "./images/Butterfly.jpg";
import bauch from "./images/Bauch.jpg";
import kettleball from "./images/Kettleball.jpg";
import trizeps from "./images/trizeps.jpg";
import { useState, useEffect } from "react";

function Brust() {
  const [weights, setWeights] = useState({});
  const [reps, setReps] = useState({});
  const [tempInputs, setTempInputs] = useState({});
  const [tempReps, setTempReps] = useState({});
  const userId = "shared_user_id";
  const API_URL = "/.netlify/functions/api";

  useEffect(() => {
    fetchWorkoutData();
  }, []);

  const fetchWorkoutData = async () => {
    try {
      console.log("Versuche Daten zu laden...");
      const response = await fetch(`${API_URL}/workout/${userId}`);
      const workouts = await response.json();
      console.log("Geladene Daten:", workouts);

      const formattedData = workouts.reduce((acc, workout) => {
        if (!acc[workout.exercise]) {
          acc[workout.exercise] = {};
        }
        acc[workout.exercise][`satz${workout.setNumber}`] = {
          weight: workout.weight,
          reps: workout.reps,
        };
        return acc;
      }, {});

      console.log("Formatierte Daten:", formattedData);
      const weights = {};
      const reps = {};

      Object.entries(formattedData).forEach(([exercise, sets]) => {
        weights[exercise] = {};
        reps[exercise] = {};
        Object.entries(sets).forEach(([setKey, data]) => {
          weights[exercise][setKey] = data.weight;
          reps[exercise][setKey] = data.reps;
        });
      });

      setWeights(weights);
      setReps(reps);
    } catch (error) {
      console.error("Fehler beim Laden der Daten:", error);
    }
  };

  const uebungen = [
    { titel: "Bankdrücken", bild: bankdruecken },
    { titel: "Schrägbankdrücken", bild: schraegbankdruecken },
    { titel: "Butterfly", bild: butterfly },
    { titel: "Bauch", bild: bauch },
    { titel: "Kettlebell", bild: kettleball },
    { titel: "Trizeps", bild: trizeps },
  ];

  const handleInputChange = (uebungTitel, setNumber, value, type) => {
    if (type === "weight") {
      setTempInputs((prev) => ({
        ...prev,
        [uebungTitel]: {
          ...(prev[uebungTitel] || {}),
          [`satz${setNumber}`]: value,
        },
      }));
    } else if (type === "reps") {
      setTempReps((prev) => ({
        ...prev,
        [uebungTitel]: {
          ...(prev[uebungTitel] || {}),
          [`satz${setNumber}`]: value,
        },
      }));
    }
  };

  const handleSaveSet = async (uebungTitel, setNumber, weight, reps) => {
    try {
      const data = {
        userId,
        exercise: uebungTitel,
        setNumber: parseInt(setNumber),
      };

      if (weight) {
        data.weight = parseFloat(weight);
      }
      if (reps) {
        data.reps = parseInt(reps, 10);
      }

      console.log("Sende an Server:", data);

      const response = await fetch(`${API_URL}/workout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Server Antwort:", responseData);

      if (response.ok) {
        await fetchWorkoutData();
      } else {
        console.error("Fehler beim Speichern:", await response.text());
      }
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Fehler beim Speichern der Daten");
    }
  };

  const handleResetData = async () => {
    try {
      const response = await fetch(`${API_URL}/workout/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setWeights({});
        setTempInputs({});
        setTempReps({});
        alert("Alle Daten wurden zurückgesetzt");
      }
    } catch (error) {
      console.error("Fehler beim Zurücksetzen:", error);
      alert("Fehler beim Zurücksetzen der Daten");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <h1 className="text-3xl font-bold text-center text-blue-600 font-mono py-4">
          Brustübungen
        </h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {uebungen.map((uebung, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {uebung.titel}
              </h2>
              <div className="relative aspect-video mb-4">
                <img
                  src={uebung.bild}
                  alt={uebung.titel}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((setNum) => (
                  <div
                    key={setNum}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    <label className="text-sm font-medium text-gray-700">
                      Satz {setNum}:
                    </label>
                    <input
                      type="number"
                      className="w-20 border rounded-lg px-2 py-1 text-sm"
                      placeholder="Gewicht"
                      value={
                        tempInputs[uebung.titel]?.[`satz${setNum}`] ??
                        weights[uebung.titel]?.[`satz${setNum}`] ??
                        ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          uebung.titel,
                          setNum,
                          e.target.value,
                          "weight"
                        )
                      }
                    />
                    <span className="text-sm font-medium text-gray-600">
                      KG
                    </span>

                    <input
                      type="number"
                      className="w-20 border rounded-lg px-2 py-1 text-sm"
                      placeholder="Wdh."
                      value={
                        tempReps[uebung.titel]?.[`satz${setNum}`] ??
                        reps[uebung.titel]?.[`satz${setNum}`] ??
                        ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          uebung.titel,
                          setNum,
                          e.target.value,
                          "reps"
                        )
                      }
                    />
                    <span className="text-sm font-medium text-gray-600">
                      Wdh
                    </span>

                    <button
                      onClick={() => {
                        const weight =
                          tempInputs[uebung.titel]?.[`satz${setNum}`];
                        const reps = tempReps[uebung.titel]?.[`satz${setNum}`];
                        console.log("Speichere:", { weight, reps }); // Debug-Log
                        if (weight || reps) {
                          handleSaveSet(uebung.titel, setNum, weight, reps);
                        } else {
                          alert("Bitte geben Sie mindestens einen Wert ein");
                        }
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors duration-300"
                    >
                      Speichern
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brust;
