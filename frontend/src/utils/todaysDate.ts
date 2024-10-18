  // genererar dagens datum
  export const todaysDate = new Date().toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });