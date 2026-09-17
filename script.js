
  const a = document.getElementById("coord-a");
  const b = document.getElementById("coord-b");
  const distance = document.getElementById("distance");
  const angle = document.getElementById("angle");
  const status = document.getElementById("status");
  const clear = document.getElementById("clear");

  function parseCoordinate(value) {
    const cleaned = value.trim().replace(/[()]/g, "");

    // Primary format: x54.63, y75.82
    const labeled = cleaned.match(
      /^\\s*x\\s*([-+]?\\d+(?:[.,]\\d+)?)\\s*,\\s*y\\s*([-+]?\\d+(?:[.,]\\d+)?)\\s*$/i
    );

    if (labeled) {
      const x = Number(labeled[1].replace(",", ".", " "));
      const y = Number(labeled[2].replace(",", ".", " "));

      if (Number.isFinite(x) && Number.isFinite(y)) {
        return { x, y };
      }
    }

    // Also accept: 54.63, 75.82
    const plain = cleaned.match(
      /^\\s*([-+]?\\d+(?:[.,]\\d+)?)\\s*,\\s*([-+]?\\d+(?:[.,]\\d+)?)\\s*$/
    );

    if (plain) {
      const x = Number(plain[1].replace(",", "."));
      const y = Number(plain[2].replace(",", "."));

      if (Number.isFinite(x) && Number.isFinite(y)) {
        return { x, y };
      }
    }

    throw new Error("Invalid format. Use: x54.63, y75.82");
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
