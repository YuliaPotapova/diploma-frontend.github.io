// Функция, отображающая процесс загрузки на кнопке
export function renderLoading (ButtonElement, staticButtonText, loadingButtonText, isLoading) {
  if (isLoading) {
    ButtonElement.textContent = loadingButtonText;
  } else {
    ButtonElement.textContent = staticButtonText;
  }
}