jQuery(document).ready(function($) {
    jQuery('.wl-header .elementor-widget-image:nth-child(4) img').click(function() {
        if (jQuery(this).hasClass('is-close')) {
            jQuery('.wl-header .elementor-search-form--icon-search').hide();
            jQuery('.wl-header .elementor-widget-wp-widget-maxmegamenu').show();
            jQuery(this).attr('src', '/wp-content/uploads/2022/12/search-icon2.png').removeClass('is-close');
        } else {
            jQuery('.wl-header .elementor-search-form--icon-search').show();
            jQuery('.wl-header .elementor-widget-wp-widget-maxmegamenu').hide();
            jQuery(this).attr('src', '/wp-content/uploads/2023/12/close-icon.png').addClass('is-close');
        }
    });

    jQuery('.search-mob-trigger').click(function() {
        if (jQuery(this).hasClass('is-close')) {
            jQuery('.search-mobile').hide();
            jQuery(this).removeClass('is-close').find('img').attr({
                src: '/wp-content/uploads/2022/12/search-icon2.png',
                width: '45'
            });
        } else {
            jQuery('.search-mobile').show();
            jQuery(this).addClass('is-close').find('img').attr({
                src: '/wp-content/uploads/2023/12/close-icon.png',
                width: '27'
            });
            if (jQuery('.elementor-menu-toggle').hasClass('elementor-active')) {
                jQuery('.elementor-menu-toggle').click();
            }
        }
    });

    var banner_close = sessionStorage.getItem("banner");

    if (banner_close == "close") {
        jQuery('#bottom-banner').remove();
    }

    jQuery('#close-banner').click(function(e) {
        e.preventDefault();
        jQuery('#bottom-banner').fadeOut();
        sessionStorage.setItem("banner", "close");
    });

    var page_url = window.location.href;
    jQuery('input[data-name="page_url"]').val(page_url);

    jQuery('.elementor-menu-toggle').click(function() {
        if (jQuery('.search-mob-trigger').hasClass('is-close')) {
            jQuery('.search-mob-trigger').click();
        }
    });

});
