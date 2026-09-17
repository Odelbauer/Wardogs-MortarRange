
  const a = document.getElementById("coord-a");
  const b = document.getElementById("coord-b");
  const distance = document.getElementById("distance");
  const angle = document.getElementById("angle");
  const status = document.getElementById("status");
  const clear = document.getElementById("clear");

  function parseCoordinate(value) {
    const match = value.match(/x\s*([\d.-]+)\s*,\s*y\s*([\d.-]+)/i);

    if (!match) {
        throw new Error("Invalid coordinate format");
    }

    const x = parseFloat(match[1]);
    const y = parseFloat(match[2]);

    return { x, y };
}

  function calculate() {
    try {
      const A = parseCoordinate(a.value);
      const B = parseCoordinate(b.value);

      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const distanceInUnits = Math.hypot(dx, dy);

      if (distanceInUnits === 0) {
        throw new Error("Point A and Point B must be different.");
      }

      // Convert the coordinate distance to meters:
      // 1 coordinate unit = 100 meters.
      const meters = distanceInUnits * 100;

      // 0° = +Y, increasing clockwise:
      // +Y = 0°, +X = 90°, -Y = 180°, -X = 270°.
      let degrees = Math.atan2(dx, dy) * 180 / Math.PI;

      if (degrees < 0) {
        degrees += 360;
      }

      degrees %= 360;

      distance.textContent = Math.round(meters).toLocaleString("en-US");
      angle.textContent = degrees.toFixed(2);
      status.textContent = "";
    } catch (error) {
      distance.textContent = "—";
      angle.textContent = "—";
      status.textContent = error.message;
    }
  }

  [a, b].forEach((input) => {
    input.addEventListener("input", calculate);
  });

  clear.addEventListener("click", () => {
    a.value = "";
    b.value = "";
    distance.textContent = "—";
    angle.textContent = "—";
    status.textContent = "";
    a.focus();
  });

  calculate();
