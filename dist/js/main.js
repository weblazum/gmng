"use strict";


// меню
const menu = document.querySelector('.nav'),
	burger = document.querySelector('.burger'),
	overlay = document.querySelector('.overlay'),
	body = document.body;

burger.addEventListener('click', () => {
	menu.classList.toggle('nav--active');
	overlay.classList.toggle('visible');
	burger.classList.toggle('opened');
	burger.setAttribute('aria-expanded', burger.classList.contains('opened'));
	body.classList.toggle('lock');
});

overlay.addEventListener('click', () => {
	menu.classList.remove('nav--active');
	overlay.classList.remove('visible');
	burger.classList.remove('opened');
	body.classList.remove('lock');
});

// поиск
const searchForm = document.querySelector('.search__form'),
	searchInput = document.querySelector('.search__input'),
	searchIcon = document.querySelector('.search__icon');

searchIcon.addEventListener('click', function () {
	searchForm.classList.add('search__form--active');
	searchIcon.classList.add('search__icon--hidden');
	searchInput.classList.add('search__input--active');
	setTimeout(() => searchInput.focus(), 50);
});

searchInput.addEventListener('blur', function () {
	if (searchInput.value != "") {
	}
	else {
		searchForm.classList.remove('search__form--active');
		searchInput.classList.remove('search__input--active');
		searchIcon.classList.remove('search__icon--hidden');
	}
});

// яндекс карта

let ymapCenter = [55.814634569962315, 37.38576113373838];

function getYaMap() {
	let ymap = new ymaps.Map('ymap', {
		center: ymapCenter,
		zoom: 16
	});

	let placemark = new ymaps.Placemark(ymapCenter, {
		balloonContentHeader: 'Merlion',
		balloonContentBody: 'МО, Красногорский район, г. Красногорск, бульвар Строителей, д. 4, корп. 1',
		balloonContentFooter: '+7 (495) 981 84 84<br><a href="https://merlion.com">merlion.com</a>'
	}, {
		iconLayout: 'default#image',
		iconImageHref: '/gmng/img/placemark.svg',
		iconImageSize: [45, 45],
		iconImageOffset: [-19, -24]
	});

	ymap.controls.remove('geolocationControl'); // удаляем геолокацию
	ymap.controls.remove('searchControl'); // удаляем поиск
	ymap.controls.remove('trafficControl'); // удаляем контроль трафика
	ymap.controls.remove('typeSelector'); // удаляем тип
	ymap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	ymap.controls.remove('rulerControl'); // удаляем контрол правил
	ymap.geoObjects.add(placemark);
}

// настройка isotope

var $grid = $('.grid').isotope({
	itemSelector: '.grid-item',
	percentPosition: true,
	layoutMode: 'fitRows',
	sortBy: 'random',
});

var filterFns = {
	numberGreaterThan50: function () {
		var number = $(this).find('.number').text();
		return parseInt(number, 10) > 50;
	},
	ium: function () {
		var name = $(this).find('.name').text();
		return name.match(/ium$/);
	}
};

$('.filters-cat').on('click', 'button', function () {
	var filterValue = $(this).attr('data-filter');
	// use filterFn if matches value
	filterValue = filterFns[filterValue] || filterValue;
	$grid.isotope({ filter: filterValue });
});

$('.filters-cat').each(function (i, buttonGroup) {
	var $buttonGroup = $(buttonGroup);
	$buttonGroup.on('click', 'button', function () {
		$buttonGroup.find('.filter-btn--active').removeClass('filter-btn--active');
		$(this).addClass('filter-btn--active');
	});
});

// загрузка изображений до isotope

$grid.imagesLoaded().progress(function () {
	$grid.isotope('layout');
});

// настройка fancybox

$('[data-fancybox="items-gallery"]').fancybox({
	buttons: [
		// 'slideShow',
		// 'zoom',
		// 'fullScreen',
		'download',
		'close'
	],
	backFocus: false,
	loop: true,
	// keyboard: true,
	// arrows: true,
	infobar: false,
	// smallBtn: true,
	toolbar: true,
	protect: true,
	// modal: true,
	// idleTime: 3,
	// animationEffect: "zoom-in-out",
	// animationDuration: 600,
	// transitionEffect: "rotate",
	// transitionDuration: 400,
	fitToView: false,
	idleTime: false,
});

// табы

let tabs = document.querySelector('.tabs');
let tabTrigger = document.querySelector('.tab-trigger');
let tabTriggers = document.querySelectorAll('.tab-trigger');
let tabBlocks = document.querySelectorAll('.tab-block');
let featuresSection = document.querySelector('.features');

