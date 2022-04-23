//-------------------------------------
//	FUNCTIONS
//-------------------------------------
//-- Display Burger icon
const display_burger_icon = () => {
	let window_width = window.innerWidth;

	if (nav_horizontal_right_left) {
		if (nav_width >= window_width) {
			d.q('.nav__items').style.display = 'none';
			d.q('.drodown-wrap--lang').style.display = 'none';
			d.q('.burger-button').classList.add('show');
		} else {
			d.q('.nav__items').style.display = 'flex';
			d.q('.drodown-wrap--lang').style.display = 'flex';
			d.q('.burger-button').classList.remove('show');
			remove_burger_menu();
		}
	}

	if (nav_horizontal_center) {
		let nav_height = d.q('nav').offsetHeight;

		if (nav_height >= nav_height_max) {
			d.q('.nav--buttons-only').style.top = '0';
			d.q('nav').style.top = '-100%';
			d.q('.burger-button').classList.add('show');
		} else {
			d.q('nav').style.top = '0';
			d.q('.nav--buttons-only').style.top = '-100%';
			d.q('.burger-button').classList.remove('show');
			remove_burger_menu();
		}
	}

	//-- If no logo and title too long
	setTimeout(function () {
		if (nav_horizontal_left) {
			if (nav_width >= window_width) {
				d.q('.nav .nav-items-wrap').style.width =
					'calc(100% - ' + d.q('.nav .nav__buttons').scrollWidth + 'px)';
				d.q('.nav .homelink').style.width = '100%';
			} else {
				d.q('.nav .nav-items-wrap').style.width = 'auto';
				d.q('.nav .homelink').style.width = 'auto';
			}
		}

		if (nav_horizontal_right) {
			if (nav_width >= window_width) {
				d.q('.nav .homelink').style.width = 'calc(100% - ' + d.q('.nav .nav__buttons').scrollWidth + 'px)';
			} else {
				d.q('.nav .homelink').style.width = 'auto';
			}
		}

		if (nav_horizontal_center) {
			let nav_height = d.q('nav').offsetHeight;
			if (nav_height >= nav_height_max) {
				d.q('.nav--buttons-only .homelink').style.width =
					'calc(100% - ' +
					d.q('.nav--buttons-only .nav__buttons').scrollWidth +
					'px - ' +
					d.q('.nav--buttons-only .buttons-wrap-header').scrollWidth +
					'px - 24px)';
			} else {
				d.q('.nav--buttons-only .homelink').style.width = 'auto';
			}
		}
	}, 100);
};

//-- Display Burger menu
const display_burger_menu = () => {
	if (nav_vertical) {
		d.q('.nav-vertical').classList.toggle('show');
		d.q('body').classList.toggle('overlay');
	} else {
		d.q('.burger-menu').classList.toggle('show');
	}
	d.q('.burger-button').classList.toggle('active');
	d.q('body').classList.toggle('burger-menu-enable');
};

//-- Remove Burger menu
const remove_burger_menu = () => {
	if (nav_vertical) {
		d.q('.nav-vertical').classList.remove('show');
		d.q('body').classList.remove('overlay');
	} else {
		d.q('.burger-menu').classList.remove('show');
	}
	d.q('.burger-button').classList.remove('active');
	d.q('body').classList.remove('burger-menu-enable');
};

//-- Remove buttons on nav for tiny screen
const remove_buttons_menu = () => {
	let window_width = window.innerWidth;

	if (nav_mobile_width >= window_width) {
		if (nav_horizontal_right_left) d.q('.buttons-wrap-header').style.display = 'none';
		if (nav_vertical) d.q('header .buttons-wrap-header').style.display = 'none';
		if (nav_horizontal_center)
			for (let n = 0; n < d.qAll('.nav--buttons-only .btn').length; n++)
				d.qAll('.nav--buttons-only .btn')[n].style.display = 'none';
	} else {
		if (nav_horizontal_right_left) d.q('.buttons-wrap-header').style.display = 'flex';
		if (nav_vertical) d.q('header .buttons-wrap-header').style.display = 'flex';
		if (nav_horizontal_center)
			for (let n = 0; n < d.qAll('.nav--buttons-only .btn').length; n++)
				d.qAll('.nav--buttons-only .btn')[n].style.display = 'flex';
	}
};

