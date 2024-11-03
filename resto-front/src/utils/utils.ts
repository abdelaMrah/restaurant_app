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