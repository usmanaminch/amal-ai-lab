const tabButtons = document.querySelectorAll(".tab-button");
const tabLinks = document.querySelectorAll(".tab-link");
const tabPanels = document.querySelectorAll(".tab-panel");
const moreButton = document.querySelector(".more-button");
const moreMenu = document.querySelector(".more-menu");

const moreTabs = ["classes", "recipes"];

function showTab(tabName) {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabName);
  });

  if (moreButton) {
    moreButton.classList.toggle("active", moreTabs.includes(tabName));
  }

  if (moreMenu) {
    moreMenu.classList.remove("open");
  }
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showTab(button.dataset.tab);
  });
});

tabLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showTab(link.dataset.tab);
  });
});

if (moreButton && moreMenu) {
  moreButton.addEventListener("click", (event) => {
    event.stopPropagation();
    moreMenu.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!moreMenu.contains(event.target) && !moreButton.contains(event.target)) {
      moreMenu.classList.remove("open");
    }
  });
}

const favoriteMessageButton = document.querySelector("#favorite-message-button");
const favoriteMessage = document.querySelector("#favorite-message");

if (favoriteMessageButton && favoriteMessage) {
  favoriteMessageButton.addEventListener("click", () => {
    favoriteMessage.classList.toggle("show");
  });
}
