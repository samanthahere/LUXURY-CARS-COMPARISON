npm install @google/model-viewer

import { useState } from "react";
import "@google/model-viewer";

const carsData = [
  {
    name: "Porsche 911 Turbo S",
    price: 230000,
    horsepower: 640,
    speed: 205,
    luxury: 8,
    model: "https://modelviewer.dev/shared-assets/models/Car.glb",
  },
  {
    name: "Ferrari SF90",
    price: 520000,
    horsepower: 986,
    speed: 211,
    luxury: 9,
    model: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
  },
  {
    name: "Lamborghini Urus",
    price: 240000,
    horsepower: 641,
    speed: 190,
    luxury: 8,
    model: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
  },
];

export default function Home() {
  const [selectedCars, setSelectedCars] = useState([null, null, null]);
  const [color, setColor] = useState("#ffffff");

  const handleSelect = (index, name) => {
    const car = carsData.find((c) => c.name === name);
    const updated = [...selectedCars];
    updated[index] = car;
    setSelectedCars(updated);
  };

  const bestCar =
    selectedCars
      .filter(Boolean)
      .sort((a, b) => b.horsepower + b.speed - (a.horsepower + a.speed))[0];

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <h1 style={styles.title}>🚘 LuxShowroom 3D</h1>
      <p style={styles.subtitle}>Rotate • Inspect • Compare like a real showroom</p>

      {/* COLOR PICKER */}
      <div style={styles.colorRow}>
        <span>🎨 Car Paint:</span>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      {/* SELECTORS */}
      <div style={styles.selectRow}>
        {[0, 1, 2].map((i) => (
          <select
            key={i}
            onChange={(e) => handleSelect(i, e.target.value)}
            style={styles.select}
          >
            <option>Select Car {i + 1}</option>
            {carsData.map((car) => (
              <option key={car.name}>{car.name}</option>
            ))}
          </select>
        ))}
      </div>

      {/* BEST CAR BANNER */}
      {bestCar && (
        <div style={styles.best}>
          🧠 Best Performance: <b>{bestCar.name}</b>
        </div>
      )}

      {/* 3D SHOWROOM */}
      <div style={styles.grid}>
        {selectedCars.map((car, i) => (
          <div key={i} style={styles.card}>
            {car ? (
              <>
                <model-viewer
                  src={car.model}
                  auto-rotate
                  camera-controls
                  shadow-intensity="1"
                  style={{
                    width: "100%",
                    height: "300px",
                    background: `radial-gradient(circle, ${color}33, #000)`,
                    borderRadius: "12px",
                  }}
                />

                <h2 style={styles.carName}>{car.name}</h2>
                <p style={styles.price}>
                  ${car.price.toLocaleString()}
                </p>

                <div style={styles.stats}>
                  <p>⚡ HP: {car.horsepower}</p>
                  <p>🚀 Speed: {car.speed} mph</p>
                  <p>💎 Luxury: {car.luxury}/10</p>
                </div>
              </>
            ) : (
              <div style={styles.empty}>Select a car 🚗</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 💎 STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #111, #000)",
    color: "white",
    padding: "20px",
    fontFamily: "sans-serif",
  },

  title: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "5px",
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.6,
    marginBottom: "20px",
  },

  colorRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "15px",
  },

  selectRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  select: {
    flex: 1,
    padding: "10px",
    background: "#111",
    color: "white",
    borderRadius: "8px",
    border: "1px solid #333",
  },

  best: {
    textAlign: "center",
    padding: "10px",
    marginBottom: "20px",
    background: "#111",
    borderRadius: "10px",
    color: "#FFD700",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },

  card: {
    flex: "1 1 30%",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "15px",
    backdropFilter: "blur(10px)",
    border: "1px solid #222",
  },

  carName: {
    marginTop: "10px",
  },

  price: {
    color: "#FFD700",
  },

  stats: {
    marginTop: "10px",
    opacity: 0.8,
  },

  empty: {
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.3,
  },
};