//-- Dropdown Burger Menu
const display_burger_dropdown = (param) => {
	param.offsetParent.classList.toggle('visible');
};

//-- Sticky nav menu
const sticky_menu_nav = () => {
	let nav_height = d.q('nav').offsetHeight;
	if (nav_height >= nav_height_max) {
		let nav_height = d.q('.nav--buttons-only').offsetHeight;
		d.q('.menu-nav').style.top = nav_height + 'px';
	} else {
		let nav_height = d.q('.hello').offsetHeight;
		d.q('.menu-nav').style.top = nav_height + 'px';
	}
};

//-- Menu active item
const menu_active_item = () => {
	for (let n = 0; n < d.qAll('.menu-nav__item').length; n++) {
		d.qAll('.menu-nav__item')[0].classList.add('active');
		d.qAll('.menu-nav__item')[n].onclick = function (e) {
			for (let j = 0; j < d.qAll('.menu-nav__item').length; j++) {
				d.qAll('.menu-nav__item')[j].classList.remove('active');
			}
			this.classList.add('active');
		};
	}
};

//-- Menu active item • Summary
const menu_active_item_summary = () => {
	for (let n = 0; n < d.qAll('.menu-nav__item--home').length; n++) {
		d.qAll('.menu-wrap')[0].classList.add('active');
		d.q('.menus-wrapper').style.height = d.qAll('.menu-wrap')[0].offsetHeight + 'px';
		d.qAll('.menu-nav__item--home')[0].classList.add('active');

		d.qAll('.menu-nav__item--home')[n].onclick = function (e) {
			for (let j = 0; j < d.qAll('.menu-wrap').length; j++) {
				d.qAll('.menu-wrap')[j].classList.remove('active');

				if (this.dataset.anchor == d.qAll('.menu-wrap')[j].getAttribute('id')) {
					d.qAll('.menu-wrap')[j].classList.add('active');
					d.q('.menus-wrapper').style.height = d.qAll('.menu-wrap')[j].offsetHeight + 'px';
				}
			}

			for (let j = 0; j < d.qAll('.menu-nav__item--home').length; j++) {
				d.qAll('.menu-nav__item--home')[j].classList.remove('active');
			}

			this.classList.add('active');
		};
	}
};

//-- Contact form
if ($('#contact-form').length > 0) {
	$('#contact-form').validate({
		submitHandler: function (form) {
			var options = {
				target: '#contact-form', // target element(s) to be updated with server response
				beforeSubmit: function (formData, jqForm, options) {
					var queryString = $.param(formData);
					return true;
				},
				success: function (data) {
					$('.step2').toggleClass('hidden');
					// Send a google analytics event
					$(window).trigger('contact-form-sent');
				},
				url: '/contact-form.php',
			};
			$(form).ajaxSubmit(options);
			return false;
		},
	});
}

//-- Fancybox
$('[data-fancybox].iframe--widget').fancybox({
	buttons: [],
	touch: false,
	beforeLoad: function () {
		if (!$('.fancybox-iframe').parent().hasClass('iframe-wrapper')) {
			$('.fancybox-iframe').wrap('<div class="iframe-wrapper"/>');
		}
	},
});

$('[data-fancybox].iframe--contact').fancybox({
	buttons: [],
	touch: false,
	beforeLoad: function () {
		if (!$('.fancybox-iframe').parent().hasClass('iframe-wrapper')) {
			$('.fancybox-iframe').wrap('<div class="iframe-wrapper"/>');
		}
	},
});

$('[data-fancybox]:not(.iframe--widget):not(.iframe--menus)').fancybox({
	iframe: {
		css: {
			height: '450px',
		},
	},
	buttons: ['close'],
	beforeLoad: function () {
		if (!$('.fancybox-iframe').parent().hasClass('iframe-wrapper')) {
			$('.fancybox-iframe').wrap('<div class="iframe-wrapper"/>');
		}
	},
});

