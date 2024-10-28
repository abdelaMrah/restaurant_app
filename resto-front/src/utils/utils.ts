 export function hexToRgba(hex:string, opacity = 1) {
    // Vérifie si le hex commence par "#" et le retire
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }
  
    // Cas où le hex est court (3 caractères) comme "fff"
    if (hex.length === 3) {
      hex = hex.split("").map(char => char + char).join("");
    }
  
    // Convertit chaque partie de la couleur hex en nombre pour le rouge, vert et bleu
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
  
    // Retourne la couleur en format rgba
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }