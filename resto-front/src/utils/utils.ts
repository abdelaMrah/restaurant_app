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


  export function formatDateOrDateTime(dateString: string | null | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Retourne une chaîne vide si la date est invalide
  
    // Vérifie si la chaîne d'origine contient une heure
    const hasTime = dateString.includes('T') || dateString.includes(' ');
  
    if (hasTime) {
      // Format datetime-local : YYYY-MM-DDThh:mm
      return date.toISOString().slice(0, 16);
    } else {
      // Format date : YYYY-MM-DD
      return date.toISOString().slice(0, 10);
    }
  }


  export 
  function formatDateOnly(dateString: string | null | undefined): string {
    if (!dateString) return '';
    
    let date: Date;
    try {
      // Tente de créer un objet Date à partir de la chaîne
      date = new Date(dateString);
      
      // Vérifie si la date est valide
      if (isNaN(date.getTime())) {
        console.error('Date invalide:', dateString);
        return '';
      }
      
      // Formate la date en YYYY-MM-DD, en utilisant UTC pour éviter les problèmes de fuseau horaire
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Erreur lors du traitement de la date:', error);
      return '';
    }
  }





  export function hashStringToColor(str:string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
     let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
}


export function stringToVividColor(str:string) {
  // Étape 1 : Calculer un hachage simple
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Étape 2 : Générer des valeurs HSL basées sur le hash
  const hue = Math.abs(hash % 360);              // Teinte : 0-360°
  const saturation = 75 + (hash % 20);           // Saturation : entre 75% et 95%
  const lightness = 50 + (hash % 10);            // Luminosité : entre 50% et 60%

  // Étape 3 : Convertir HSL en RGB
  return hslToHex(hue, saturation, lightness);
}

function hslToHex(h:number, s:number, l:number) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convertir en format hexadécimal
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Exemple d'utilisation
console.log(stringToVividColor("Hello World"));  // Génère une couleur vive distincte