function bindEvent(element, eventName, eventHandler) {
	if (element.addEventListener) {
		element.addEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + eventName, eventHandler);
	}
}

//-- Listen to message from child window
bindEvent(window, 'message', function (e) {
	if (e.data === 'close-widget') {
		$.fancybox.getInstance().close();
	}
});

//-- Slider
const slider = () => {
	if ($('.slide').length > 0) {
		$('.slide.active').cycle({
			log: false,
			prev: '.nav__btn--prev',
			next: '.nav__btn--next',
			slides: '>div',
		});

		$('.albums li').click(function (e) {
			if (!$(this).hasClass('active')) {
				var slider = $(this).children('a').attr('data-slider');
				$('.albums li.active').removeClass('active');
				$(this).addClass('active');
				$('.slide.active').fadeOut(200, function () {
					$('.slide.active').removeClass('active').cycle('pause');
					$('#' + slider).fadeIn(200, function () {
						if ($('#' + slider).is('.cycle-paused')) {
							$(this).cycle('resume').addClass('active');
						} else {
							$('#' + slider)
								.cycle({
									log: false,
									prev: '.nav__btn--prev',
									next: '.nav__btn--next',
									slides: '>div',
								})
								.addClass('active');
						}
					});
				});
			}
			return false;
		});
	}
};

//-------------------------------------
//	MAIN
//-------------------------------------
const main = () => {
	if (nav_horizontal_right_left || nav_horizontal_center) display_burger_icon();
	if (nav_horizontal_center && page_name == 'menus') sticky_menu_nav();
	if (nav_horizontal_right_left || nav_horizontal_center || nav_vertical) remove_buttons_menu();
	if (nav_vertical) d.q('.nav-items-wrap').style.height = 'calc(100% - ' + d.q('.nav__bottom').scrollHeight + 'px)';
	menu_active_item();
	menu_active_item_summary();
	// if ((template_w_slider && (page_name == 'gallery' || page_name == 'custom')) || template == 0)
	slider();

	if (nav_vertical) {
		if (768 >= window.innerWidth) {
			d.q('.header-vertical .homelink').style.width =
				'calc(100% - ' + d.q('.header-vertical .nav__buttons').scrollWidth + 'px)';
		} else {
			d.q('.header-vertical .homelink').style.width = 'auto';
		}
	} else if (nav_inside) {
		if (768 >= window.innerWidth) {
			d.q('.nav-inside .homelink').style.width =
				'calc(100% - ' + d.q('.nav-inside .burger-button').scrollWidth + 'px)';
		} else {
			d.q('.nav-inside .homelink').style.width = 'auto';
		}
	}

	//-- Opening hours active day
	var day = new Date().getDay() || 7;
	$('.day' + day).addClass('day-wrap--active');

	//-- Active page
	let nav_item_class = d.q('.nav__item--' + page_name);
	if (page_name != 'home' && nav_item_class) nav_item_class.classList.add('active');

	//-- Smooth scrolling to page anchor on click
	$("a[href*='#']:not([href='#'])").click(function () {
		if (
			location.hostname == this.hostname &&
			this.pathname.replace(/^\//, '') == location.pathname.replace(/^\//, '')
		) {
			let target = $(this.hash);
			let window_width = $(window).width();
			let menu_nav_height = $('.menu-nav').outerHeight();
			let nav_height = !nav_vertical ? $('nav').outerHeight() : $('header').outerHeight();

			//-- Conditions
			if (page_name == 'menus') {
				if (
					(window_width <= 970 && (template == 1 || template == 4)) ||
					(window_width <= 750 && (template == 2 || template == 5))
				) {
					nav_height = nav_height + menu_nav_height;
				} else if (
					(window_width <= 1220 && (template == 2 || template == 5)) ||
					(window_width <= 750 && (template == 3 || template == 6)) ||
					(window_width >= 750 && template == 9)
				) {
					nav_height = menu_nav_height;
				} else if (
					(window_width >= 1220 && (template == 2 || template == 5)) ||
					(window_width >= 750 && (template == 3 || template == 6))
				) {
					nav_height = 20;
				} else if (window_width >= 970 && (template == 1 || template == 4)) {
					nav_height = nav_height;
				} else {
					nav_height = nav_height + menu_nav_height;
				}
			} else if (template == 0) {
				nav_height = menu_nav_height;
			} else if (template == 10) {
				nav_height = menu_nav_height;
			} else if (page_name == 'gallery') {
				if (template == 3 || template == 6) {
					nav_height = 20;
				} else {
					nav_height = nav_height + 20;
				}
			}

			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate(
					{
						scrollTop: target.offset().top - nav_height,
					},
					1000
				);
			}
		}
	});

	//-- Smooth scrolling to the top of page
	$('#scroll-top').click(function () {
		$('html, body').animate(
			{
				scrollTop: 0,
			},
			500
		);
	});

	//-- Tootips plugin init
	tippy('.tippy', {
		arrow: false,
		animation: 'shift-away-subtle',
	});

	//-- Add class on nav when you scroll over XXXpx
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('nav').addClass('scroll');
		} else {
			$('nav').removeClass('scroll');
		}
	});

	scrollTo(document.body, 0, 100);
	document.querySelector('body').style.overflow = 'hidden';

	//-- Delete loader
	setTimeout(function () {
		document.querySelector('body').style.overflow = 'initial';
		document.querySelector('.loader-wrap').classList.add('hide');
	}, 400);

	//-- Browser update
	var $buoop = { required: { e: -4, f: -3, o: -3, s: -1, c: -3 }, insecure: true, unsupported: true, api: 2021.05 };

	function $buo_f() {
		var e = document.createElement('script');
		e.src = '//browser-update.org/update.min.js';
		document.body.appendChild(e);
	}
	try {
		document.addEventListener('DOMContentLoaded', $buo_f, false);
	} catch (e) {
		window.attachEvent('onload', $buo_f);
	}
};

