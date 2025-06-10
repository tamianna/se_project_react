export function handleSubmitButton(setLoading, asyncAction) {
  setIsLoading(true)
  return asyncAction()
    .catch(console.error)
    .finally(() => setIsLoading(false))
}
