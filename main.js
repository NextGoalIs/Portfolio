const menus = document.querySelectorAll(".navbar__menu li");
const sections = Array.from(document.querySelectorAll("section"));

const NAVBAR__HEIGHT = 99;

function menuClickHandler(e) {
  menus.forEach((menu) => (menu.classList = ""));
  e.target.classList = "active";
  scrollTo({
    top:
      sections.find((sec) => sec.className === e.target.id).offsetTop -
      NAVBAR__HEIGHT,
    behavior: "smooth",
  });
}

menus.forEach((menu) => {
  menu.addEventListener("click", menuClickHandler);
});