//-------------------------------------
//	RESPONSIVE
//-------------------------------------
const responsive = () => {
	if (nav_horizontal_right_left || nav_horizontal_center) display_burger_icon();
	if (nav_horizontal_center && page_name == 'menus') sticky_menu_nav();
	if (nav_horizontal_right_left || nav_horizontal_center || nav_vertical) remove_buttons_menu();
	if (nav_inside || (nav_vertical && 750 >= window.innerWidth)) remove_burger_menu();
	if (nav_vertical) d.q('.nav-items-wrap').style.height = 'calc(100% - ' + d.q('.nav__bottom').scrollHeight + 'px)';

	if (nav_vertical) {
		if (768 >= window.innerWidth) {
			d.q('.header-vertical .homelink').style.width =
				'calc(100% - ' + d.q('.header-vertical .nav__buttons').scrollWidth + 'px)';
		} else {
			d.q('.header-vertical .homelink').style.width = 'auto';
		}
	} else if (nav_inside) {
		if (768 >= window.innerWidth) {
			d.q('.nav-inside .homelink').style.width =
				'calc(100% - ' + d.q('.nav-inside .burger-button').scrollWidth + 'px)';
		} else {
			d.q('.nav-inside .homelink').style.width = 'auto';
		}
	}

	//-- Resize menus summary on screen resize
	for (let j = 0; j < d.qAll('.menu-wrap').length; j++) {
		if (d.qAll('.menu-wrap')[j].classList.contains('active')) {
			d.q('.menus-wrapper').style.height = d.qAll('.menu-wrap')[j].offsetHeight + 'px';
		}
	}
};

//-------------------------------------
//	VARIABLES
//-------------------------------------
var d = document;
d.q = document.querySelector;
d.qAll = document.querySelectorAll;

var page_name = d.q('body').className.split('current-page-')[1].split(' ')[0];

var template_w_slider = template == 0 || template == 7 || template == 8 || template == 9;

