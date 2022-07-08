const menus = document.querySelectorAll(".navbar__menu li");
const sections = Array.from(document.querySelectorAll("section"));
const arrowUp = document.querySelector(".arrow-up");

//메뉴 클릭시 화면 이동
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

//화면 일정 이상 내려갈 시 Up 버튼 생성
document.addEventListener("scroll", () => {
  if (scrollY >= NAVBAR__HEIGHT) {
    arrowUp.classList.add("active");
  } else {
    arrowUp.classList.remove("active");
  }
});

//Up 버튼 클릭 시 맨 위로
arrowUp.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
