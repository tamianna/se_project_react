const validateName = (name) => {
  if (!name.trim()) return 'Name is required'
  if (name.length < 2) return 'Name must be at least 2 characters'
  if (name.length > 40) return 'Name must be less than 40 characters'
  return ''
}

const validateImageUrl = (url) => {
  if (!url.trim()) return 'Image URL is required'
  try {
    new URL(url)
  } catch {
    return 'Enter a valid URL'
  }
  return ''
}

const validateWeather = (weather) => {
  if (!weather) return 'Please select a weather type'
  return !['hot', 'warm', 'cold'].includes(weather)
    ? 'Select a weather option'
    : ''
}

const isFormValid = (name, imageUrl, weather) => {
  return (
    !validateName(name) &&
    !validateImageUrl(imageUrl) &&
    !validateWeather(weather)
  )
}

export { validateName, validateImageUrl, validateWeather, isFormValid }
