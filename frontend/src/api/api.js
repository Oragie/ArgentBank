export async function getUserData() {
  try {
    const response = await fetch("/logements.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    return [];
  }
}

export async function getApropos() {
  try {
    const response = await fetch("/apropos.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    return [];
  }
}
