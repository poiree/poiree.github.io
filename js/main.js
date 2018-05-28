$(document).ready(function() {
    $('.dropdown-menu.show>.dropdown-toggle').on('click', function() {
        debugger;
        $('.dropdown-menu.show>div').removeClass('show');
        $(this).next().addClass('show');
    });
});