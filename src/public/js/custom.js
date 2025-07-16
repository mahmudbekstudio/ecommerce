'use strict';

(function ($) {
    const loginForm = $('#loginModal');
    loginForm.on('click', '.login-btn', function () {
        const email = loginForm.find('[name="email"]');
        const password = loginForm.find('[name="password"]');
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: {email: email.value, password: password.value},
            success: function (response) {
                console.log('success', response);
            },
            error: function (err) {
                console.error('❌ Login failed:', err);
            },
            dataType: 'json'
        });

        return false;
    })
})(jQuery);