// Реализация модального окна для мобильного адаптива

const burger = document.querySelector(".burger");
const phone_modal = document.querySelector(".phone_modal_wrapper");
const close_btn = document.querySelector(".close_button");

burger.addEventListener("click", () => {
	phone_modal.style.display = "block";
	document.body.classList.add("no-scroll");
});

close_btn.addEventListener("click", () => {
	phone_modal.style.display = "none";
	document.body.classList.remove("no-scroll");
});

const modalLinks = document.querySelectorAll(".phone_modal_list a");

function closePhoneModal() {
	phone_modal.style.display = "none";
	document.body.classList.remove("no-scroll");
}

modalLinks.forEach((link) => {
	link.addEventListener("click", closePhoneModal);
});

// Открытие формы отправки заявки
// const form_open_button = document.querySelectorAll(".buttons");

// const form_section = document.querySelector(".form_section_wrapper");

// form_open_button.forEach((button) => {
// 	button.addEventListener("click", () => {
// 		form_section.style.display = "flex";
// 	});
// });

// form_section.addEventListener("click", (e) => {
// 	if (e.target == form_section) {
// 		form_section.style.display = "none";
// 	}
// });

// ________________________

const form_open_button = document.querySelectorAll(".buttons");
const form_section = document.querySelector(".form_section_wrapper");
const form = document.querySelector(".form_section");

const success_modal = document.querySelector(".success_modal_wrapper");

function openFormModal() {
	form_section.style.display = "flex";
	document.body.classList.add("no-scroll");
}

function closeFormModal() {
	form_section.style.display = "none";
	document.body.classList.remove("no-scroll");
}

function openSuccessModal() {
	success_modal.style.display = "flex";
	document.body.classList.add("no-scroll");

	setTimeout(() => {
		success_modal.style.display = "none";
		document.body.classList.remove("no-scroll");
	}, 2000);
}

form_open_button.forEach((button) => {
	button.addEventListener("click", openFormModal);
});

form_section.addEventListener("click", (e) => {
	if (e.target === form_section) {
		closeFormModal();
	}
});

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (!form.checkValidity()) {
		form.reportValidity();
		return;
	}

	form_section.style.display = "none";
	openSuccessModal();

	form.reset();
});

let successTimer;

function closeSuccessModal() {
	success_modal.style.display = "none";
	document.body.classList.remove("no-scroll");

	clearTimeout(successTimer);
}

function openSuccessModal() {
	success_modal.style.display = "flex";
	document.body.classList.add("no-scroll");

	successTimer = setTimeout(() => {
		closeSuccessModal();
	}, 1500);
}

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		if (success_modal.style.display === "flex") {
			closeSuccessModal();
			return;
		}

		if (form_section.style.display === "flex") {
			closeFormModal();
		}
	}
});

// Галерея
const gallery = document.querySelector("#galleryCarousel");
const cards = Array.from(document.querySelectorAll(".gallery_card"));
const prevButton = document.querySelector(".gallery_arrow_prev");
const nextButton = document.querySelector(".gallery_arrow_next");

let activeIndex = 0;
let isLocked = false;

function getOffset(index) {
	const total = cards.length;
	let offset = index - activeIndex;

	if (offset > total / 2) {
		offset -= total;
	}

	if (offset < -total / 2) {
		offset += total;
	}

	return offset;
}

function renderGallery() {
	cards.forEach((card, index) => {
		card.className = "gallery_card";

		const offset = getOffset(index);

		if (offset === 0) {
			card.classList.add("is-active");
		} else if (offset === -1) {
			card.classList.add("is-prev");
		} else if (offset === 1) {
			card.classList.add("is-next");
		} else if (offset === -2) {
			card.classList.add("is-prev-2");
		} else if (offset === 2) {
			card.classList.add("is-next-2");
		}
	});
}

function changeSlide(direction) {
	if (isLocked) return;

	isLocked = true;

	activeIndex += direction;

	if (activeIndex < 0) {
		activeIndex = cards.length - 1;
	}

	if (activeIndex >= cards.length) {
		activeIndex = 0;
	}

	renderGallery();

	setTimeout(() => {
		isLocked = false;
	}, 550);
}

nextButton.addEventListener("click", () => {
	changeSlide(1);
});

prevButton.addEventListener("click", () => {
	changeSlide(-1);
});

gallery.addEventListener(
	"wheel",
	(event) => {
		if (window.innerWidth <= 768) return;
		event.preventDefault();

		const delta =
			Math.abs(event.deltaY) > Math.abs(event.deltaX)
				? event.deltaY
				: event.deltaX;

		if (delta > 0) {
			changeSlide(1);
		} else {
			changeSlide(-1);
		}
	},
	{ passive: false },
);

renderGallery();