if (tabs !== null && tabTrigger !== null && featuresSection !== null) {
	tabTriggers.forEach((item) => {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			const id = e.target.getAttribute('href').replace('#', '');

			tabTriggers.forEach(
				(child) => child.classList.remove('tab-trigger--active')
			);

			tabBlocks.forEach(
				(child) => child.classList.remove('tab-block--active')
			);

			item.classList.add('tab-trigger--active');
			document.getElementById(id).classList.add('tab-block--active');
		})
	});

	tabTrigger.click();
}
if (tabs !== null && tabTrigger === null) {
	featuresSection.remove();
}

// слайдер

let prodAlsoSection = document.querySelector('.products-also');
let prodAlsoItem = document.querySelectorAll('.products-also .products__item');

if (prodAlsoItem.length === 0 && prodAlsoSection !== null) {
	prodAlsoSection.style.display = 'none';
};

let slider = document.querySelector('.swiper');
let slideItem = document.querySelectorAll('.swiper-slide');
let sliderNav = document.querySelector('.products-buttons');

let productSection = document.querySelector('.products-also');
let productSlider = document.querySelector('.swiper-products');
let productSlideItem = document.querySelectorAll('.products__item');

if (slider !== 0 && slideItem.length > 1) {
	const swiperGalleryThumb = new Swiper('.gallery__thumb', {
		slidesPerView: 4,
		watchOverflow: 'boolean',
		// centeredSlides: true,
		// centeredSlidesBounds: true,
		// loop: true,
		// autoScrollOffset: 5,
		// loopedSlides: 4,
		// autoHeight: false,
		spaceBetween: 20,
		slideToClickedSlide: true,
		// rewind: true,
		// preventClicks: false,
		// preventClicksPropagation: false,

		breakpoints: {
			1200: {
				slidesPerView: 5,
			}
		},
		navigation: {
			nextEl: '.swiper-button-next.gallery-button-next',
			prevEl: '.swiper-button-prev.gallery-button-prev',
		},
	});
	const swiperGalleryMain = new Swiper('.gallery__main', {
		slidesPerView: 1,
		autoHeight: true,
		// calculateHeight: true,
		// loop: true,
		// loopedSlides: 5,
		effect: 'fade',
		autoHeight: false,
		// slideToClickedSlide: true,
		// rewind: true,
		// autoScrollOffset: 5,
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.swiper-pagination.gallery-pagination',
			type: 'bullets',
			clickable: true,
		},
		thumbs: {
			swiper: swiperGalleryThumb
		},
	});

	swiperGalleryMain.controller.control = swiperGalleryThumb;

	const swiperBanner = new Swiper('.swiper-banner', {
		slidesPerView: 1,
		loop: true,
		effect: "fade",
		autoplay: { delay: 5000 },
		simulateTouch: false,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	const swiperUt = new Swiper('.swiper-utilities', {
		loop: true,
		slidesPerView: 1,
		effect: "fade",
		autoplay: { delay: 2000 },
		simulateTouch: false,
	});

}
if (productSlider !== null) {
	if (productSlideItem.length > 1) {
		const swiperProducts = new Swiper('.swiper-products', {
			slidesPerView: 1,
			slidesPerGroup: 1,
			navigation: {
				nextEl: '.products-button-next.swiper-button-next',
				prevEl: '.products-button-prev.swiper-button-prev',
			},
			breakpoints: {
				1200: {
					slidesPerView: 4,
				},
				1024: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 2,
				},
			},
		});
	}
	else {
		sliderNav.style.display = 'none';
	}

	if (productSlideItem.length === 0) {
		productSection.remove();
	}
};

// кнопка прокрутки 

function scrollUp(to, duration = 700) {
	const
		element = document.scrollingElement || document.documentElement,
		start = element.scrollTop,
		change = to - start,
		startDate = +new Date(),
		// t = current time
		// b = start value
		// c = change in value
		// d = duration
		easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		},
		animateScroll = function () {
			const currentDate = +new Date();
			const currentTime = currentDate - startDate;
			element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			}
			else {
				element.scrollTop = to;
			}
		};
	animateScroll();
}

document.addEventListener('DOMContentLoaded', function () {
	let btn = document.querySelector('#toTop');
	window.addEventListener('scroll', function () {
		if (pageYOffset > 1200) {
			btn.classList.add('show');
		} else {
			btn.classList.remove('show');
		}
	});

	// При клике прокручиваем на самый верх
	btn.onclick = function (click) {
		click.preventDefault();
		scrollUp(0, 700);
	}
});