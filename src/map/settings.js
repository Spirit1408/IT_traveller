const getToken = () => {
  const token = import.meta.env.VITE_MAPBOX_TOKEN
  return token
}

export const mapSettings = {
  style: 'mapbox://styles/mapbox/streets-v12',
  apiToken: getToken(),
}
