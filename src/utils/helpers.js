export function handleSubmitButton(setIsLoading, asyncAction) {
  setIsLoading(true)
  return asyncAction()
    .catch(console.error)
    .finally(() => setIsLoading(false))
}
