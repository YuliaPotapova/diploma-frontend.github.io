
export function setIsClosed (elementsArray) {
  elementsArray.forEach(el => {
    if (!Array.from(el.classList).includes('is-closed')) el.classList.add('is-closed');
  })
}

export function removeIsClosed (elementsArray) {
  elementsArray.forEach(el => {
    if (Array.from(el.classList).includes('is-closed')) el.classList.remove('is-closed');
  })
}

export function setIsInvisible (elementsArray) {
  elementsArray.forEach(el => {
    if (el && !Array.from(el.classList).includes('is-invisible')) el.classList.add('is-invisible');
  })
}

export function removeIsInvisible (elementsArray) {
  elementsArray.forEach(el => {
    if (el && Array.from(el.classList).includes('is-invisible')) el.classList.remove('is-invisible');
  })
}

 // Метод экранирования данных, вводимых пользователем (для insertAdjacentHTML)
 export function escapeHtml(string) {
    const entityMap = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
    };
    return String(string).replace(/[&<>"'`=/]/g, (s) => entityMap[s]);
  }

