export const getChannels = () => {
  const channels = localStorage.getItem("channels")
  try {
    return JSON.parse(channels)
  } catch (e) {
    return {}
  }
}
