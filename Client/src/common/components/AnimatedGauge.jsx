import { useState, useEffect } from "react";
import { Gauge } from "@mui/x-charts/Gauge";

const AnimatedGauge = ({ value, valueMax }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (typeof value !== "number" || isNaN(value)) return; // Evita NaN

    let progress = 0;
    const step = Math.max(1, Math.floor(value / 100));
    const intervalTime = 10;

    const interval = setInterval(() => {
      progress += step;
      if (progress >= value) {
        setAnimatedValue(value);
        clearInterval(interval);
      } else {
        setAnimatedValue(progress);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <Gauge
      width={140}
      height={70}
      value={animatedValue || 0} // Siempre empieza en 0
      startAngle={-90}
      endAngle={90}
      valueMax={valueMax || 100} // Valor por defecto en caso de que no esté cargado
    />
  );
};

export default AnimatedGauge;