const bodyCards = document.querySelectorAll(".body-card");
const learnButtons = document.querySelectorAll(".learn-button");
const filterButtons = document.querySelectorAll(".filter-button");

learnButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".body-card");
    card.classList.toggle("open");

    if (card.classList.contains("open")) {
      button.textContent = "Hide";
    } else {
      button.textContent = "Explore";
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });

    bodyCards.forEach((card) => {
      const categories = card.dataset.category;

      if (filter === "all" || categories.includes(filter)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});
