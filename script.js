async function calculateDistance() {
  const lat1 = parseFloat(document.getElementById("lat1").value);
  const lng1 = parseFloat(document.getElementById("lng1").value);
  const lat2 = parseFloat(document.getElementById("lat2").value);
  const lng2 = parseFloat(document.getElementById("lng2").value);
  const unit = document.getElementById("unit").value;
  const apiKey = document.getElementById("apiKey").value;

  if (!apiKey) {
    alert("API key is required.");
    return;
  }

  const body = {
    point1: { lat: lat1, lng: lng1 },
    point2: { lat: lat2, lng: lng2 },
    unit
  };

  try {
    const res = await fetch("http://localhost:4000/api/distance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("result").innerText = "❌ Error: " + (data.error || "Unexpected error");
      return;
    }

    document.getElementById("result").innerText =
      data.distance ? `✅ Distance: ${data.distance} ${data.unit}` :
      data.distances ? `✅ Distances: ${data.distances.join(", ")} ${data.unit}` :
      "⚠️ No data found.";
  } catch (err) {
    document.getElementById("result").innerText = "❌ Network Error: " + err.message;
  }
}
