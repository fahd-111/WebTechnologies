
window.onload = function() {
    $(document).ready(function () {
        const sections = $('section'),
            nav = $('.nav-link'),
            navHeight = $('header').outerHeight();

        $(window).on('scroll', function () {
            const curPos = $(this).scrollTop();

            sections.each(function () {
                const top = $(this).offset().top - navHeight,
                    bottom = top + $(this).outerHeight();
                // console.log(this);
                if (curPos >= top && curPos <= bottom) {
                    nav.removeClass('active');
                    sections.removeClass('active');

                    $(this).addClass('active');

                    nav.filter("[href='#" + $(this).attr('id') + "']").addClass('active');
                }
            });
        });

        nav.click(function (e) {
            const target = $(this.hash);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - navHeight + 1
                }, 600);
            }
        });
    });
}