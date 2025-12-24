document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && window.location.hash) {
    // Remove the hash without reloading the page
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }
});
