async function request(path){
  try {
    const response = await fetch(`http://localhost:8000/${path}`);
    return response.json();
  } catch (error) {
    throw new Error("Erreur lors du chargement"); 
  }
}

export const api = {
  get: (path)=>request(path)
}