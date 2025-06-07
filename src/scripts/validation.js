export const validateName = (name) => {
  if (!name.trim()) return 'Name is required'
  if (name.length < 2) return 'Name must be at least 2 characters'
  if (name.length > 40) return 'Name must be less than 40 characters'
  return ''
}

export const validateImageUrl = (url) => {
  if (!url.trim()) return 'Image URL is required'
  try {
    new URL(url)
  } catch {
    return 'Enter a valid URL'
  }
  return ''
}

export const validateWeather = (weather) => {
  if (!weather) return 'Please select a weather type'
  return ''
}
