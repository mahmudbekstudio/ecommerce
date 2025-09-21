'use strict';

(function ($) {
    const loginForm = $('#loginModal');
    loginForm.on('click', '.login-btn', function () {
        const email = loginForm.find('[name="email"]');
        const password = loginForm.find('[name="password"]');
        loginForm.find('.invalid-feedback').each(function () {
            const feedback = $(this);
            feedback.addClass('hide');
            feedback.parent().find('.form-control').removeClass('is-invalid');
        });
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: {email: email.val(), password: password.val()},
            success: function (response) {
                if (response.result) {
                    window.localStorage.setItem('userData', JSON.stringify(response.data));
                    window.location.reload();
                } else {
                    const field = loginForm.find('.form-control');
                    const feedback = field.parent().find('.invalid-feedback').first();
                    field.addClass('is-invalid');
                    feedback.removeClass('hide');
                    feedback.text(response.error);
                }
            },
            error: function (xhr) {
                const errors = JSON.parse(xhr.responseText);
                for (const errorField in errors.data) {
                    console.log('errorField', errorField);
                    const field = loginForm.find('[name="' + errorField + '"]');
                    const feedback = field.parent().find('.invalid-feedback');
                    field.addClass('is-invalid');
                    feedback.removeClass('hide');
                    feedback.text(errors.data[errorField]);
                }
            },
            dataType: 'json'
        });

        return false;
    });

    $('.logout-btn').on('click', function () {
        $.ajax({
            type: "POST",
            url: '/api/logout',
            success: function () {
                window.localStorage.removeItem('userData');
                window.location.reload();
            },
            error: function (xhr) {
                const errors = JSON.parse(xhr.responseText);
                console.log('Error', errors);
            },
            dataType: 'json'
        });

        return false;
    });

    const signUpForm = $('#signUpForm');
    signUpForm.on('click', '.signup-btn', function () {
        const email = signUpForm.find('[name="email"]');
        const password = signUpForm.find('[name="password"]');
        const firstName = signUpForm.find('[name="first_name"]');
        const lastName = signUpForm.find('[name="last_name"]');

        signUpForm.find('.invalid-feedback').each(function () {
            const feedback = $(this);
            feedback.addClass('hide');
            feedback.parent().find('.form-control').removeClass('is-invalid');
        });
        $.ajax({
            type: "POST",
            url: '/api/signup',
            data: {email: email.val(), password: password.val(), first_name: firstName.val(), last_name: lastName.val()},
            success: function (response) {
                console.log('response', response);
                email.val('');
                password.val('');
                firstName.val('');
                lastName.val('');
                $('#signUpModal').modal('hide');
                $('#signupToast').toast('show');
            },
            error: function (xhr) {
                const errors = JSON.parse(xhr.responseText);
                for (const errorField in errors.data) {
                    console.log('errorField', errorField);
                    const field = loginForm.find('[name="' + errorField + '"]');
                    const feedback = field.parent().find('.invalid-feedback');
                    field.addClass('is-invalid');
                    feedback.removeClass('hide');
                    feedback.text(errors.data[errorField]);
                }
            },
            dataType: 'json'
        });

        return false;
    })
})(jQuery);