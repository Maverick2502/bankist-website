'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//    ----Button Scrolling----
btnScrollTo.addEventListener("click", e => {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});

//    ----Page Navigation----
//Event Propagation
document.querySelectorAll(".nav__link").forEach(function(el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href")
    document.querySelector(id).scrollIntoView({ behavior: "smooth" })
  })
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
})

//    ----Tabbed Components----
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  //Guard clause
  if (!clicked) return;
  //Remove active classes
  tabs.forEach(t => t.classList.remove("operations__tab--active"));
  tabsContent.forEach(c => c.classList.remove("operations__content--active"));
  
  //Activate tab
  clicked.classList.add("operations__tab--active");
  
  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add("operations__content--active")
})

//    ----Menu Fade Animation----
const nav = document.querySelector(".nav");

function handleHover(opacity) {
  return function(e) {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav__link");
      // const logo = link.closest(".nav").querySelector("img");
      
      siblings.forEach(el => {
        if (el !== link) el.style.opacity = opacity;
      });
      // logo.style.opacity = opacity;
    }
  }
}

nav.addEventListener("mouseover", handleHover(0.5));
nav.addEventListener("mouseout", handleHover(1));


//    ----Sticky Navigation----

// //Approach #1
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", () => {
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// })

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header)


//    ----Reveal sections----
const allSections = document.querySelectorAll(".section");

const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden")
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function(section) {
  sectionObserver.observe(section)
  // section.classList.add("section--hidden")
});

