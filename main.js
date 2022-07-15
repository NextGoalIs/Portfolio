const menus = Array.from(document.querySelectorAll(".navbar__menu li"));
const sections = Array.from(document.querySelectorAll("section"));
const arrowUp = document.querySelector(".arrow-up");

let selectedMenu = menus[0];
let selectedMenuIndex = 0;

//새로고침 시 맨 위로 올 수 있도록 초기화
setTimeout(moveClientScreen, 1);

function activeMenu(target) {
  menus.forEach((menu) => (menu.classList = ""));
  target.classList = "active";
}

function moveClientScreen() {
  selectedMenu = menus[selectedMenuIndex];
  activeMenu(selectedMenu);
  sections[selectedMenuIndex].scrollIntoView({ behavior: "smooth" });
}

//메뉴 클릭시 화면 이동
function menuClickHandler(e) {
  selectedMenuIndex = menus.indexOf(e.target);
  moveClientScreen();
}

menus.forEach((menu) => {
  menu.addEventListener("click", menuClickHandler);
});

//화면 일정 이상 내려갈 시 Up 버튼 생성
const MIN_HEIGHT_FOR_UP_BTN = 200;
document.addEventListener("scroll", () => {
  if (scrollY >= MIN_HEIGHT_FOR_UP_BTN) {
    arrowUp.classList.add("active");
  } else {
    arrowUp.classList.remove("active");
  }
});

//Up 버튼 클릭 시 맨 위로
arrowUp.addEventListener("click", () => {
  selectedMenuIndex = 0;
  moveClientScreen();
});

//scroll section to section

window.addEventListener(
  "mousewheel",
  (event) => {
    event.preventDefault();
    let moveTop = 0;
    //휠 위로 올릴 때
    if (event.deltaY < 0) {
      if (selectedMenuIndex === 0) return;

      selectedMenuIndex -= 1;
    } else {
      // 휠 아래로 내릴 때
      if (selectedMenuIndex === menus.length - 1) return;

      selectedMenuIndex += 1;
    }

    moveClientScreen();
  },
  { passive: false }
);
