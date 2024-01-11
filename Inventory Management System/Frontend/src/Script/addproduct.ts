function addProducts() {
  const container = document.querySelector(
    ".addproduct-container"
  ) as HTMLElement | null;
  if (container) {
    container.style.display = "block";
  }
}
