const menus = Array.from(document.querySelectorAll(".navbar__menu li"));
const sections = Array.from(document.querySelectorAll("section"));
const arrowUp = document.querySelector(".arrow-up");

//메뉴 클릭시 화면 이동
const NAVBAR__HEIGHT = 99;

function menuClickHandler(e) {
  menus.forEach((menu) => (menu.classList = ""));
  e.target.classList = "active";
  scrollTo({
    top:
      sections.find((sec) => sec.className.includes(e.target.id)).offsetTop -
      NAVBAR__HEIGHT,
    behavior: "smooth",
  });
}

menus.forEach((menu) => {
  menu.addEventListener("click", menuClickHandler);
});

//화면 일정 이상 내려갈 시 Up 버튼 생성
document.addEventListener("scroll", () => {
  if (scrollY >= NAVBAR__HEIGHT * 2) {
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

//IntersectionObserver를 이용한, 스크롤 시 메뉴 active 전환
//잠시 보류!!!

// let selectedMenu = menus[0];
// selectedMenu.classList = "active";

// const observerCallback = (entries) => {
//   menus.forEach((menu) => (menu.classList = ""));
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting && entry.intersectionRatio > 0) {
//       console.log(entry);
//       const index = sections.indexOf(entry.target);
//       let selectedIndex;
//       console.log(entry.target);
//       if (entry.boundingClientRect.y < 0) {
//         selectedIndex = index - 1;
//       } else {
//         selectedIndex = index + 1;
//       }
//       menus[selectedIndex].classList = "active";
//       return false;
//     }
//   });
// };

// const observerOptions = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);

// sections.forEach((sec) => observer.observe(sec));
