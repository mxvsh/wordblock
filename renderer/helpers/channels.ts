export const getChannels = () => {
  const channels = localStorage.getItem("channels")
  try {
    return JSON.parse(channels)
  } catch (e) {
    return {}
  }
}

export const deleteChannel = (id: string) => {
  let channels = localStorage.getItem("channels")

  try {
    channels = JSON.parse(channels)
    delete channels[id]
    localStorage.setItem("channels", JSON.stringify(channels))
  } catch (e) {}
}
