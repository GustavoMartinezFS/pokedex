import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

export const getPokemonList = async (limit = 50, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon`, {
      params: { limit, offset }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching Pokemon list:', error)
    throw error
  }
}

export const getPokemonDetails = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon/${name}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error)
    throw error
  }
}
