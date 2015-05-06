/**
 * ADDICTIVE COMMUNITY
 * -------------------------------------------------------
 * Created by Brunno Pleffken Hosti
 * http://github.com/brunnopleffken/addictive-community
 *
 * File: main.js
 * Release: v1.0.0
 * Copyright: (c) 2015 - Addictive Software
 */


$(document).ready(function($) {
	/**
	 * REPLACE ALL REGULAR <select> FIELDS WITH A FANCY ONE
	 */

	$('.select2').select2({ 'width': 'element' });
	$('.select2-no-search').select2({ 'minimumResultsForSearch': -1, 'width': 'element' });

	/**
	 * FADE OUT ALL NOTIFICATIONS AFTER 3 SECONDS IF HAS NOT .persistent CLASS
	 */

	$('.notification').not('.persistent').delay(3000).fadeOut(1000);

	/**
	 * AUTOMATICALLY SELECT TABS IN THE NAVIGATION BAR
	 */

	(function() {
		$('.navigation .subnav a').each(function() {
			var elementUrl = new RegExp("(" + ($(this).attr('href')).replace("?", "\\?") + ")$");
			var browserUrl = window.location.href;

			if(elementUrl.test(browserUrl)) {
				$(this).addClass('selected');
			}
		});
	}).call(this);

	/**
	 * BUILD LIGHTBOX WHEN LINK HAS .fancybox
	 */

	$('.fancybox').fancybox({
		autoSize: true,
		closeBtn: false,
		modal: false,
		padding: 2
	});

	/**
	 * USER CONTROL PANEL FUNCTIONS
	 */

	(function() {
		if($('.photoSelect:checked').val() == "gravatar") {
			$('#gravatar').show();
		} else if($('.photoSelect:checked').val() == "facebook") {
			$('#facebook').show();
		} else if($('.photoSelect:checked').val() == "custom") {
			$('#custom').show();
		}

		$('.photoSelect').on('change', function(){
			var value = $(this).val();

			if(value == "custom") {
				$('#gravatar').fadeOut();
				$('#facebook').fadeOut();
				$('#custom').delay(400).fadeIn();
			} else if(value == "gravatar") {
				$('#custom').fadeOut();
				$('#facebook').fadeOut();
				$('#gravatar').delay(400).fadeIn();
			}
			else {
				$('#custom').fadeOut();
				$('#gravatar').fadeOut();
				$('#facebook').delay(400).fadeIn();
			}
		});
	}).call(this);

	/**
	 * CSS CLASSES FOR VALIDATION
	 * input.url      Validates http://xxx.com or http://xxx.com.br
	 * input.email    Validates me@me.com or me@me.com.br
	 * input.numeric  Validates if the value is numeric only
	 */

	$('form').on('submit', function(event) {
		if($(this).hasClass('validate')) {

			var stopSend = false;

			// Validade INPUT text, INPUT password and TEXTAREAs

			$(this).find('input[type=text], input[type=password], textarea, select').filter('.required').each(function(){
				if(this.value == '') {
					$(this).addClass('error');
					stopSend = true;
				}
				else {
					$(this).removeClass('error');
				}
			});

			// Is the URL valid?

			$(this).find('.url').filter('.required').each(function(){
				var str = this.value;
				var pattern = new RegExp(/(http:\/\/)([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/);
				var result = pattern.test(str);

				if(!result) {
					$(this).addClass('error');
					stopSend = true;
				}
				else {
					$(this).removeClass('error');
				}
			});

			// Is the e-mail address valid?

			$(this).find('.email').filter('.required').each(function(){
				var str = this.value;
				var pattern = new RegExp(/^[a-z0-9_\.\-]+\@[a-z0-9_\.\-]+\.[a-z]{2,3}$/gm);
				var result = pattern.test(str);

				if(!result) {
					$(this).addClass('error');
					stopSend = true;
				}
				else {
					$(this).removeClass('error');
				}
			});

			// Numeric only field

			$(this).find('.numeric').filter('.required').each(function(){
				var str = this.value;
				var pattern = new RegExp(/([0-9]*)/);
				var result = pattern.test(str);

				if(!result) {
					$(this).addClass('error');
					stopSend = true;
				}
				else {
					$(this).removeClass('error');
				}
			});

			// Alphanumerics ONLY

			$(this).find('.alphanumeric').filter('.required').each(function(){
				var str = this.value;
				var pattern = new RegExp(/([a-zA-Z0-9\s]*)/);
				var result = pattern.test(str);

				if(!result) {
					$(this).addClass('error');
					stopSend = true;
				}
				else {
					$(this).removeClass('error');
				}
			});

			// IF there is an error, show message!
			// ...otherwise, send form as it should be

			if(stopSend == true) {
				event.preventDefault();
				$(this).find('.error-message').css('display', 'inline-block').hide().fadeIn();
			}
		}
	});

	/**
	 * REMOVE .error CLASS ON FOCUS (FOR input[type=text] ELEMENTS)
	 */

	$(document).on('focus', '.error', function() {
		$(this).removeClass('error');
	});

	/**
	 * REPLACE INPUT[FILE] FIELDS WITH A CUSTOM ONE
	 */

	(function() {
		$('input[type=file]').each(function() {
			var $field = $(this);
			console.log($field);

			// Hide input[file] field
			$field.hide();

			// Add an text field and a button
			$field.parent().append('<input type="text" name="attachment_filename" id="attachment_filename" class="medium" readonly> ');
			$field.parent().append('<button id="attachment_button"><i class="fa fa-upload"></i> Upload</button>');
		});

		$(document).on('click', 'button#attachment_button', function(event) {
			$(this).parent().find('input[type=file]').click();
			event.preventDefault();
		});
		$(document).on('change', 'input[type=file]', function() {
			var $val = $(this).val().split('\\');
			$('input#attachment_filename').val($val[$val.length - 1]);
		});
	}).call(this);

	/**
	 * REPLACE CHECKBOXES WITH A CUSTOM ONE
	 */

	(function() {
		$('input[type=checkbox]').each(function(i, v) {
			var $checkbox = $(this);

			// Hide checkbox and prepend it with <A>
			$checkbox.addClass('checkbox-' + i).hide();
			$('<a class="checkbox" id="checkbox-' + i + '"></a>').insertBefore($checkbox);

			// If the checkbox is already checked
			if($checkbox.is('[checked]')) {
				$('a#checkbox-' + i).addClass('checked');
			}
		});
		
		$(document).on('click', 'a.checkbox', function(event) {
			var $link = $(this);
			var $checkbox = $('input[type=checkbox].' + $link.attr('id'));

			// Add/remove class .checked from the element <a>
			$link.toggleClass('checked');

			// Add/remove attribute CHECKED from the corresponding INPUT[type=checkbox]
			if($checkbox.hasClass('checked')) {
				$checkbox.removeAttr('checked').removeClass('checked');
			} else {
				$checkbox.attr('checked', true).addClass('checked');
			}

			event.preventDefault();
		});
	}).call(this);

	/**
	 * LOAD COMPLETE TINYMCE ON THREAD/REPLY POSTS
	 */

	(function() {
		tinymce.init({
			entity_encoding: 'raw',
			link_title: false,
			plugins: ['link image'],
			menubar: false,
			selector: '#post',
			statusbar: false,
			target_list: [
				{title: 'New page', value: '_blank'},
			],
			toolbar: 'bold italic underline strikethrough | alignleft aligncenter alignright | link image | bullist numlist | blockquote | subscript superscript | removeformat'
		});
	}).call(this);

	/**
	 * LOAD REDUCED TINYMCE FOR MEMBER SIGNATURES
	 */

	(function() {
		tinymce.init({
			entity_encoding: 'raw',
			link_title: false,
			plugins: ['link image'],
			menubar: false,
			selector: '#signature',
			statusbar: false,
			target_list: [
				{title: 'New page', value: '_blank'},
			],
			toolbar: 'bold italic underline strikethrough | link image | subscript superscript | removeformat'
		});
	}).call(this);

	/**
	 * MESSENGER: SELECT ALL MESSAGES
	 */

	$('#check-messages').on('click', function() {
		$('.del-message-checkbox').attr('checked', true);
	});

	/**
	 * MESSENGER: DELETE SELECTED MESSAGES
	 */

	$('#delete-messages').on('click', function(event){
		if($('.checkDeleteMessage:checked').length == 0) {
			alert('You need to select at least one message.');
			event.preventDefault();
		}
		else {
			$('form.personal-messenger').submit();
		}
	});

	/**
	 * MESSENGER: FIND MEMBER BY USERNAME
	 */

	$('#pmTo').select2({
		minimumInputLength: 2,
		ajax: {
			url: 'messenger/get_usernames',
			dataType: 'json',
			type: "POST",
			quietMillis: 500,
			data: function(term) {
				return {
					term: term
				};
			},
			results: function(data) {
				return {
					results: $.map(data, function(item) {
						return {
							text: item.username,
							slug: item.username,
							id: item.m_id
						};
					})
				};
			}
		}
	});
});
