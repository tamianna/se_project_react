export function setButtonText(button, isLoading, defaultText, loadingText) {
  if (!button) return
  button.textContent = isLoading ? loadingText : defaultText
}

/**
 * Handles setting loading state and button text for a submit/click handler.
 *
 * @param {Function} setIsLoading - React state setter for loading.
 * @param {Function} asyncAction - A function that returns a Promise (e.g. API call).
 * @param {Object} options - Optional config object.
 * @param {Event} [options.event] - The event from the submit or click handler.
 * @param {string} [options.loadingText] - Text to show while loading.
 * @param {boolean} [options.resetForm=true] - Whether to reset the form on success.
 */
export function handleSubmitButton(
  setIsLoading,
  asyncAction,
  { event = null, loadingText = 'Saving...', resetForm = true } = {}
) {
  if (event?.preventDefault) event.preventDefault()

  const button = event?.submitter
  const defaultText = button?.textContent

  setIsLoading(true)
  setButtonText(button, true, defaultText, loadingText)

  return asyncAction()
    .then(() => {
      if (resetForm && event?.target?.reset) {
        event.target.reset()
      }
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(button, false, defaultText, loadingText)
      setIsLoading(false)
    })
}
