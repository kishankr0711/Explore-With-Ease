document.addEventListener('DOMContentLoaded', function() {

	function showToast(message, type) {
		var overlay = document.createElement('div');
		overlay.className = 'toast-overlay';

		var toast = document.createElement('div');
		toast.textContent = message;
		toast.className = 'toast';

		if (type === 'error') {
			toast.classList.add('toast--error');
		}

		overlay.appendChild(toast);
		document.body.appendChild(overlay);

		setTimeout(function() {
			overlay.classList.add('toast-overlay--hide');
			toast.classList.add('toast--hide');
		}, 2400);

		setTimeout(function() {
			overlay.remove();
		}, 3000);
	}

	function scrollToSection(sectionSelector) {
		var section = document.querySelector(sectionSelector);
		if (section) {
			section.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
			var navLinks = document.querySelector('.nav__links');
			if (navLinks && navLinks.classList.contains('active')) {
				navLinks.classList.remove('active');
			}
		}
	}

	function escapeHTML(text) {
		var div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}
//mobile menu
	var nav = document.querySelector('nav');
	var navLogo = document.querySelector('.nav__logo');
	var menuToggle = document.createElement('div');
	menuToggle.className = 'nav__toggle';
	menuToggle.innerHTML = '<span></span><span></span><span></span>';
	
	navLogo.parentNode.insertBefore(menuToggle, navLogo.nextSibling);
	
	menuToggle.addEventListener('click', function() {
		var navLinks = document.querySelector('.nav__links');
		navLinks.classList.toggle('active');
	});

	var allTrips = [
		{
			image: 'assets/trip-1.jpg',
			title: 'Wasserwerk Frelberg, Germany',
			rating: '4.2',
			price: 'INR 24,000'
		},
		{
			image: 'assets/trip-2.jpg',
			title: 'Patagonia, Argentina and Chile',
			rating: '4.5',
			price: 'INR 36,000'
		},
		{
			image: 'assets/trip-3.jpg',
			title: 'The Dolomites, Italy',
			rating: '4.7',
			price: 'INR 32,000'
		},
		{
			image: 'assets/destination-1.jpg',
			title: 'Banff National Park, Canada',
			rating: '4.8',
			price: 'INR 42,000'
		},
		{
			image: 'assets/destination-2.jpg',
			title: 'Machu Picchu, Peru',
			rating: '4.9',
			price: 'INR 45,000'
		},
		{
			image: 'assets/destination-3.jpg',
			title: 'Lauterbrunnen Valley, Switzerland',
			rating: '4.6',
			price: 'INR 38,000'
		},
		{
			image: 'assets/destination-4.jpg',
			title: 'Zhangjiajie National Park, China',
			rating: '4.4',
			price: 'INR 35,000'
		}
	];

	var currentSlide = 0;
	var slidesToShow = 3;

	function createTripCard(trip) {
		var card = document.createElement('div');
		card.className = 'trip__card';
		card.innerHTML =
			'<img src="' + trip.image + '" alt="trip" />' +
			'<div class="trip__details">' +
				'<p>' + trip.title + '</p>' +
				'<div class="rating"><i class="ri-star-fill"></i> ' + trip.rating + '</div>' +
				'<div class="booking__price">' +
					'<div class="price"><span>From</span> ' + trip.price + '</div>' +
					'<button class="book__now">Book Now</button>' +
				'</div>' +
			'</div>';
		return card;
	}

	function updateTripSlider() {
		var tripGrid = document.querySelector('.trip__grid');
		if (!tripGrid) return;

		tripGrid.innerHTML = '';

		for (var i = 0; i < slidesToShow; i++) {
			var index = (currentSlide + i) % allTrips.length;
			var card = createTripCard(allTrips[index]);
			tripGrid.appendChild(card);
		}

		attachBookNowListeners();
		updateNavigationButtons();
	}

	function createSliderNavigation() {
		var tripContainer = document.querySelector('.trip__container');
		if (!tripContainer) return;

		var navContainer = document.createElement('div');
		navContainer.className = 'trip-slider-nav';

		var prevButton = document.createElement('button');
		prevButton.className = 'slider-nav-btn';
		prevButton.id = 'prevSlide';
		prevButton.innerHTML = '<i class="ri-arrow-left-s-line"></i>';

		var nextButton = document.createElement('button');
		nextButton.className = 'slider-nav-btn';
		nextButton.id = 'nextSlide';
		nextButton.innerHTML = '<i class="ri-arrow-right-s-line"></i>';

		prevButton.addEventListener('click', function() {
			currentSlide = (currentSlide - 1 + allTrips.length) % allTrips.length;
			updateTripSlider();
		});

		nextButton.addEventListener('click', function() {
			currentSlide = (currentSlide + 1) % allTrips.length;
			updateTripSlider();
		});

		navContainer.appendChild(prevButton);
		navContainer.appendChild(nextButton);

		tripContainer.appendChild(navContainer);
	}

	function updateNavigationButtons() {
	}

	createSliderNavigation();
	updateTripSlider();

	function adjustSlidesToShow() {
		if (window.innerWidth < 600) {
			slidesToShow = 1;
		} else if (window.innerWidth < 900) {
			slidesToShow = 2;
		} else {
			slidesToShow = 3;
		}
		updateTripSlider();
	}

	window.addEventListener('resize', adjustSlidesToShow);
	adjustSlidesToShow();

	var navLinks = document.querySelectorAll('.nav__links .link a');

	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener('click', function(event) {
			event.preventDefault();

			var linkText = this.textContent.trim().toLowerCase();

			if (linkText.includes('home')) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
				// Close mobile menu
				var navLinksEl = document.querySelector('.nav__links');
				if (navLinksEl) navLinksEl.classList.remove('active');
			} else if (linkText.includes('destination')) {
				scrollToSection('.destination__container');
			} else if (linkText.includes('pricing')) {
				scrollToSection('.trip');
			} else if (linkText.includes('review')) {
				scrollToSection('.trip');
			}
		});
	}

	var contactButton = document.querySelector('nav > .btn');
	if (contactButton) {
		contactButton.addEventListener('click', function() {
			scrollToSection('.footer');
		});
	}

	var planTripButton = document.querySelector('.action__btns .btn');
	if (planTripButton) {
		planTripButton.addEventListener('click', function() {
			scrollToSection('.trip');
		});
	}

	var destinationCards = document.querySelectorAll('.destination__card');

	for (var i = 0; i < destinationCards.length; i++) {
		destinationCards[i].addEventListener('click', function() {
			var cardImage = this.querySelector('img');
			var cardTitle = this.querySelector('.destination__title');
			var title = cardTitle ? cardTitle.textContent : '';

			var largeImage = cardImage.cloneNode();

			var overlay = document.createElement('div');
			overlay.className = 'destination-overlay';

			var container = document.createElement('div');
			container.className = 'destination-overlay__container';

			largeImage.classList.add('destination-overlay__image');

			var caption = document.createElement('div');
			caption.textContent = title;
			caption.className = 'destination-overlay__caption';

			container.appendChild(largeImage);
			container.appendChild(caption);
			overlay.appendChild(container);
			document.body.appendChild(overlay);

			overlay.addEventListener('click', function() {
				overlay.remove();
			});

			function closeOnEscape(event) {
				if (event.key === 'Escape') {
					overlay.remove();
					document.removeEventListener('keydown', closeOnEscape);
				}
			}
			document.addEventListener('keydown', closeOnEscape);
		});
	}

	function attachBookNowListeners() {
		var bookNowButtons = document.querySelectorAll('.book__now');

		for (var i = 0; i < bookNowButtons.length; i++) {
			bookNowButtons[i].addEventListener('click', function(event) {
				var tripCard = event.target.closest('.trip__card');

				var tripTitle = tripCard.querySelector('.trip__details p');
				var tripPrice = tripCard.querySelector('.price');

				var title = tripTitle ? tripTitle.textContent : 'Trip';
				var price = tripPrice ? tripPrice.textContent : '';

				openBookingModal(title, price);
			});
		}
	}

	function openBookingModal(tripTitle, tripPrice) {
		var overlay = document.createElement('div');
		overlay.className = 'booking-overlay';

		var modal = document.createElement('div');
		modal.className = 'booking-modal';

		modal.innerHTML =
			'<h3 class="booking-modal__title">Book: ' + escapeHTML(tripTitle) + '</h3>' +
			'<p class="booking-modal__price">Price: ' + escapeHTML(tripPrice) + '</p>' +
			'<form id="bookingForm" class="booking-modal__form">' +
				'<input name="name" placeholder="Your name" required class="booking-modal__input" />' +
				'<input name="email" type="email" placeholder="Email" required class="booking-modal__input" />' +
				'<div class="booking-modal__actions">' +
					'<button type="submit" class="booking-modal__btn booking-modal__btn--confirm">Confirm</button>' +
					'<button type="button" id="cancelBooking" class="booking-modal__btn booking-modal__btn--cancel">Cancel</button>' +
				'</div>' +
			'</form>';

		overlay.appendChild(modal);
		document.body.appendChild(overlay);

		var cancelButton = modal.querySelector('#cancelBooking');
		cancelButton.addEventListener('click', function() {
			overlay.remove();
		});

		var bookingForm = modal.querySelector('#bookingForm');
		bookingForm.addEventListener('submit', function(event) {
			event.preventDefault();

			var nameInput = bookingForm.querySelector('input[name="name"]');
			var emailInput = bookingForm.querySelector('input[name="email"]');

			var name = nameInput.value.trim();
			var email = emailInput.value.trim();

			if (!name || !email) {
				showToast('Please enter both details', 'error');
				return;
			}

			overlay.remove();
			showToast('Thanks ' + name + '! Your booking request for ' + tripTitle + ' is received. We will reach out to you shortly');
		});
		function closeOnEscape(event) {
			if (event.key === 'Escape') {
				overlay.remove();
				document.removeEventListener('keydown', closeOnEscape);
			}
		}
		document.addEventListener('keydown', closeOnEscape);
	}

	var subscriptionForm = document.querySelector('.more-details__form form');

	if (subscriptionForm) {
		subscriptionForm.addEventListener('submit', function(event) {
			event.preventDefault();

			var emailInput = subscriptionForm.querySelector('input[type="email"]');
			var email = emailInput.value.trim();

			var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			var isValidEmail = emailPattern.test(email);

			if (!isValidEmail) {
				showToast('Please enter a valid email address', 'error');
				return;
			}

			emailInput.value = '';
			showToast('Thanks! We will contact you shortly at ' + email);
		});
	}

	var allCards = document.querySelectorAll('.destination__card, .trip__card');

	for (var i = 0; i < allCards.length; i++) {
		allCards[i].setAttribute('tabindex', '0');

		allCards[i].addEventListener('keydown', function(event) {
			if (event.key === 'Enter') {
				this.click();
			}
		});
	}

});