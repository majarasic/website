var testimonialCarousel = new Siema({
	selector: '.testimonials__wrapper',
	draggable: false,
	loop: true
});

var testimonialInterval;

function autoScrollTestimonials() {
	testimonialCarousel.next();

	$('.testimonials__pagination__item').removeClass('item--active');
	$('.testimonials__pagination__item[data-index="' + testimonialCarousel.currentSlide + '"]').addClass('item--active');
}

testimonialInterval = setInterval(autoScrollTestimonials, 5000);

$(document).on('click', 'a[data-action="testimonials-slide"]', function () {
	if ($(this).data('direction') == 'prev') testimonialCarousel.prev();
	if ($(this).data('direction') == 'next') testimonialCarousel.next();

	$('.testimonials__pagination__item').removeClass('item--active');
	$('.testimonials__pagination__item[data-index="' + testimonialCarousel.currentSlide + '"]').addClass('item--active');

	clearInterval(testimonialInterval);
	testimonialInterval = setInterval(autoScrollTestimonials, 5000);
});

$(document).on('click', '.testimonials__pagination__item', function () {
	var paginationItem = $(this);
	var pageIndex = parseInt(paginationItem.data('index'));

	testimonialCarousel.goTo(pageIndex);

	$('.testimonials__pagination__item').removeClass('item--active');
	paginationItem.addClass('item--active');

	clearInterval(testimonialInterval);
	testimonialInterval = setInterval(autoScrollTestimonials, 5000);
});

$(document).on('click', 'a[data-action="toggle-mobile-menu"]', function () {
	$('.header__mobile').toggle();
});

$(document).on('click', 'a[data-action="submit-contact-form"]', function () {
	$('#contact-form').submit();
});

$(document).on('click', 'a[data-action="show-contact-form"]', function () {
	showContactForm();
});

$(document).on('click', 'a[data-action="hide-contact-form"]', function () {
	hideContactForm();
});

function showContactForm() {
	$('.modal-overlay').fadeIn(100);
	$('.contact-modal').fadeIn(200);
}

function hideContactForm() {
	$('.contact-modal').fadeOut(100);
	$('.modal-overlay').fadeOut(200);
}

$('#contact-form').submit(function (event) {
	var formEmpty = false;
	var formData = {
		name: $('#form-name').val(),
		email: $('#form-email').val(),
		subject: $('#form-subject').val(),
		message: $('#form-message').val()
	}

	for (var key in formData) {
		if (formData.hasOwnProperty(key)) {
	        if(formData[key] == "") formEmpty = true;
	    }
	}

	if (formEmpty) {
		swal({
			icon: 'error',
			text: 'Please fill out all the fields.'
		});

		return false;
	} else if (!validateEmail(formData.email)) {
		swal({
			icon: 'error',
			text: 'Please fill out your email address correctly.'
		});

		return false;
	}

	$.ajax({
		url: '/send',
		data: formData,
		type: 'POST'
	}).done(function() {
		hideContactForm();

		swal({
			icon: 'success',
			text: 'Thank you, your email has been sent!'
		});
	}).fail(function(error) {
		swal({
			icon: 'error',
			text: "Email couldn't be sent, please try again."
		});
	}).always(function() {
		// Completed.
	});

	event.preventDefault();
});

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email.toLowerCase());
}