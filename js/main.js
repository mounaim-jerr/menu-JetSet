//-------------------------------------
//	MAIN
//-------------------------------------

const resize_description = () => {
	if (window.innerWidth >= 768) {
		document.querySelector('.about-content .right').style.maxHeight =
			document.querySelector('.about-content .left img').clientHeight + 'px';
	} else {
		document.querySelector('.about-content .right').style.maxHeight = '100%';
	}
};

const responsiveT17 = () => {
	if (page_name == 'home') resize_description();
};

const mainT17 = () => {
	// Header style on scroll
	window.addEventListener('scroll', function (e) {
		if (window.scrollY <= 200) {
			document.querySelector('.nav').classList.remove('scroll');
		} else {
			document.querySelector('.nav').classList.add('scroll');
		}
	});

	if (page_name == 'home') {
		setTimeout(function () {
			resize_description();
		}, 500);
	}
};

document.onload = mainT17();
window.addEventListener('resize', responsiveT17);

(function ($) {
	'use strict';

	var cfg = {
			scrollDuration: 800, // smoothscroll duration
			mailChimpURL: '', // mailchimp url
		},
		$WIN = $(window);

	// Add the User Agent to the <html>
	// will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	/* Preloader
	 * -------------------------------------------------- */
	var ssPreloader = function () {
		$('html').addClass('ss-preload');

		$WIN.on('load', function () {
			// force page scroll position to top at page refresh
			// $('html, body').animate({ scrollTop: 0 }, 'normal');

			// will first fade out the loading animation
			$('#loader').fadeOut('slow', function () {
				// will fade out the whole DIV that covers the website.
				$('#preloader').delay(300).fadeOut('slow');
			});

			// for hero content animations
			$('html').removeClass('ss-preload');
			$('html').addClass('ss-loaded');
		});
	};

	/* pretty print
	 * -------------------------------------------------- */
	var ssPrettyPrint = function () {
		$('pre').addClass('prettyprint');
		$(document).ready(function () {
			prettyPrint();
		});
	};

	/* Move header
	 * -------------------------------------------------- */
	var ssMoveHeader = function () {
		var hero = $('.page-hero'),
			hdr = $('header'),
			triggerHeight = hero.outerHeight() - 170;

		$WIN.on('scroll', function () {
			var loc = $WIN.scrollTop();

			if (loc > triggerHeight) {
				hdr.addClass('sticky');
			} else {
				hdr.removeClass('sticky');
			}

			if (loc > triggerHeight + 20) {
				hdr.addClass('offset');
			} else {
				hdr.removeClass('offset');
			}

			if (loc > triggerHeight + 150) {
				hdr.addClass('scrolling');
			} else {
				hdr.removeClass('scrolling');
			}
		});

		// $WIN.on('resize', function() {
		//     if ($WIN.width() <= 768) {
		//             hdr.removeClass('sticky offset scrolling');
		//     }
		// });
	};

	if ($('#contact-form').length > 0) {
		$('#contact-form').validate({
			submitHandler: function (form) {
				var options = {
					target: '#contact-form', // target element(s) to be updated with server response
					beforeSubmit: function (formData, jqForm, options) {
						// formData is an array; here we use $.param to convert it to a string to display it
						// but the form plugin does this for you automatically when it submits the data
						var queryString = $.param(formData);

						// jqForm is a jQuery object encapsulating the form element.  To access the
						// DOM element for the form do this:
						// var formElement = jqForm[0];

						//console.log('About to submit: \n\n' + queryString);

						// here we could return false to prevent the form from being submitted;
						// returning anything other than false will allow the form submit to continue
						return true;
					},
					success: function (data) {
						$('#contact-form').toggleClass('hidden');

						// Send a google analytics event
						$(window).trigger('contact-form-sent');
					},
					url: '/contact-form.php',

					//type:      type        // 'get' or 'post', override for form's 'method' attribute
					//dataType:  null        // 'xml', 'script', or 'json' (expected server response type)
					//clearForm: true        // clear all form fields after successful submit
					//resetForm: true        // reset the form after successful submit

					// $.ajax options can be used here too, for example:
					//timeout:   3000
				};
				$(form).ajaxSubmit(options);
				return false;
			},
		});
	}

	/* Masonry
	 * ---------------------------------------------------- */
	var ssMasonryFolio = function () {
		var containerBricks = $('.masonry');

		containerBricks.imagesLoaded(function () {
			containerBricks.masonry({
				itemSelector: '.masonry__brick',
				resize: true,
			});
		});
	};

	/* slick slider
	 * ------------------------------------------------------ */
	var ssSlickSlider = function () {
		$('.testimonials__slider').slick({
			arrows: true,
			dots: false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			prevArrow: "<div class='slick-prev'><i class='im im-arrow-left' aria-hidden='true'></i></div>",
			nextArrow: "<div class='slick-next'><i class='im im-arrow-right' aria-hidden='true'></i></div>",
			pauseOnFocus: false,
			autoplaySpeed: 1500,
			responsive: [
				{
					breakpoint: 900,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		});
	};

	/* Highlight the current section in the navigation bar
	 * ------------------------------------------------------ */
	var ssWaypoints = function () {
		var sections = $('.target-section'),
			navigation_links = $('.header-nav li a');

		sections.waypoint({
			handler: function (direction) {
				var active_section;

				active_section = $('section#' + this.element.id);

				if (direction === 'up') active_section = active_section.prevAll('.target-section').first();

				var active_link = $('.header-nav li a[href="#' + active_section.attr('id') + '"]');

				navigation_links.parent().removeClass('current');
				active_link.parent().addClass('current');
			},

			offset: '25%',
		});
	};

	/* Stat Counter
	 * ------------------------------------------------------ */
	var ssStatCount = function () {
		var statSection = $('.s-stats'),
			stats = $('.stats__count');

		statSection.waypoint({
			handler: function (direction) {
				if (direction === 'down') {
					stats.each(function () {
						var $this = $(this);

						$({
							Counter: 0,
						}).animate(
							{
								Counter: $this.text(),
							},
							{
								duration: 4000,
								easing: 'swing',
								step: function (curValue) {
									$this.text(Math.ceil(curValue));
								},
							}
						);
					});
				}

				// trigger once only
				this.destroy();
			},

			offset: '90%',
		});
	};

	/* Smooth Scrolling
	 * ------------------------------------------------------ */
	var ssSmoothScroll = function () {
		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
				$target = $(target);

			e.preventDefault();
			e.stopPropagation();

			$('html, body')
				.stop()
				.animate(
					{
						scrollTop: $target.offset().top,
					},
					cfg.scrollDuration,
					'swing',
					function () {
						window.location.hash = target;
					}
				);
		});
	};

	/* Placeholder Plugin Settings
	 * ------------------------------------------------------ */
	var ssPlaceholder = function () {
		$('input, textarea, select').placeholder();
	};

	/* Alert Boxes
	 * ------------------------------------------------------ */
	var ssAlertBoxes = function () {
		$('.alert-box').on('click', '.alert-box__close', function () {
			$(this).parent().fadeOut(500);
		});
	};

	/* Contact Form
	 * ------------------------------------------------------ */
	var ssContactForm = function () {
		/* local validation */
		$('#contactForm').validate({
			/* submit via ajax */
			submitHandler: function (form) {
				var sLoader = $('.submit-loader');

				$.ajax({
					type: 'POST',
					url: 'inc/sendEmail.php',
					data: $(form).serialize(),
					beforeSend: function () {
						sLoader.slideDown('slow');
					},
					success: function (msg) {
						// Message was sent
						if (msg == 'OK') {
							sLoader.slideUp('slow');
							$('.message-warning').fadeOut();
							$('#contactForm').fadeOut();
							$('.message-success').fadeIn();
						}
						// There was an error
						else {
							sLoader.slideUp('slow');
							$('.message-warning').html(msg);
							$('.message-warning').slideDown('slow');
						}
					},
					error: function () {
						sLoader.slideUp('slow');
						$('.message-warning').html('Something went wrong. Please try again.');
						$('.message-warning').slideDown('slow');
					},
				});
			},
		});
	};

	/* Back to Top
	 * ------------------------------------------------------ */
	var ssBackToTop = function () {
		var pxShow = 500, // height on which the button will show
			fadeInTime = 400, // how slow/fast you want the button to show
			fadeOutTime = 400, // how slow/fast you want the button to hide
			scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
			goTopButton = $('.go-top');

		// Show or hide the sticky footer button
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};

	/* Scroll Down
    *-----------------------------------------------------
     $(function() {
    $('.scroll-down').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
      return false;
    });
  });  */

	/* Initialize
	 * ------------------------------------------------------ */
	(function ssInit() {
		ssPreloader();
		ssPrettyPrint();
		ssMoveHeader();
		// ssMobileMenu();
		// ssMasonryFolio();
		// ssSlickSlider();
		// ssWaypoints();
		// ssStatCount();
		ssSmoothScroll();
		// ssPlaceholder();
		ssAlertBoxes();
		ssContactForm();
		ssBackToTop();
	})();
})(jQuery);
