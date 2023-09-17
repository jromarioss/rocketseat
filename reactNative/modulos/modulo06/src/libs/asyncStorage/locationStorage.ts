import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@ignitefleet:location';

type LocationProps = {
  latitude: number;
  longitude: number;
  timestamp: number
}

export async function getStorageLocation() {
  const storage = await AsyncStorage.getItem(STORAGE_KEY); // pega a chave
  const response = storage ? JSON.parse(STORAGE_KEY) : []; // se tem a chave converte pra json se n trás array vazio

  return response; // e retorna a chave
}

export async function saveStorageLocation(newLocation: LocationProps) {
  const storage = await getStorageLocation(); // chama o storage
  storage.push(newLocation); // da um push na localização

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storage)); // ai salva as cordenadas
}

export async function removeStorageLocation() {
  await AsyncStorage.removeItem(STORAGE_KEY,);
}
