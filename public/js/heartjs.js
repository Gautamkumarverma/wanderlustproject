document.querySelectorAll(".heart-icon").forEach(function (icon) {
  icon.addEventListener("click", function () {
    icon.classList.toggle("liked");
  });
});