var nav_horizontal_right =
	template == 1 ||
	template == 4 ||
	template == 11 ||
	template == 15 ||
	template == 16 ||
	template == 17 ||
	template == 18;
var nav_horizontal_left = template == 7;

var nav_horizontal_right_left = nav_horizontal_right + nav_horizontal_left;

var nav_horizontal_center = template == 8;
var nav_vertical = template == 2 || template == 5 || template == 9;
var nav_inside = template == 3 || template == 6;

//-- Init variables for nav
var nav_btns_width = (nav_dropdown_lang_width = 0);
var homelink_width = d.q('.homelink').scrollWidth;

if (nav_horizontal_right_left) {
	let nav_padding_side =
		parseInt(getComputedStyle(d.q('nav')).paddingLeft) + parseInt(getComputedStyle(d.q('nav')).paddingRight);

	let btn_margin = (btn_border = number_of_btns = 0);
	if (d.q('nav .buttons-wrap-header .btn')) {
		number_of_btns = d.qAll('nav .buttons-wrap-header .btn').length;
		btn_margin = parseInt(getComputedStyle(d.q('nav .buttons-wrap-header .btn')).marginRight);
		btn_border = parseInt(window.getComputedStyle(d.q('nav .buttons-wrap-header .btn'), null).borderLeftWidth) * 2;
		for (let n = 0; n < number_of_btns; n++)
			nav_btns_width = nav_btns_width + d.qAll('nav .buttons-wrap-header .btn')[n].scrollWidth;
	}

	nav_btns_width = nav_btns_width + btn_border * 2 * number_of_btns + btn_margin * number_of_btns;
	if (template != 15) nav_dropdown_lang_width = d.q('.drodown-wrap--lang').scrollWidth;

	var nav_width =
		homelink_width +
		document.getElementsByClassName('nav__items')[0].scrollWidth +
		nav_btns_width +
		nav_dropdown_lang_width +
		nav_padding_side + 20;
	var nav_mobile_width = homelink_width + nav_btns_width + 54 + nav_padding_side;
}

if (nav_vertical) {
	let header_padding_side =
		parseInt(getComputedStyle(d.q('header')).paddingLeft) + parseInt(getComputedStyle(d.q('header')).paddingRight);

	let number_of_btns = (nav_btns_width = btn_margin = 0);
	if (d.q('header .buttons-wrap-header .btn')) {
		number_of_btns = d.qAll('header .buttons-wrap-header .btn').length;
		btn_margin = parseInt(getComputedStyle(d.q('header .buttons-wrap-header .btn')).marginRight);
		for (let n = 0; n < number_of_btns; n++)
			nav_btns_width = nav_btns_width + d.qAll('header .buttons-wrap-header .btn')[n].scrollWidth;
		nav_btns_width = nav_btns_width + btn_margin * number_of_btns;
	}

	var nav_mobile_width = d.q('header .homelink').scrollWidth + nav_btns_width + 54 + header_padding_side;
}

if (nav_horizontal_center) {
	var nav_padding =
		parseInt(getComputedStyle(d.q('nav')).paddingTop) + parseInt(getComputedStyle(d.q('nav')).paddingBottom);
	var item_margin =
		parseInt(getComputedStyle(d.q('nav .nav__item')).marginTop) +
		parseInt(getComputedStyle(d.q('nav .nav__item')).marginBottom);

	let nav_btns_width = (nav_btn_height = 0);
	if (d.q('.nav__items .btn')) {
		nav_btn_height = d.q('.nav__items .btn').offsetHeight;
		for (let n = 0; n < d.qAll('.nav__items .btn').length; n++)
			nav_btns_width = nav_btns_width + d.qAll('.nav__items .btn')[n].scrollWidth;
	}

	var nav_height_max =
		(d.q('nav .nav__item').clientHeight + item_margin) * 2 + (nav_btn_height + item_margin) + nav_padding;

	var nav_mobile_width = homelink_width + nav_btns_width + 80 + 54 + 40;
}



document.onload = main();
window.addEventListener('resize', responsive);
