document.querySelector(".scroll-button.left").addEventListener("click", () => {
  document.querySelector(".scroll-content").scrollBy({
    left: -200, // Adjust this value to scroll by a specific amount
    behavior: "smooth",
  });
});

document.querySelector(".scroll-button.right").addEventListener("click", () => {
  document.querySelector(".scroll-content").scrollBy({
    left: 200, // Adjust this value to scroll by a specific amount
    behavior: "smooth",
  });
});
