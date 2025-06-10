export function setButtonText(
  button,
  isLoading,
  defaultText = "Add garment",
  loadingText = "Adding..."
) {
  button.textContent = isLoading ? loadingText : defaultText;
}

export function handleSubmitButton(request, evt, loadingText = "Adding...") {
  evt.preventDefault();

  const sumbitButton = evt.submitter;
  const initialText = sumbitButton.textContent;

  setButtonText(sumbitButton, true, initialText, loadingText);

  request()
  .then(() => {
    evt.target.reset();
  })
  .catch(console.error)
  .finally(() => {
    setButtonText(sumbitButton, false, initialText);
  });
}