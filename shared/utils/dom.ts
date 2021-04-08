export const extractTextFromHTML = (input: string | HTMLElement) => {
  const isElement = input instanceof HTMLElement;
  const vElement = isElement ? (input as HTMLElement) : document.createElement('div');

  if (!isElement) {
    vElement.innerHTML = input as string;
  }

  return vElement.textContent;
};
