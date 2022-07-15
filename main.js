const menus = Array.from(document.querySelectorAll(".navbar__menu li"));
const sections = Array.from(document.querySelectorAll("section"));
const arrowUp = document.querySelector(".arrow-up");
const skills = document.querySelectorAll(".skill");
const descriptionMsg = document.querySelector(".msg");

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
const options = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entry) => {
  if (entry[0].isIntersecting) {
    arrowUp.classList.remove("active");
  } else {
    arrowUp.classList.add("active");
  }
}, options);
observer.observe(sections[0]);

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

//skill 선택 시 description 보여주기
skills.forEach((content) =>
  content.addEventListener("click", (e) => {
    const id = e.target.id
      ? e.target.id
      : e.target.parentElement.id
      ? e.target.parentElement.id
      : e.target.parentElement.parentElement.id;
    switch (id) {
      case "HTML":
        descriptionMsg.innerHTML =
          '<p class="content">HTML 작성 시 시멘틱 마크업을 준수하려 노력중입니다.</p>';
        break;

      case "CSS":
        descriptionMsg.innerHTML =
          '<p class="content">flex를 주로 사용하는 편이며, 현재는 리액트와 emotion/styled를 이용하여 css in js를 맛보고 있습니다.</p>';
        break;

      case "JavaScript":
        descriptionMsg.innerHTML =
          '<p class="content">처음 배운 프로그래밍 언어라 애착있는 언어입니다. 프로토타입, 클로져, 비동기 등 전반적인 언어 지식은 갖추었습니다. 지금은 타입에 대한 불편함을 느껴 TypeScript를 주로 이용하고 있습니다. </p>';
        break;

      case "React":
        descriptionMsg.innerHTML =
          '<p class="content">처음으로 배운 프론트엔드 라이브러리입니다. 생각보다 쉽고 성능이 좋아서 신기했습니다. 현재는 NextJS를 공부중입니다. 리액트 자체의 러닝 커브는 높지 않았으나, 수많은 라이브러리와 프레임워크들에 진이 빠져있는 상태입니다. </p>';
        break;
      case "TypeScript":
        descriptionMsg.innerHTML =
          '<p class="content">정말 배우길 잘했다는 생각이 드는 언어입니다. 컴파일중에 타입 체크를 받을 수 있는 것, 그로 인해 모든 객체에서 메서드 자동 완성을 가능케 해주는것이 매우 편리합니다. 추후 타입스크립트로 풀스택 개발 해보는것이 목표입니다.</p>';
        break;
      default:
        break;
    }
  })
);
