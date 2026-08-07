jQuery(document).ready(function() {
    var caravan_json = caravanData;
    var caravan_upgrades = caravanUpgrades;
    var standard_inclusions = standardInclusions;

    // Clear session storage
    const keysToClear = ['mainframe','frame','axle','suspension','suspension-default','brakes','chassisfinish','hitchtype','jockeywheel','stabilisinglegs','stoneguard','wheelsandtires','wheelsandtires-default','brand','installationtype','changesystem','tvsize','wifi','starlink','tanks','alloyplate','entrydoor','storage','awning','slideoutkitchen','dustreduction','kitchenextras','bikeracks','colourpalettes','bathroom','cabinetry','cooling','fridge','heating','hotwater','reversecamera','gpstracking'];
    keysToClear.forEach(function (key) { sessionStorage.removeItem(key); });

    // Step 1 - Select Caravan Type
    var selected_caravan_type = '';
    jQuery(document).on('click', 'div#input_26_1 input', function() {
        selected_caravan_type = jQuery(this).val();
        jQuery('input#gform_next_button_26_3').trigger('click');
        console.log(selected_caravan_type);
    });

    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 2) {
            jQuery('.bottom-form-stat, li#stat-type').show();
            jQuery('li#stat-type span').html(selected_caravan_type);
        }
    });

    // Step 2 - Select Caravan Size
    var selected_caravan_size = '';
    jQuery(document).on('click', 'div#input_26_4 input', function() {
        selected_caravan_size = jQuery(this).val();
        jQuery('input#gform_next_button_26_5').trigger('click');
        console.log(selected_caravan_size);
    });

    // Step 3 - Layout
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        // Display main bed options
        if (current_page == 3) {
            jQuery('li#stat-size').show();
            jQuery('li#stat-size span').html(selected_caravan_size);

            var bed_types = Object.keys(caravan_json[selected_caravan_type][selected_caravan_size]);
            jQuery('#main-beds-options').html("");
            jQuery.each(bed_types, function(index, bed) {
                var radio_container = jQuery('<div>', { class: 'main-bed-option-' + index });
                var bed_image_url = '';
                var is_elec = false;

                switch(bed) {
                    case "King (6'6\") bed with single bedside table on doorside":
                        bed_image_url = '/wp-content/uploads/2025/02/4-King-Bed-With-Bedside-Table-Doorside-K.webp';
                    break;

                    case "King (6'6\") bed with single storage chest on doorside":
                        bed_image_url = '/wp-content/uploads/2025/02/5-King-Bed-With-Storage-Chest-Doorside-K1.webp';
                    break;
                    case "King (6'6\") electric lift-up bed":
                        bed_image_url = '/wp-content/uploads/2025/02/King-6-6-electric-lift-up-bed.webp';
                        is_elec = true;
                    break;
                    case "Queen (6'8\") east west bed with bedhead storage chest on roadside":
                        bed_image_url = '/wp-content/uploads/2024/11/queen-east-west.webp';
                    break;

                    case "Queen (6'3\") bed with dual bedside tables":
                        bed_image_url = '/wp-content/uploads/2024/11/queen-dual-bedside.webp';
                    break;

                    case "Queen (6'6\") bed with storage chest roadside & bedside table doorside":
                        bed_image_url = '/wp-content/uploads/2024/11/queen-bedside-storage-chest.webp';
                    break;

                    case "Queen (6'6\") bed with dual storage chests":
                        bed_image_url = '/wp-content/uploads/2024/11/queen-storage-chest.webp';
                    break;
                }

                var radio_image = jQuery('<img>', {
                    src: bed_image_url,
                    alt: bed
                });

                var radio_input = jQuery('<input>', {
                    type: 'radio',
                    name: 'choice-bed',
                    value: bed,
                    id: 'choice-beds-' + index,
                });

                var radio_label = jQuery('<label>', {
                    for: 'choice-beds-' + index,
                    id: 'label-' + index,
                    class: 'field-label',
                    text: bed
                });
                
                radio_container.append(radio_input, radio_image, radio_label);
                if (is_elec) radio_container.addClass('col-2');
                jQuery('#main-beds-options').append(radio_container);
            });
        }
    });

    // Step 3 - Main bed (onchange)
    var selected_caravan_main_bed = '';
    jQuery(document).on('click', 'div#main-beds-options input', function() {
        selected_caravan_main_bed = jQuery(this).val();
        jQuery('input#input_26_38').val(selected_caravan_main_bed);
        console.log(selected_caravan_main_bed);

        // Display number of bunks options
        if (selected_caravan_type == "Family") {
            var number_of_bunks = Object.keys(caravan_json[selected_caravan_type][selected_caravan_size][selected_caravan_main_bed]);
            jQuery('#num-bunks-options').html("");
            jQuery.each(number_of_bunks, function(index, caravanType) {
                var radio_container = jQuery('<div>', { class: 'num-bunks-option-' + index });

                var radio_input = jQuery('<input>', {
                    type: 'radio',
                    name: 'choice-num-bunks',
                    value: caravanType,
                    id: 'choice-num-bunks-' + index,
                });

                var radio_label = jQuery('<label>', {
                    for: 'choice-num-bunks-' + index,
                    id: 'label-' + index,
                    class: 'field-label',
                    text: caravanType
                });
                
                radio_container.append(radio_input, radio_label);
                jQuery('#num-bunks-options').append(radio_container);
            });

            jQuery("html, body").animate({
                scrollTop: jQuery('div#field_26_45').offset().top - 200
            });
            jQuery('div#bunk-type-options').html("");

        } else {
            if (selected_caravan_main_bed != ' ') {
                jQuery('input#gform_next_button_26_12').addClass('enabled-btn');
                jQuery('input#gform_next_button_26_12').trigger('click');
            }
        }
    });

    // Step 3 - Number of Bunks (onchange)
    var selected_caravan_number_of_bunks = '';
    jQuery(document).on('click', 'div#num-bunks-options input', function() {
        selected_caravan_number_of_bunks = jQuery(this).val();
        jQuery('input#input_26_42').val(selected_caravan_number_of_bunks);
        console.log(selected_caravan_number_of_bunks);

        // Display bunk type options
        var number_of_bunks = Object.keys(caravan_json[selected_caravan_type][selected_caravan_size][selected_caravan_main_bed][selected_caravan_number_of_bunks]);
        jQuery('#bunk-type-options').html("");
        jQuery.each(number_of_bunks, function(index, bunkType) {
            var radio_container = jQuery('<div>', { class: 'bunk-type-option-' + index });
            var bunk_image_url = '';

            switch(bunkType) {
                case "1 bunk and storage on doorside, desk / café dinette on roadside and a rear ensuite":
                    bunk_image_url = '/wp-content/uploads/2024/07/single_bunk_1.webp';
                break;
                case "2 bunks and storage, one on each side and a rear ensuite":
                case "2 bunks with storage, one on each side and a rear ensuite":
                    bunk_image_url = '/wp-content/uploads/2024/08/two_bunks_option_4.webp';
                break;
                case "2 bunks on doorside and ensuite on roadside":
                    bunk_image_url = '/wp-content/uploads/2025/02/2.1-Two-Bunks-Doorside-Option-2-1.webp';
                break;
                case "2 bunks on doorside, desk / café dinette on roadside and a rear ensuite":
                    bunk_image_url = '/wp-content/uploads/2024/07/double_bunk_image.webp';
                break;
                case "2 bunks on each side and a rear ensuite":
                    bunk_image_url = '/wp-content/uploads/2025/02/2-bunks-on-each-side-and-a-rear-ensuite.webp';
                break;
                case "2 bunks on roadside and ensuite on doorside":
                    bunk_image_url = '/wp-content/uploads/2025/02/2-bunks-on-roadside-and-ensuite-on-doorside.webp';
                break;
                case "2 bunks on roadside, 1 bunk and storage on doorside and a rear ensuite":
                    bunk_image_url = '/wp-content/uploads/2024/07/triple_bunk_image.webp';
                break;
                case "3 bunks on doorside, desk / café dinette on roadside and a rear ensuite":
                    bunk_image_url = '/wp-content/uploads/2024/08/3bunk-desk.webp';
                break;
                case "3 bunks on doorside, ensuite on roadside":
                    bunk_image_url = '/wp-content/uploads/2025/02/3.1-Three-Bunks-Doorside-Option-2-1.webp';
                break;
                case "3 bunks on each side and a rear ensuite":
                    bunk_image_url = '/wp-content/uploads/2024/07/6_berth_image.webp';
                break;
                case "3 bunks on roadside, ensuite on doorside":
                    bunk_image_url = '/wp-content/uploads/2025/02/3-bunks-on-roadside-ensuite-on-doorside.webp';
                break;
                case "3 bunks on roadside, two bunks with drawers on doorside and a rear ensuite":
                    bunk_image_url = '/wp-content/uploads/2024/07/5_berth_image.webp';
                break;
                case "2 bunks at rear of caravan with workstation on doorside":
                    bunk_image_url = '/wp-content/uploads/2025/02/2-bunks-at-rear-of-caravan-with-workstation-on-doorside.webp';
                break;
                case "3 bunks at rear of caravan with workstation on doorside":
                    bunk_image_url = '/wp-content/uploads/2025/02/3-bunks-at-rear-of-caravan-with-workstation-on-doorside.webp';
                break;
                case "3 bunks at front of caravan and a central side ensuite":
                    bunk_image_url = '/wp-content/uploads/2025/02/3.6-Lift-Up-King-Bed-Bunks.webp';
                break;
                case "4 bunks at front of caravan and a central side ensuite":
                    bunk_image_url = '/wp-content/uploads/2025/02/4-bunks-at-front-of-caravan-and-a-central-side-ensuite.webp';
                break;
                case "2 bunks on doorside, TV cabinet and a rear kids lounge":
                    bunk_image_url = '/wp-content/uploads/2025/07/two-bunks-with-kids-lounge-scaled.webp';
                break;
                case "3 bunks on doorside, TV cabinet and a rear kids lounge":
                    bunk_image_url = '/wp-content/uploads/2025/07/three-bunks-with-kids-lounge-scaled.webp';
                break;
            }

            var radio_image = jQuery('<img>', {
                src: bunk_image_url,
                alt: bunkType
            });

            var radio_input = jQuery('<input>', {
                type: 'radio',
                name: 'choice-bunk-type',
                value: bunkType,
                id: 'choice-bunk-type-' + index,
            });

            var radio_label = jQuery('<label>', {
                for: 'choice-bunk-type-' + index,
                id: 'label-' + index,
                class: 'field-label',
                text: bunkType
            });
            
            radio_container.append(radio_input, radio_image, radio_label);
            jQuery('#bunk-type-options').append(radio_container);
        });
    });

    // Step 3 - Bunk Type (onchange)
    var selected_caravan_bunk_type = '';
    jQuery(document).on('click', 'div#bunk-type-options input', function() {
        selected_caravan_bunk_type = jQuery(this).val();
        jQuery('input#input_26_44').val(selected_caravan_bunk_type);
        console.log(selected_caravan_bunk_type);

        
        if (selected_caravan_main_bed != ' ' && selected_caravan_number_of_bunks != ' ' && selected_caravan_bunk_type != ' ') {
            jQuery('input#gform_next_button_26_12').addClass('enabled-btn');
            jQuery('input#gform_next_button_26_12').trigger('click');
        }
    });

    // Step 4 - Model
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        // Display model options
        if (current_page == 4) {
            jQuery('li#stat-layout').show();

            // Step 4 - Floating options
            function isNearTop(element) {
                var elementTop = jQuery(element).offset().top;
                var viewportTop = jQuery(window).scrollTop();
                return elementTop - viewportTop <= 130;
            }

            function isInViewport(selector) {
                var element = jQuery(selector);
                if (element.length === 0) return false;

                var elementTop = element.offset().top;
                var elementBottom = elementTop + element.outerHeight();
                var viewportTop = jQuery(window).scrollTop();
                var viewportBottom = viewportTop + jQuery(window).height();

                return elementBottom > viewportTop && elementTop < viewportBottom;
            }

            function checkVisibility() {
                if (jQuery('body').width() >= 1199) {
                    var isBlocked = isInViewport('#gform_page_26_4 .byoc-subhead') || isInViewport('#gform_page_26_4 .gform-page-footer');

                    jQuery('.model-container').each(function () {
                        if (isNearTop(this) && !isBlocked) {
                            jQuery(this).addClass('floating');
                            jQuery('.model-table-container').addClass('pad-top');
                        } else {
                            jQuery(this).removeClass('floating');
                            jQuery('.model-table-container').removeClass('pad-top');
                        }
                    });
                }
            }

            jQuery(window).on('scroll resize', checkVisibility);
            checkVisibility();

            var models = '';
            const preferredOrder = ["XTR", "Solara", "Hornet", "Amaroo"];

            if (selected_caravan_type == "Couples") {
                models = Object.keys(caravan_json[selected_caravan_type][selected_caravan_size][selected_caravan_main_bed]);
            } else {
                models = Object.keys(caravan_json[selected_caravan_type][selected_caravan_size][selected_caravan_main_bed][selected_caravan_number_of_bunks][selected_caravan_bunk_type]);
            }

            models.sort((a, b) => {
                const indexA = preferredOrder.indexOf(a);
                const indexB = preferredOrder.indexOf(b);
                return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
            });

            jQuery('#model-options').html("");
            jQuery.each(models, function(index, model) {
                var radio_container = jQuery('<div>', { class: 'model-option-' + index });
                var model_image_url = '';
                var model_desc = '';
                var model_price = '';
                var solara_price = '';
                var xtr_price = '';
                var hornet_price = '';
                var amaroo_price = '';

                switch (selected_caravan_type) {
                    case "Family":
                        switch (selected_caravan_size) {
                            case "Compact":
                                solara_price = '156,263.15';
                                xtr_price = '178,445.39';
                                hornet_price = '138,560.84';
                                amaroo_price = '117,393.13';
                            break;
                            case "Mid-Size":
                                solara_price = '156,263.15';
                                xtr_price = '178,445.39';
                                hornet_price = '138,560.84';
                                amaroo_price = '117,393.13';
                            break;
                            case "Spacious":
                                solara_price = '156,263.15';
                                xtr_price = '178,445.39';
                                hornet_price = '138,560.84';
                                amaroo_price = '117,393.13';
                            break;
                        }
                    break;
                    case "Couples":
                        switch (selected_caravan_size) {
                            case "Compact":
                                solara_price = '156,263.15';
                                xtr_price = '178,445.39';
                                hornet_price = '138,560.84';
                                amaroo_price = '117,393.13';
                            break;
                            case "Mid-Size":
                                solara_price = '156,263.15';
                                xtr_price = '178,445.39';
                                hornet_price = '138,560.84';
                                amaroo_price = '117,393.13';
                            break;
                            case "Spacious":
                                solara_price = '156,263.15';
                                xtr_price = '178,445.39';
                                hornet_price = '138,560.84';
                                amaroo_price = '117,393.13';
                            break;
                        }
                    break;           
                }

                switch(model) {
                    case "Hornet":
                        model_image_url = 'https://wonderlandrv.com.au/wp-content/uploads/2026/02/Hornet-2026-External-White-Transparent-BG-4.webp';
                        model_desc = 'Built tough for harsh conditions, offering rugged durability and long-lasting comfort. The all-round off-roader for rocky trails and deep bush tracks.';
                        model_price = 'Priced From $'+ hornet_price +' AUD';
                    break;
                    case "Amaroo":
                        model_image_url = 'https://wonderlandrv.com.au/wp-content/uploads/2026/02/Amaroo-2026-External-White-Transparent-BG-4.webp';
                        model_desc = 'A lightweight and versatile off-road caravan that balances toughness with luxury. The semi-off-roader for well-maintained dirt roads and light off-road tracks.';
                        model_price = 'Priced From $'+ amaroo_price +' AUD';
                    break;
                    case "XTR":
                        model_image_url = 'https://wonderlandrv.com.au/wp-content/uploads/2026/02/XTR-2026-External-White-Transparent-BG-4.webp';
                        model_desc = 'The ultimate off-road caravan with luxury features for the most extreme terrains. The tough as nails all-rounder for remote desert tracks and rugged mountain trails.';
                        model_price = 'Priced From $'+ xtr_price +' AUD';
                    break;
                    case "Solara":
                        model_image_url = 'https://wonderlandrv.com.au/wp-content/uploads/2026/02/Solara-2026-External-White-Transparent-BG-4.webp';
                        model_desc = 'Wonderland\'s first off-road, composite caravan, built tough without compromising on all of life\'s creature comforts.';
                        model_price = 'Priced From $'+ solara_price +' AUD';
                    break;
                }

                var radio_image = jQuery('<img>', {
                    src: model_image_url,
                    alt: model
                });

                var radio_desc = jQuery('<p>', {
                    text: model_desc
                });

                var radio_price = jQuery('<strong>', {
                    text: model_price
                });

                var radio_input = jQuery('<input>', {
                    type: 'radio',
                    name: 'choice-model',
                    value: model,
                    id: 'choice-models-' + index,
                });

                var radio_label = jQuery('<label>', {
                    for: 'choice-models-' + index,
                    id: 'label-' + index,
                    class: 'field-label',
                    text: model
                });
                
                radio_container.append(radio_input, radio_image, radio_price, radio_desc, radio_label);
                jQuery('#model-options').append(radio_container);
            });

            if (jQuery('input[name="choice-model"]').length == 3) { // Solara does not exist
                var solara_radio_container = jQuery('<div>', { class: 'model-option-999' });
                var solara_radio_image = jQuery('<img>', {
                    src: 'https://wonderlandrv.com.au/wp-content/uploads/2026/02/Solara-2026-External-White-Transparent-BG-4.webp',
                    alt: 'Solara'
                });

                var solara_radio_desc = jQuery('<p>', {
                    text: 'Wonderland\'s first off-road, composite caravan, built tough without compromising on all of life\'s creature comforts.'
                });

                var solara_radio_price = jQuery('<strong>', {
                    text: 'The Solara is not available in this layout selection.'
                });

                var solara_radio_input = jQuery('<input>', {
                    type: 'radio',
                    name: 'choice-model',
                    value: 'Solara',
                    id: 'choice-models-999',
                });

                var solara_radio_label = jQuery('<label>', {
                    for: 'choice-models-999',
                    id: 'label-999',
                    class: 'field-label',
                    text: 'Solara'
                });

                var solara_radio_notice = jQuery('<a>', {
                    text: 'Please contact sales@wonderlandrv.com.au to enquire about availability and similar layout options.',
                    href: 'mailto:sales@wonderlandrv.com.au?subject=Solara%20Layout%20Enquiry'
                });
                
                solara_radio_container.append(solara_radio_input, solara_radio_image, solara_radio_price, solara_radio_desc, solara_radio_label, solara_radio_notice);
                jQuery('.model-option-0').after(solara_radio_container);
            }

            jQuery('div#model-options div input').each(function() {
                var model_option = jQuery(this).val().toLowerCase();
                
                if (jQuery('body').width() <= 767) {
                    jQuery('.model-table-container tr td.' + model_option).css('display', 'none').attr('active', 'true');
                } else {
                    jQuery('.model-table-container tr td.' + model_option).css('display', 'table-cell').attr('active', 'true');
                }
            });

            jQuery('div#model-options > div strong').each(function() {
                jQuery(this).appendTo(jQuery(this).parent().find('label'));
            });

            jQuery('div#model-options > div p').each(function() {
                jQuery(this).appendTo(jQuery(this).parent().find('label'));
            });
        }
    });

    // Step 4 - Model (onchange)
    var selected_caravan_model = '';
    jQuery(document).on('click', 'div#model-options input', function() {
        selected_caravan_model = jQuery(this).val();
        jQuery('input#input_26_47').val(selected_caravan_model);
        console.log(selected_caravan_model);
        if (selected_caravan_model != ' ') {
            jQuery('input#gform_next_button_26_16').addClass('enabled-btn');
            jQuery('input#gform_next_button_26_16').trigger('click');
        }
    });

    // Step 5 - Caravans
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        // Display caravan options
        if (current_page == 5) {
            var caravans = '';

            if (selected_caravan_type == "Couples") {
                caravans = caravan_json[selected_caravan_type][selected_caravan_size][selected_caravan_main_bed][selected_caravan_model];
            } else {
                caravans = caravan_json[selected_caravan_type][selected_caravan_size][selected_caravan_main_bed][selected_caravan_number_of_bunks][selected_caravan_bunk_type][selected_caravan_model];
            }

            jQuery('#caravan-options').html("");
            jQuery.each(caravans, function(index, caravan) {
                var radio_container = jQuery('<div>', { class: 'caravan-option-' + index });

                var caravan_mapping = caravanPreview;

                var radio_image = jQuery('<img>', {
                    src: '/wp-content/uploads' + caravan_mapping[selected_caravan_model][caravan.model],
                    alt: caravan.model
                });

                if (caravan_mapping[selected_caravan_model][caravan.model] == undefined) {
                    radio_image = "<p>No preview available.</p>";
                }

                var radio_input = jQuery('<input>', {
                    type: 'radio',
                    name: 'choice-caravan',
                    value: selected_caravan_model + " " + caravan.model,
                    id: 'choice-caravans-' + index,
                });

                var radio_label = jQuery('<label>', {
                    for: 'choice-caravans-' + index,
                    id: 'label-' + index,
                    class: 'field-label',
                    text: selected_caravan_model + " " + caravan.model
                });

                radio_label.attr('data-price-inc-gst', caravan.price_inc_gst);
                
                radio_container.append(radio_input, radio_image, radio_label);
                jQuery('#caravan-options').append(radio_container);
            });
        }
    });

    // Step 5 - Caravan (onchange)
    var selected_main_caravan = '';
    var base_price = 0;
    jQuery(document).on('click', 'div#caravan-options input', function() {
        selected_main_caravan = jQuery(this).val();
        jQuery('input#input_26_49').val(selected_main_caravan);
        
        if (jQuery(this).parent().find('img').attr('src') != "") jQuery('input#input_26_54').val(jQuery(this).parent().find('img').attr('src'));

        var price = jQuery(this).parent().find('label').data('price-inc-gst');

        jQuery('input#input_26_55').val(price);

        console.log(selected_main_caravan);
        console.log(price);
        base_price = price;

        if (selected_main_caravan != ' ') {
            jQuery('input#gform_next_button_26_36').addClass('enabled-btn');
            jQuery('input#gform_next_button_26_36').trigger('click');
        }
    });

    // Step 6 - Customize Caravan
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 6) {
            jQuery('li#stat-caravan').show();
            jQuery('li#stat-caravan span').html(selected_main_caravan);
        }
    });

    // Step 7-13 - Progress Bar Layout
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        var is_mobile = jQuery('body').width() <= 1080;

        if (is_mobile) {
            // Hide all steps
            jQuery('.gf_step').hide();

            // Show active step
            jQuery('div#gf_step_26_' + current_page).addClass('is-visible');
        } else {
            if (current_page == 7 || current_page == 8 || current_page == 9 || current_page == 10 || current_page == 11 || current_page == 12 || current_page == 13) {
                // Hide Step 1 - 6
                jQuery('div#gf_step_26_1, div#gf_step_26_2, div#gf_step_26_3, div#gf_step_26_4, div#gf_step_26_5, div#gf_step_26_6').hide();
    
                // Show Step 7 - 13
                jQuery('div#gf_step_26_7, div#gf_step_26_8, div#gf_step_26_9, div#gf_step_26_10, div#gf_step_26_11, div#gf_step_26_12, div#gf_step_26_13').addClass('is-visible');
            }
        }

        if (current_page == 14) {
            jQuery('div#gf_page_steps_26').hide();
        }
    });

    // Upgrades dropdown
    jQuery(document).on('click', '.accord-item.is-dropdown .accord-item-control', function() {
        if (jQuery(this).parent().hasClass('expanded')) {
            jQuery(this).parent().removeClass('expanded');
        } else {
            jQuery('.accord-item.is-dropdown').removeClass('expanded');
            jQuery(this).parent().addClass('expanded');
        }

        jQuery("html, body").animate({
            scrollTop: jQuery(this).offset().top - 200
        });
    });

    jQuery(document).on('change', '.accord-item.is-dropdown input', function() {
        var $gfield = jQuery(this).closest('.gfield');
        var $nextVisible = $gfield.nextAll(':visible').first();
        var brand_type = ["Redarc", "Victron", "Under Lounge", "Behind Fridge"];
        var currentVal = jQuery(this).val();

        if (!brand_type.includes(currentVal)) {
            jQuery(this).closest('.accord-item').removeClass('expanded');
            $nextVisible.children('.accord-item.is-dropdown').addClass('expanded');

            jQuery("html, body").animate({
                scrollTop: $nextVisible.offset().top - 200
            });
        }
    });

    function option_rules() {
        switch (selected_caravan_model) {
            case 'Hornet':
                jQuery('div#accord-axle').parent().hide(); // hide axle
                jQuery('div#accord-starlink').parent().hide(); // hide starlink
                jQuery('div#accord-dustreduction').parent().hide(); // hide dustreduction
            break;
            case 'Amaroo':
                jQuery('div#accord-alloyplate').parent().hide(); // hide alloyplate
                jQuery('div#accord-starlink').parent().hide(); // hide starlink
                jQuery('div#accord-awning').parent().hide(); // hide awning
            break;
            case 'XTR':
                jQuery('div#accord-frame').parent().hide(); // hide a-frame
                jQuery('div#accord-suspension').parent().hide(); // hide suspension
                jQuery('div#accord-hitchtype').parent().hide(); // hide hitch type
                jQuery('div#accord-stabilisinglegs').parent().hide(); // hide stabilising legs
                jQuery('div#accord-starlink').parent().hide(); // hide starlink
                jQuery('div#accord-dustreduction').parent().hide(); // hide dustreduction
                jQuery('div#accord-heating').parent().hide(); // hide heating
                jQuery('div#accord-hotwater').parent().hide(); // hide hotwater
                jQuery('div#accord-fridge').parent().hide(); // hide fridge
            break;
            case 'Solara':
                jQuery('div#accord-starlink').parent().hide(); // hide starlink
                jQuery('div#accord-heating').parent().hide(); // hide heating
            break;
        }
    }

    function add_fix_options(options_element, brand_options, option_name) {
        jQuery(options_element).html("");
        jQuery.each(brand_options, function(index, option_item) {
            var radio_container = jQuery('<div>', { class: ''+ option_name +'-option-' + index }),
                upgrade_name = option_item[0],
                upgrade_preview = option_item[1],
                active_selection = sessionStorage.getItem(option_name),
                radio_checked = false;

            if (upgrade_preview == null || upgrade_preview == "") upgrade_preview = "/wp-content/uploads/configurator/placeholder.jpg";

            var radio_image = jQuery('<img>', {
                src: upgrade_preview,
                alt: upgrade_name
            });

            if (active_selection == upgrade_name) {
                radio_checked = true;
                jQuery('#accord-' + option_name).addClass('enhanced');
            }
            var radio_input = jQuery('<input>', {
                type: 'radio',
                name: 'choice-'+ option_name,
                value: upgrade_name,
                id: 'choice-'+ option_name +'s-' + index,
                checked: radio_checked
            });

            var radio_label = jQuery('<label>', {
                for: 'choice-'+ option_name +'s-' + index,
                id: 'label-' + index,
                class: 'field-label',
                text: upgrade_name
            });
            
            radio_container.append(radio_input, radio_image, radio_label);
            jQuery(options_element).append(radio_container);
        });
    }

    function prepend_option(options_element, options_name, option_image, option_id, is_checked, option_count) {
        var radio_container = jQuery('<div>', { class: option_id + '-option-' + option_count });
        var radio_image = jQuery('<img>', {
            src: option_image,
            alt: options_name
        });

        var standard = jQuery('<p>', {
            class: 'option-price',
            text: "STANDARD"
        });

        var radio_input = jQuery('<input>', {
            type: 'radio',
            name: 'choice-'+ option_id,
            value: options_name,
            id: 'choice-'+ option_id +'s-' + option_count,
            checked: is_checked,
            'class': 'standard-option'
        });

        var radio_label = jQuery('<label>', {
            for: 'choice-'+ option_id +'s-' + option_count,
            id: 'label-' + option_count,
            class: 'field-label',
            text: options_name
        });

        if (option_id == 'changesystem') {
            radio_container.append(radio_input, standard, radio_label);
        } else {
            radio_container.append(radio_input, radio_image, standard, radio_label);
        }

        jQuery(options_element).prepend(radio_container);
    }

    function add_standard_option(session, standard, options_element, image, option_name, option_id) {
        var option_bool = "";
        if (sessionStorage.getItem(session) == null) option_bool = true;
        else option_bool = false;
        var standard_name = jQuery(standard).text();
        if (session == 'bikeracks') {
            standard_name = "None";
        }
        if (image == null || image == "") image = "/wp-content/uploads/configurator/placeholder.jpg";
        prepend_option(options_element, standard_name, image, option_name, option_bool, option_id);
    }

    function get_upgrade_options(category, subcategory, childcategory, options_element, option_name) {
        var options = '';
        if (childcategory == 0) options = Object.values(caravan_upgrades[category][subcategory]);
        else options = Object.values(caravan_upgrades[category][subcategory][childcategory]);

        if (childcategory == 0) options = options[0];
        
        jQuery(options_element).html("");

        jQuery.each(options, function(index, option_item) {
            var radio_container = jQuery('<div>', { class: ''+ option_name +'-option-' + index }),
                active_selection = sessionStorage.getItem(option_name),
                upgrade_name = option_item.name,
                upgrade_preview = option_item.preview,
                radio_checked = false;

            // SPECIFIC UPGRADE NAME RULES
            if (selected_caravan_model != "XTR") { // rename upgrade for non-XTR
                if (upgrade_name == "Disc Brakes (Tandem Axle with 1600PSI Actuator & Breakaway) No DSC") {
                    upgrade_name = "Disc Brakes (Tandem Axle with 1600PSI Actuator & Breakaway)";
                }
            }

            if (upgrade_preview == null || upgrade_preview == "") upgrade_preview = "/wp-content/uploads/configurator/placeholder.jpg";

            var radio_image = jQuery('<img>', {
                src: upgrade_preview,
                alt: upgrade_name
            });

            if (active_selection == upgrade_name) {
                radio_checked = true;
                jQuery('#accord-' + option_name).addClass('enhanced');
            }
            var radio_input = jQuery('<input>', {
                type: 'radio',
                name: 'choice-'+ option_name,
                value: upgrade_name,
                id: 'choice-'+ option_name +'s-' + index,
                checked: radio_checked
            });

            var radio_label = jQuery('<label>', {
                for: 'choice-'+ option_name +'s-' + index,
                id: 'label-' + index,
                class: 'field-label',
                text: upgrade_name
            });

            // Set data attributes for price
            var customer_price = '';
            switch (selected_caravan_model) {
                case 'Hornet': 
                    customer_price = option_item.hornetcustomerprice;
                break;
                case 'Amaroo': 
                    customer_price = option_item.amaroocustomerprice;
                break;
                case 'Solara': 
                    customer_price = option_item.solaracustomerprice;
                break;
                case 'XTR': 
                    customer_price = option_item.xtrcustomerprice;
                break;
            }

            // Add data attributes to the label
            radio_label.attr('data-customer-price', customer_price);

            var text_price = "+ $" + customer_price;
            if (String(customer_price).includes('-')) {
                text_price = customer_price;
            }

            var price_display = jQuery('<p>', {
                class: 'option-price',
                text: text_price
            });

            // Show option if price for the current model is available
            if (customer_price != null && customer_price != "") {
                radio_container.append(radio_input, radio_image, price_display, radio_label);
                jQuery(options_element).append(radio_container);
            }
        });
    }

    function display_standard_inclusion(upgrade_category, display_element) {
        var current_si_arr = [];
        var current_si = Object.values(standard_inclusions[upgrade_category]);
        current_si.forEach(current_si_subcategory => {
            var category = Object.values(current_si_subcategory);
            var category_name = Object.keys(current_si_subcategory);

            var standard_val = category[0][0][selected_caravan_model];
            current_si_arr.push([
                category_name[0], standard_val
            ]);
        });

        var elem_class = "";
        jQuery(display_element).html("<ul></ul>");
        current_si_arr.forEach(item => {
            var feature_category = item[0];
            var feature_name = item[1];

            var desc_element = "";
            switch (feature_category) {
                case "Frame":
                    desc_element = '#accord-mainframe';
                    elem_class = 'mainframe';
                break;
                case "A Frame, Chassis & Riser":
                    desc_element = '#accord-frame';
                    elem_class = 'aframe';
                break;
                case "Axle":
                    desc_element = '#accord-axle';
                    elem_class = 'axle';
                break;
                case "Suspension":
                    desc_element = '#accord-suspension';
                    elem_class = 'suspension';
                break;
                case "Brake & Electronic Sway Control":
                    desc_element = '#accord-brakes';
                    elem_class = 'brakes';
                break;
                case "Chassis Finish":
                    desc_element = '#accord-chassisfinish';
                    elem_class = 'chassisfinish';
                break;
                case "Hitch type":
                    desc_element = '#accord-hitchtype';
                    elem_class = 'hitchtype';
                break;
                case "Jockey Wheel":
                    desc_element = '#accord-jockeywheel';
                    elem_class = 'jockeywheel';
                break;
                case "Stabilising Legs":
                    desc_element = '#accord-stabilisinglegs';
                    elem_class = 'stabilisinglegs';
                break;
                case "Stone Guard":
                    desc_element = '#accord-stoneguard';
                    elem_class = 'stoneguard';
                break;
                case "Wheels & Tyres":
                    desc_element = '#accord-wheelsandtires';
                    elem_class = 'wheelsandtires';
                break;
                case "Electrical system":
                    desc_element = '#accord-changesystem';
                    elem_class = 'changesystem';
                break;
                case "TV":
                    desc_element = '#accord-tvsize';
                    elem_class = 'tvsize';
                break;
                case "Wifi":
                    desc_element = '#accord-wifi';
                    elem_class = 'wifi';
                break;
                case "StarLink Provision":
                    desc_element = '#accord-starlink';
                    elem_class = 'starlink';
                break;
                case "Tanks":
                    desc_element = '#accord-tanks';
                    elem_class = 'tanks';
                break;
                case "Alloy Plate":
                    desc_element = '#accord-alloyplate';
                    elem_class = 'alloyplate';
                break;
                case "Entry Door":
                    desc_element = '#accord-entrydoor';
                    elem_class = 'entrydoor';
                break;
                case "Storage":
                    desc_element = '#accord-storage';
                    elem_class = 'storage';
                break;
                case "Awning":
                    desc_element = '#accord-awning';
                    elem_class = 'awning';
                break;
                case "Slide-out Kitchen":
                    desc_element = '#accord-slideoutkitchen';
                    elem_class = 'slideoutkitchen';
                break;
                case "Dust Reduction":
                    desc_element = '#accord-dustreduction';
                    elem_class = 'dustreduction';
                break;
                case "Kitchen Extras":
                    desc_element = '#accord-kitchenextras';
                    elem_class = 'kitchenextras';
                break;
                case "Bike Rack":
                    desc_element = '#accord-bikeracks';
                    elem_class = 'bikeracks';
                break;
                case "Bathroom":
                    desc_element = '#accord-bathroom';
                    elem_class = 'bathroom';
                break;
                case "Kitchen":
                    desc_element = '#accord-cabinetry';
                    elem_class = 'cabinetry';
                break;
                case "Air Conditioning":
                    desc_element = '#accord-cooling';
                    elem_class = 'cooling';
                break;
                case "Fridge":
                    desc_element = '#accord-fridge';
                    elem_class = 'fridge';
                break;
                case "Heating":
                    desc_element = '#accord-heating';
                    elem_class = 'heating';
                break;
                case "Hot Water Service":
                    desc_element = '#accord-hotwater';
                    elem_class = 'hotwater';
                break;
                case"Reversing camera":
                    desc_element = '#accord-reversecamera';
                    elem_class = 'reversecamera';
                break;
                case "Tracking GPS/anti-theft":
                    desc_element = '#accord-gpstracking';
                    elem_class = 'gpstracking';
                break;
                default:
                    desc_element = 'Empty';
                    elem_class = 'empty';
                break;
            }

            if (feature_name != null && feature_name != "") {
                // Override specific caravans default axle
                if (selected_main_caravan == "Amaroo 1806EW-F2.0-SA" && desc_element == '#accord-axle') feature_name = "Single";

                // Show standard includion under dropdown
                if (desc_element != "Empty") jQuery(desc_element + " .accord-item-content-desc").html("Standard Inclusion: " + feature_name);

                // Tag axle element
                var axle_class = '';
                if (feature_category == 'Axle') axle_class = 'is-axle';
                
                // Show standard inclusion list
                jQuery(display_element + ' ul').append("<li data-category='"+ elem_class +"' class='"+ axle_class +"'><strong>"+ feature_category +":</strong> <p>"+ feature_name +"</p></li>");

                // Check if wheels and tyres standard inclusion has 2 options for XTR
                if (selected_caravan_model == "XTR") {
                    if (feature_category == 'Wheels & Tyres') {
                        if (feature_name == 'Grid black 16" 265/75R16 BF Goodrich K02 6 × 139 ET0 or ROH Hammar 16" 265/75R16 Falken AT3W 6x139 ET0') {
                            var wheelsandtires_default_options = [
                                ['Grid black 16" 265/75R16 BF Goodrich K02 6 × 139 ET0', '/wp-content/uploads/configurator/Chassis/Goodrich-logo.webp'],
                                ['ROH Hammar 16" 265/75R16 Falken AT3W 6x139 ET0', ''],
                            ];
                            add_fix_options('#wheelsandtires-default-options', wheelsandtires_default_options, 'wheelsandtires-default');
                            cache_selected_values('wheelsandtires-default');
    
                            // Display default selection
                            if (sessionStorage.getItem('wheelsandtires') == null) {
                                var default_wheels = sessionStorage.getItem('wheelsandtires-default');
                                switch (default_wheels) {
                                    case 'ROH Hammar 16" 265/75R16 Falken AT3W 6x139 ET0':
                                        jQuery('.wheelsandtires-default-option-1 input').prop('checked', true);
                                        break;
                                    case 'Grid black 16" 265/75R16 BF Goodrich K02 6 × 139 ET0':
                                    default:
                                        jQuery('.wheelsandtires-default-option-0 input').prop('checked', true);
                                    break;
                                }
                            }
                        } else {
                            jQuery('.select-wheels-text').hide();
                        }
                    } 
                } else {
                    jQuery('.select-wheels-text').hide();
                }

                // Check if suspension standard inclusion has 2 options for Amaroo
                if (selected_caravan_model == "Amaroo") {
                    if (feature_category == 'Suspension') {
                        if (feature_name == '3.7T Cruisemaster XT Coil') {
                            var suspension_default_options = [
                                ['3.7T Cruisemaster XT Coil', '/wp-content/uploads/configurator/Chassis/Cruise-master-logo.webp'],
                                ['3.7T Tuff-Ride Coil - Airbag Ready', '/wp-content/uploads/configurator/Chassis/Tuffride-logo.webp'],
                            ];
                            add_fix_options('#suspension-default-options', suspension_default_options, 'suspension-default');
                            cache_selected_values('suspension-default');
    
                            // Display default selection
                            if (sessionStorage.getItem('suspension') == null) {
                                var default_suspension = sessionStorage.getItem('suspension-default');
                                switch (default_suspension) {
                                    case '3.7T Cruisemaster XT Coil':
                                        jQuery('.suspension-default-option-1 input').prop('checked', true);
                                        break;
                                    case '3.7T Tuff-Ride Coil - Airbag Ready':
                                    default:
                                        jQuery('.suspension-default-option-0 input').prop('checked', true);
                                    break;
                                }
                            }
                        } else {
                            jQuery('.select-suspension-text').hide();
                        }
                    }
                } else {
                    jQuery('.select-suspension-text').hide();
                }
            } else {
                // Show "None" as standard inclusion list
                jQuery(display_element + ' ul').append("<li data-category='"+ elem_class +"'><strong>"+ feature_category +":</strong> <p>None</p></li>");
            }
        });

        if (upgrade_category == "ELECTRICAL") { // Force show electrical system
            var current_system = standard_inclusions[upgrade_category]['Electrical system']['Electrical system'][0][selected_caravan_model];
            var items = current_system.split("•").map(item => item.trim()).filter(item => item);

            var html = '<ul class="elec-list">';
            var elec_count = 1;
            var elec_label = '';
            items.forEach(item => {
                switch(elec_count) {
                    case 1:
                        elec_label = 'Brand: ';
                    break;
                    case 2:
                        elec_label = 'System: ';
                    break;
                    case 3:
                        elec_label = 'Installation type: ';
                    break;
                }
                html += "<li data-label='"+ item +"' class='elec-row-"+ elec_count +"'>"+ elec_label + item + "</li>";
                elec_count++;
            });
            html += "</ul>";

            jQuery(display_element + ' ul').prepend("<li data-category='system'><strong>Electrical system:</strong>"+ html +"</li>");
        }

        if (upgrade_category == "WATER") {
            var grey_water = standard_inclusions[upgrade_category]['Water System']['Grey Water'][0][selected_caravan_model],
                fresh_water = standard_inclusions[upgrade_category]['Tanks']['Fresh Water'][0][selected_caravan_model],
                grey_water_tank = standard_inclusions[upgrade_category]['Tanks']['Grey Water'][0][selected_caravan_model],
                tank_gauge = standard_inclusions[upgrade_category]['Tanks']['Tank Gauge'][0][selected_caravan_model];

            if (grey_water != null) jQuery(display_element + ' ul').append("<li data-category='greywater'><strong>Grey Water:</strong><p>"+ grey_water +"</p></li>");
            if (fresh_water != null) jQuery(display_element + ' ul').append("<li data-category='freshwater'><strong>Fresh Water:</strong><p>"+ fresh_water +"</p></li>");
            if (grey_water_tank != null) jQuery(display_element + ' ul').append("<li data-category='greywatertank'><strong>Grey Water Tank:</strong><p>"+ grey_water_tank +"</p></li>");
            if (tank_gauge != null) jQuery(display_element + ' ul').append("<li data-category='tankgauge'><strong>Tank Gauge:</strong><p>"+ tank_gauge +"</p></li>");
        }

        if (upgrade_category == "INTERIOR") {
            var fridge = standard_inclusions[upgrade_category]['Appliances']['Fridge'][0][selected_caravan_model],
                heating = standard_inclusions[upgrade_category]['Appliances']['Heating'][0][selected_caravan_model],
                hotwater = standard_inclusions[upgrade_category]['Appliances']['Hot Water Service'][0][selected_caravan_model];

            if (fridge != null) jQuery('#current-appliances ul').append("<li data-category='fridge'><strong>Fridge:</strong><p>"+ fridge +"</p></li>");
            if (heating != null) {
                jQuery('#current-appliances ul').append("<li data-category='heating'><strong>Heating:</strong><p>"+ heating +"</p></li>");
            } else {
                jQuery('#current-appliances ul').append("<li data-category='heating'><strong>Heating:</strong><p>None</p></li>");
            }
            if (hotwater != null) jQuery('#current-appliances ul').append("<li data-category='hotwater'><strong>Hot Water Service:</strong><p>"+ hotwater +"</p></li>");

            jQuery('#current-appliances ul').append("<li data-category='fans'><strong>Sirocco Fans:</strong><p>2x included</p></li>");
        }

        if (upgrade_category == "EXTERIOR") {
            var entrydoor = standard_inclusions[upgrade_category]['Body']['Entry Door'][0][selected_caravan_model],
                slideoutkitchen = standard_inclusions[upgrade_category]['Accessories']['Slide-out Kitchen'][0][selected_caravan_model],
                dustreduction = standard_inclusions[upgrade_category]['Accessories']['Dust Reduction'][0][selected_caravan_model],
                kitchenextras = standard_inclusions[upgrade_category]['Accessories']['Kitchen Extras'][0][selected_caravan_model];

            if (entrydoor != null) jQuery('#current-exterior ul').append("<li data-category='entrydoor'><strong>Entry Door:</strong><p>"+ entrydoor +"</p></li>");
            if (slideoutkitchen != null) {
                jQuery('#current-exterior ul').append("<li data-category='slideoutkitchen'><strong>Slide-out Kitchen:</strong><p>"+ slideoutkitchen +"</p></li>");
            } else {
                jQuery('#current-exterior ul').append("<li data-category='slideoutkitchen'><strong>Slide-out Kitchen:</strong><p>None</p></li>");
            }

            if (dustreduction != null) {
                jQuery('#current-exterior ul').append("<li data-category='dustreduction'><strong>Dust Reduction:</strong><p>"+ dustreduction +"</p></li>");
            } else {
                jQuery('#current-exterior ul').append("<li data-category='dustreduction'><strong>Dust Reduction:</strong><p>None</p></li>");
            }

            if (kitchenextras != null) jQuery('#current-exterior ul').append("<li data-category='kitchenextras'><strong>Kitchen Extras:</strong><p>"+ kitchenextras +"</p></li>");
        }
    }

    function cache_selected_values(category) {
        var upgrade_option = '#' + category + '-options input';
        jQuery(document).on('click change', upgrade_option, function() {
            var upgrade_name = jQuery(this).val();
            if (!jQuery(this).hasClass('standard-option')) {
                sessionStorage.setItem(category, upgrade_name);
                jQuery('#accord-' + category).addClass('enhanced');
            }
        });
    }

    // Step 7 - Chassis
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 7) {
            var page_upgrade_category = 'CHASSIS';

            display_standard_inclusion(page_upgrade_category, '#current-chassis');

            get_upgrade_options(page_upgrade_category, 'Frame', 0, '#mainframe-options', 'mainframe');
            var mainframe_preview = Object.values(standardInclusions[page_upgrade_category]['Frame'])[0];
            add_standard_option('mainframe', '#current-chassis ul li[data-category="mainframe"] p', '#mainframe-options', mainframe_preview[0][selected_caravan_model + '-image'], 'mainframe', 99);
            cache_selected_values('mainframe');

            get_upgrade_options(page_upgrade_category, 'A-Frame', 0, '#frame-options', 'frame');
            var frame_preview = Object.values(standardInclusions[page_upgrade_category]['A Frame, Chassis & Riser'])[0];
            add_standard_option('frame', '#current-chassis ul li[data-category="aframe"] p', '#frame-options',  frame_preview[0][selected_caravan_model + '-image'], 'frame', 99);
            cache_selected_values('frame');

            // Show Axle option for 1806EW-F2.0 and 1806EW-F3.0
            const codesToCheck = ["1806EW-F2.0", "1806EW-F3.0"];
            const exists = codesToCheck.some(code => selected_main_caravan.includes(code));
            if (!exists) {
                jQuery('#accord-axle').parent().hide();
            } else {
                var axle_options = [
                    ['Single', ''],
                    ['Tandem', ''],
                ];
                add_fix_options('#axle-options', axle_options, 'axle');
                // set default axle
                const axleDefault = jQuery('#current-chassis ul li.is-axle').html();
                const axleSession = sessionStorage.getItem('axle');

                let axleValue = 'Single'; // Default value

                if (axleSession !== null) {
                    axleValue = axleSession === 'Tandem' ? 'Tandem' : 'Single';
                } else if (axleDefault.includes('Tandem')) {
                    axleValue = 'Tandem';
                }

                jQuery(`.axle-option-${axleValue === 'Tandem' ? '1' : '0'} input`).prop('checked', true);
                jQuery('input#input_26_194').val(axleValue);

                cache_selected_values('axle');

                jQuery(document).on('change', 'input[name="choice-axle"]', function() {
                    var selected_val = jQuery(this).val();
                    var standard_axle = jQuery('#current-chassis ul li.is-axle').html();
                    var true_standard = '';

                    if (standard_axle.includes('Tandem')) true_standard = 'Tandem';
                    else true_standard = 'Single';

                    if (selected_val == true_standard) {
                        sessionStorage.removeItem('axle');
                        jQuery('#accord-axle').removeClass('enhanced');
                    }
                });
            }

            get_upgrade_options(page_upgrade_category, 'Suspension', 0, '#suspension-options', 'suspension');
            if (selected_caravan_model != "Amaroo") {
                var suspension_preview = Object.values(standardInclusions[page_upgrade_category]['Suspension'])[0];
                add_standard_option('suspension', '#current-chassis ul li[data-category="suspension"] p', '#suspension-options', suspension_preview[0][selected_caravan_model + '-image'], 'suspension', 99);
            }
            cache_selected_values('suspension');

            get_upgrade_options(page_upgrade_category, 'Brake & Electronic Sway Control', 0, '#brakes-options', 'brakes');
            var brakes_preview = Object.values(standardInclusions['CHASSIS']['Brake & Electronic Sway Control'])[0];
            add_standard_option('brakes', '#current-chassis ul li[data-category="brakes"] p', '#brakes-options', brakes_preview[0][selected_caravan_model + '-image'], 'brakes', 99);
            cache_selected_values('brakes');

            get_upgrade_options(page_upgrade_category, 'Chassis Finish', 0, '#chassisfinish-options', 'chassisfinish');
            var chassisfinish_preview = Object.values(standardInclusions['CHASSIS']['Chassis Finish'])[0];
            add_standard_option('chassisfinish', '#current-chassis ul li[data-category="chassisfinish"] p', '#chassisfinish-options', chassisfinish_preview[0][selected_caravan_model + '-image'], 'chassisfinish', 99);
            cache_selected_values('chassisfinish');

            get_upgrade_options(page_upgrade_category, 'Hitch type', 0, '#hitchtype-options', 'hitchtype');
            var hitch_preview = Object.values(standardInclusions['CHASSIS']['Hitch type'])[0];
            add_standard_option('hitchtype', '#current-chassis ul li[data-category="hitchtype"] p', '#hitchtype-options', hitch_preview[0][selected_caravan_model + '-image'], 'hitchtype', 99);
            cache_selected_values('hitchtype');

            get_upgrade_options(page_upgrade_category, 'Jockey Wheel', 0, '#jockeywheel-options', 'jockeywheel');
            var jockeywheel_preview = Object.values(standardInclusions['CHASSIS']['Jockey Wheel'])[0];
            add_standard_option('jockeywheel', '#current-chassis ul li[data-category="jockeywheel"] p', '#jockeywheel-options', jockeywheel_preview[0][selected_caravan_model + '-image'], 'jockeywheel', 99);
            cache_selected_values('jockeywheel');

            get_upgrade_options(page_upgrade_category, 'Stabilising Legs', 0, '#stabilisinglegs-options', 'stabilisinglegs');
            var legs_preview = Object.values(standardInclusions['CHASSIS']['Stabilising Legs'])[0];
            add_standard_option('stabilisinglegs', '#current-chassis ul li[data-category="stabilisinglegs"] p', '#stabilisinglegs-options', legs_preview[0][selected_caravan_model + '-image'], 'stabilisinglegs', 99);
            cache_selected_values('stabilisinglegs');

            get_upgrade_options(page_upgrade_category, 'Stone guard', 0, '#stoneguard-options', 'stoneguard');
            // var stoneguard_preview = Object.values(standardInclusions['CHASSIS']['Stone Guard'])[0];
            // add_standard_option('stoneguard', '#current-chassis ul li[data-category="stoneguard"] p', '#stoneguard-options', stoneguard_preview[0][selected_caravan_model + '-image'], 'stoneguard', 99);
            cache_selected_values('stoneguard');

            get_upgrade_options(page_upgrade_category, 'Wheels & Tyres', 0, '#wheelsandtires-options', 'wheelsandtires');
            if (selected_caravan_model != "XTR") {
                var wheel_preview = Object.values(standardInclusions['CHASSIS']['Wheels & Tyres'])[0];
                add_standard_option('wheelsandtires', '#current-chassis ul li[data-category="wheelsandtires"] p', '#wheelsandtires-options', wheel_preview[0][selected_caravan_model + '-image'], 'wheelsandtires', 99);
            }
            cache_selected_values('wheelsandtires');

            // Update suspension and wheels option based on Axle of Amaroo
            var suspension_options = jQuery('#suspension-options input');
            if (selected_caravan_model == "Amaroo") {
                var default_axle = jQuery('#axle-options input:checked').val();
                if (default_axle == 'Single') {
                    // Suspensions
                    suspension_options.each(function() {
                        var suspension = jQuery(this).val();
                        if (!suspension.includes("S/A")) jQuery(this).parent().addClass('disabled-option');
                        else jQuery(this).parent().removeClass('disabled-option');
                    });

                    // Wheels
                    jQuery('#wheelsandtires-options > div').show();
                    jQuery('#wheelsandtires-options > p').hide();
                } else {
                    // Suspensions
                    suspension_options.each(function() {
                        var suspension = jQuery(this).val();
                        if (suspension.includes("S/A")) jQuery(this).parent().addClass('disabled-option');
                        else jQuery(this).parent().removeClass('disabled-option');
                    });

                    // Wheels
                    jQuery('#wheelsandtires-options > div').show();
                    jQuery('#wheelsandtires-options > p').hide();
                }
            }

            option_rules();
        }
    });

    // Step 7 - Chassis - Frame (onchange)
    jQuery(document).on('change', 'input[name="choice-mainframe"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - A-Frame (onchange)
    jQuery(document).on('change', 'input[name="choice-frame"]', function() {
        var selected_option = jQuery(this).val();
        if (selected_caravan_model == "Hornet" || selected_caravan_model == "Amaroo") {
            if (selected_option != '6" A-Frame 1950mm & 12" Truss Chassis') {
                jQuery('input[value="BOS Corner Jacks / Stabilisers, 700mm (2 each set, 2 sets)"]').parent().hide(); // hide BOS Corner Jacks
            } else  {
                // show BOS Corner Jacks
                jQuery('input[value="BOS Corner Jacks / Stabilisers, 700mm (2 each set, 2 sets)"]').parent().show();

                // auto select stabilisinglegs item
                jQuery('input[value="BOS Corner Jacks / Stabilisers, 700mm (2 each set, 2 sets)"]').prop('checked', true); 
                sessionStorage.setItem('stabilisinglegs', 'BOS Corner Jacks / Stabilisers, 700mm (2 each set, 2 sets)');
                jQuery('#accord-stabilisinglegs').addClass('enhanced');

                // set hidden fields
                jQuery('input#input_26_164').val('BOS Corner Jacks / Stabilisers, 700mm (2 each set, 2 sets)');
                jQuery('input#input_26_125').val(jQuery('input[value="BOS Corner Jacks / Stabilisers, 700mm (2 each set, 2 sets)"]').parent().find('label').data('customer-price'));

                // show popup
                jQuery('body').append('<div id="upgrade-popup"><div class="upgrade-popup-inner"><p>Adding this option will require a BOS Corner Jacks / Stabilisers and additional price of $'+ jQuery('input[value="BOS Corner Jacks / Stabilisers, 700mm (2 each set, 2 sets)"]').parent().find('label').data('customer-price') +' to the caravan.</p><a href="#" id="close-popup">Close</a></div></div>');

                jQuery(document).on('click', '#close-popup, #upgrade-popup', function(e) {
                    e.preventDefault();
                    jQuery('#upgrade-popup').remove();
                });

                // disable stabilising legs options
                jQuery('#accord-stabilisinglegs a, #stabilisinglegs-options').addClass('is-disabled'); 
            }
        }

        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - Axle (onchange)
    jQuery(document).on('change', 'input[name="choice-axle"]', function() {
        var selected_option = jQuery(this).val();
        var suspension_options = jQuery('#suspension-options input');
        jQuery('input#input_26_194').val(selected_option);

        if (selected_caravan_model == "Amaroo") {
            if (selected_option == 'Single') {
                // Suspensions
                suspension_options.each(function() {
                    var suspension = jQuery(this).val();
                    if (!suspension.includes("S/A")) jQuery(this).parent().addClass('disabled-option');
                    else jQuery(this).parent().removeClass('disabled-option');
                });

                // Wheels
                jQuery('#wheelsandtires-options > div').show();
                jQuery('#wheelsandtires-options > p').hide();
            } else {
                // Suspensions
                suspension_options.each(function() {
                    var suspension = jQuery(this).val();
                    if (suspension.includes("S/A")) jQuery(this).parent().addClass('disabled-option');
                    else jQuery(this).parent().removeClass('disabled-option');
                });

                // Wheels
                jQuery('#wheelsandtires-options > div').show();
                jQuery('#wheelsandtires-options > p').hide();
            }

            // Trigger clear selections of suspensions and wheels
            jQuery('div#suspension-options + a').click();
            jQuery('div#wheelsandtires-options + a').click();
        }

        jQuery('input#input_26_204').val("");
        jQuery('input#input_26_205').val("");
    });

    // Step 7 - Chassis - Wheels and Tyres Default (onchange)
    jQuery(document).on('change', 'input[name="choice-wheelsandtires-default"]', function() {
        var selected_option = jQuery(this).val();
        jQuery('input#input_26_199').val(selected_option);

        jQuery('#wheelsandtires-options input').prop('checked', false);
        jQuery('input#input_26_166').val("");
        jQuery('input#input_26_127').val("");
        sessionStorage.removeItem('wheelsandtires');
    });

    // Step 7 - Chassis - Wheels and Tyres (onchange)
    jQuery(document).on('change', 'input[name="choice-wheelsandtires"]', function() {
        jQuery('input#input_26_199').val("");
        jQuery('#wheelsandtires-default-options input').prop('checked', false);
        sessionStorage.removeItem('wheelsandtires-default');
    });

    // Step 7 - Chassis - Suspension Default (onchange)
    jQuery(document).on('change', 'input[name="choice-suspension-default"]', function() {
        var selected_option = jQuery(this).val();
        jQuery('input#input_26_200').val(selected_option);

        jQuery('#suspension-options input').prop('checked', false);
        jQuery('input#input_26_159').val("");
        jQuery('input#input_26_120').val("");
        sessionStorage.removeItem('suspension');

        // Clear required gas bayonet
        jQuery('input#input_26_204').val("");
        jQuery('input#input_26_205').val("");
    });

    // Step 7 - Chassis - Suspension (onchange)
    jQuery(document).on('change', 'input[name="choice-suspension"]', function() {
        jQuery('input#input_26_200').val("");
        jQuery('#suspension-default-options input').prop('checked', false);
        sessionStorage.removeItem('suspension-default');

        var selected_val = jQuery(this).val();
        if (selected_caravan_model == "Amaroo") {
            switch (selected_val) {
                case "4.5T Cruisemaster ATX Lvl 3 Manual":
                case "4.5T Cruisemaster XT Level 3 Manual":
                case "3.0T Cruisemaster ATX Lvl 3 Manual S/A":
                    // add external hatch
                    var external_hatch = Object.values(caravan_upgrades['ELECTRICAL']['Hatch']);
                    var external_hatch_name = external_hatch[0][0].name;
                    var external_hatch_price = external_hatch[0][0].amaroocustomerprice;
        
                    if (external_hatch_price != "") { // if price exist, populate hidden fields
                        jQuery('input#input_26_204').val(external_hatch_name);
                        jQuery('input#input_26_205').val(external_hatch_price);
                    }

                    // show popup
                    jQuery('body').append('<div id="upgrade-popup"><div class="upgrade-popup-inner"><p>Adding this option will require a '+ external_hatch_name +' and additional price of $'+ external_hatch_price +' to the caravan.</p><a href="#" id="close-popup">Close</a></div></div>');

                    jQuery(document).on('click', '#close-popup, #upgrade-popup', function(e) {
                        e.preventDefault();
                        jQuery('#upgrade-popup').remove();
                    });
                break;
                default:
                    jQuery('input#input_26_204').val("");
                    jQuery('input#input_26_205').val("");
                break;
            }
        }

        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - Brakes (onchange)
    jQuery(document).on('change', 'input[name="choice-brakes"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - Finish (onchange)
    jQuery(document).on('change', 'input[name="choice-chassisfinish"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - Hitch Type (onchange)
    jQuery(document).on('change', 'input[name="choice-hitchtype"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - Jockey Wheel (onchange)
    jQuery(document).on('change', 'input[name="choice-jockeywheel"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - Stabilising Legs (onchange)
    jQuery(document).on('change', 'input[name="choice-stabilisinglegs"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - Stone Guard (onchange)
    jQuery(document).on('change', 'input[name="choice-stoneguard"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 7 - Chassis - Wheels & Tyres (onchange)
    jQuery(document).on('change', 'input[name="choice-wheelsandtires"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 8 - Power & Electrical
    var install_type = '';
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 8) {
            var page_upgrade_category = 'ELECTRICAL';

            display_standard_inclusion(page_upgrade_category, '#current-system');

            // Display brands and show default system
            var brands = Object.keys(caravan_upgrades['ELECTRICAL']['Electrical system']);
            jQuery.each(brands, function(index, brand) {
                var path = "/wp-content/uploads/configurator/";
                var preview = "";
                switch (brand) {
                    case "Redarc":
                        preview = path + "redarc.svg";
                        break;
                    case "Victron":
                        preview = path + "victron.svg";
                        break;
                    case "Enerdrive":
                        preview = path + "enerdrive.svg";
                        break;
                }

                var radio_container = jQuery('<div>', { class: 'brand-option-' + index }),
                    active_selection = sessionStorage.getItem('brand'),
                    radio_check_brand = false;

                var radio_image = jQuery('<img>', {
                    src: preview,
                    alt: brand
                });

                if (active_selection == brand) {
                    radio_check_brand = true;
                }

                var radio_input = jQuery('<input>', {
                    type: 'radio',
                    name: 'choice-brand',
                    value: brand,
                    id: 'choice-'+ brand +'s-' + index,
                    checked: radio_check_brand
                });

                var radio_label = jQuery('<label>', {
                    for: 'choice-'+ brand +'s-' + index,
                    id: 'label-' + index,
                    class: 'field-label',
                    text: brand
                });

                radio_container.append(radio_input, radio_image, radio_label);
                jQuery('#brand-options').append(radio_container);
            });
            cache_selected_values('brand');

            // Hide enerdrive for adventus
            // if (selected_caravan_model == "Adventus") jQuery('input[value="Enerdrive"]').parent().hide();

            // Indicate default brand if there is no session
            if (sessionStorage.getItem('brand') == null) {
                var currentSystemHtml = jQuery('div#current-system ul li').html();
                var current_system = '';
                if (currentSystemHtml.includes('Redarc')) {
                    jQuery('input[value="Redarc"]').attr('checked', true);
                    current_system = 'Redarc';
                } else if (currentSystemHtml.includes('Victron')) {
                jQuery('input[value="Victron"]').attr('checked', true);
                current_system = 'Victron';
                } else if (currentSystemHtml.includes('Enerdrive')) {
                    jQuery('input[value="Enerdrive"]').attr('checked', true);
                    current_system = 'Enerdrive';
                }
            } else {
                current_system = sessionStorage.getItem('brand');
                jQuery('input[value="'+ current_system +'"]').attr('checked', true);
                jQuery('#accord-brand').addClass('enhanced');
            }

            // Display available install options
            var installationtype = Object.keys(caravan_upgrades['ELECTRICAL']['Electrical system'][current_system]);
            jQuery.each(installationtype, function(index, installationtype) {
                var radio_container = jQuery('<div>', { class: 'installationtype-option-' + index }),
                    active_selection = sessionStorage.getItem('installationtype'),
                    radio_check_install = false;

                if (active_selection == installationtype) {
                    radio_check_install = true;
                }

                var radio_input = jQuery('<input>', {
                    type: 'radio',
                    name: 'choice-installationtype',
                    value: installationtype,
                    id: 'choice-'+ installationtype +'s-' + index,
                    checked: radio_check_install
                });

                var radio_label = jQuery('<label>', {
                    for: 'choice-'+ installationtype +'s-' + index,
                    id: 'label-' + index,
                    class: 'field-label',
                    text: installationtype
                });

                radio_container.append(radio_input, radio_label);
                jQuery('#installationtype-options').append(radio_container)
            });
            cache_selected_values('installationtype');

            // Indicate default installation type
            if (sessionStorage.getItem('installationtype') == null) {
                var current_installationtype_options = jQuery('div#current-system ul li').html();
                var install_type_ref2 = '';
                if (current_installationtype_options.includes('Under lounge')) {
                    install_type = "UNDER LOUNGE";
                    install_type_ref2 = 'Under Lounge';
                    jQuery('input[value="Under Lounge"]').attr('checked', true);
                } else {
                    install_type = "BEHIND FRIDGE";
                    install_type_ref2 = 'Behind Fridge';
                    jQuery('input[value="Behind Fridge"]').attr('checked', true);
                }
            } else {
                install_type_ref2 = sessionStorage.getItem('installationtype');
                install_type = install_type_ref2.toUpperCase();
                jQuery('input[value="'+ install_type_ref2 +'"]').attr('checked', true);
                jQuery('#accord-brand').addClass('enhanced');
            }

            console.log(install_type);

            // Display available change system
            var changesystems = Object.values(caravan_upgrades['ELECTRICAL']['Electrical system'][current_system][install_type_ref2]);
            jQuery.each(changesystems, function(index, changesystem) {
                var system_name = changesystem['name'];
                var radio_container = jQuery('<div>', { class: 'changesystem-option-' + index }),
                    active_selection = sessionStorage.getItem('changesystem'),
                    radio_check_system = false;

                if (active_selection == system_name) {
                    radio_check_system = true;
                }

                var radio_input = jQuery('<input>', {
                    type: 'radio',
                    name: 'choice-changesystem',
                    value: system_name,
                    id: 'choice-'+ system_name +'s-' + index,
                    checked: radio_check_system
                });

                var radio_label = jQuery('<label>', {
                    for: 'choice-'+ system_name +'s-' + index,
                    id: 'label-' + index,
                    class: 'field-label',
                    text: system_name
                });

                // Set data attributes for price
                var customer_price = '';
                switch (selected_caravan_model) {
                    case 'Hornet': 
                        customer_price = changesystem['hornetcustomerprice'];
                    break;
                    case 'Amaroo': 
                        customer_price = changesystem['amaroocustomerprice'];
                    break;
                    case 'Solara': 
                        customer_price = changesystem['solaracustomerprice'];
                    break;
                    case 'XTR': 
                        customer_price = changesystem['xtrcustomerprice'];
                    break;
                }

                // Add data attributes to the label
                radio_label.attr('data-customer-price', customer_price);

                var price_display = jQuery('<p>', {
                    class: 'option-price',
                    text: "+ $" + customer_price
                });

                if (customer_price != null) {
                    if (install_type == "UNDER LOUNGE") {
                        if (selected_caravan_main_bed != "King (6'6\") bed with single storage chest on doorside" && selected_caravan_main_bed != "King (6'6\") bed with single bedside table on doorside" && selected_caravan_main_bed != "Queen (6'6\") bed with storage chest roadside & bedside table doorside" && selected_caravan_main_bed != "Queen (6'6\") bed with dual storage chests") {
                            radio_container.append(radio_input, price_display, radio_label);
                            jQuery('#changesystem-options').append(radio_container);
                        }
                    } else {
                        radio_container.append(radio_input, price_display, radio_label);
                        jQuery('#changesystem-options').append(radio_container);
                    }
                }
            });

            cache_selected_values('changesystem');
            if (sessionStorage.getItem('changesystem') != null) {
                jQuery('#accord-brand').addClass('enhanced')
            } else {
                var option_bool = "";
                if (sessionStorage.getItem('changesystem') == null) option_bool = true;
                else option_bool = false;
                var standard_name = jQuery('div#current-system ul li.elec-row-2').data('label');
                prepend_option('#changesystem-options', standard_name, '/wp-content/uploads/configurator/placeholder.jpg', 'changesystem', option_bool, 99);
            }

            get_upgrade_options(page_upgrade_category, 'TV', 0, '#tvsize-options', 'tvsize');
            var tv_bool = "";
            if (sessionStorage.getItem('tvsize') == null) tv_bool = true;
            else tv_bool = false;
            prepend_option('#tvsize-options', '24" Smart TV', '/wp-content/uploads/configurator/Electrical/englaon-24-TV.webp', 'tvsize', tv_bool, 1);
            cache_selected_values('tvsize');
        
            get_upgrade_options(page_upgrade_category, 'Wifi', 0, '#wifi-options', 'wifi');
            var wifi_bool = "";
            if (sessionStorage.getItem('wifi') == null) wifi_bool = true;
            else wifi_bool = false;
            prepend_option('#wifi-options', 'No Wifi', '/wp-content/uploads/configurator/Electrical/no-wifi.webp', 'wifi', wifi_bool, 2);
            cache_selected_values('wifi');

            /* get_upgrade_options(page_upgrade_category, 'StarLink Provision', 0, '#starlink-options', 'starlink');
            var starlink_bool = "";
            if (sessionStorage.getItem('starlink') == null) starlink_bool = true;
            else starlink_bool = false;
            prepend_option('#starlink-options', 'No StarLink', '/wp-content/uploads/configurator/Electrical/no-starlink-logo.webp', 'starlink', starlink_bool, 1);
            cache_selected_values('starlink'); */

            option_rules();

            // Step 8 - TV, WIfi, Starlink (onchange)
            jQuery(document).on('change', 'input[name="choice-tvsize"], input[name="choice-starlink"], input[name="choice-wifi"]', function () {
                var selected_val = jQuery(this).val();

                switch (selected_val) {
                    case '24" Smart TV':
                        sessionStorage.removeItem('tvsize');
                        jQuery('#accord-tvsize').removeClass('enhanced');
                    break;
                    case 'No Wifi':
                        sessionStorage.removeItem('wifi');
                        jQuery('#accord-wifi').removeClass('enhanced');
                    break;
                    case 'No StarLink':
                        sessionStorage.removeItem('starlink');
                        jQuery('#accord-starlink').removeClass('enhanced');
                    break;
                }
            });
        }
    });

    // Step 8 - Power - Brand (onchange)
    var selected_brand = '';
    jQuery(document).on('change', 'input[name="choice-brand"]', function() {
        sessionStorage.removeItem('installationtype');
        // sessionStorage.removeItem('changesystem');

        var selected_option = jQuery(this).val();
        selected_brand = selected_option;

        jQuery('#installationtype-options').html("");
        var installationtype = Object.keys(caravan_upgrades['ELECTRICAL']['Electrical system'][selected_option]);
        jQuery.each(installationtype, function(index, installationtype) {
            var radio_container = jQuery('<div>', { class: 'installationtype-option-' + index }),
                active_selection = sessionStorage.getItem('installationtype'),
                radio_check = false;

            if (active_selection == installationtype) {
                radio_check = true;
            }

            var radio_input = jQuery('<input>', {
                type: 'radio',
                name: 'choice-installationtype',
                value: installationtype,
                id: 'choice-'+ installationtype +'s-' + index,
                checked: radio_check,
            });

            var radio_label = jQuery('<label>', {
                for: 'choice-'+ installationtype +'s-' + index,
                id: 'label-' + index,
                class: 'field-label',
                text: installationtype
            });

            radio_container.append(radio_input, radio_label);
            jQuery('#installationtype-options').append(radio_container);
        });
        cache_selected_values('installationtype');
        jQuery('#accord-brand').addClass('enhanced');

        jQuery('#changesystem-options').html("");
    });

    // Step 8 - Power - Install Type (onchange)
    jQuery(document).on('change', 'div#installationtype-options input', function () {
        // sessionStorage.removeItem('changesystem');

        install_type = jQuery(this).val().toUpperCase();
        var current_brand = jQuery('#brand-options input:checked').val();
        jQuery('#changesystem-options').html("");
        console.log(install_type);

        // Display available change system
        var changesystems = Object.values(caravan_upgrades['ELECTRICAL']['Electrical system'][current_brand][jQuery(this).val()]);
        jQuery.each(changesystems, function(index, changesystem) {
            var system_name = changesystem['name'];
            var radio_container = jQuery('<div>', { class: 'changesystem-option-' + index }),
                active_selection = sessionStorage.getItem('changesystem'),
                radio_check = false;

            if (active_selection == system_name) {
                radio_check = true;
            }

            var radio_input = jQuery('<input>', {
                type: 'radio',
                name: 'choice-changesystem',
                value: system_name,
                id: 'choice-'+ system_name +'s-' + index,
                checked: radio_check
            });

            var radio_label = jQuery('<label>', {
                for: 'choice-'+ system_name +'s-' + index,
                id: 'label-' + index,
                class: 'field-label',
                text: system_name
            });

            // Set data attributes for price
            var customer_price = '';
            switch (selected_caravan_model) {
                case 'Hornet': 
                    customer_price = changesystem['hornetcustomerprice'];
                break;
                case 'Amaroo': 
                    customer_price = changesystem['amaroocustomerprice'];
                break;
                case 'Solara': 
                    customer_price = changesystem['solaracustomerprice'];
                break;
                case 'XTR': 
                    customer_price = changesystem['xtrcustomerprice'];
                break;
            }

            var price_display = jQuery('<p>', {
                class: 'option-price',
                text: "+ $" + customer_price
            });

            // Add data attributes to the label
            radio_label.attr('data-customer-price', customer_price);

            if (customer_price != null) {
                if (install_type == "UNDER LOUNGE") {
                    if (selected_caravan_main_bed != "King (6'6\") bed with single storage chest on doorside" && selected_caravan_main_bed != "King (6'6\") bed with single bedside table on doorside" && selected_caravan_main_bed != "Queen (6'6\") bed with storage chest roadside & bedside table doorside" && selected_caravan_main_bed != "Queen (6'6\") bed with dual storage chests") {
                        radio_container.append(radio_input, price_display, radio_label);
                        jQuery('#changesystem-options').append(radio_container);
                    }
                } else {
                    radio_container.append(radio_input, price_display, radio_label);
                    jQuery('#changesystem-options').append(radio_container);
                }
            }
        });

        cache_selected_values('installationtype');
        jQuery('#accord-brand').addClass('enhanced');

        var default_brand = jQuery('div#current-system ul li.elec-row-1').data('label');
        var default_install = jQuery('div#current-system ul li.elec-row-3').data('label').toUpperCase();
        if (default_brand == selected_brand) {
            if (default_install.includes(install_type)) {
                var option_bool = "";
                if (sessionStorage.getItem('changesystem') == null) option_bool = true;
                else option_bool = false;
                var standard_name = jQuery('div#current-system ul li.elec-row-2').data('label');
                prepend_option('#changesystem-options', standard_name, '/wp-content/uploads/configurator/placeholder.jpg', 'changesystem', option_bool, 99);
            }
        }

        if (jQuery('div#changesystem-options > div').length == 0) {
            jQuery('#changesystem-options').html("No system available for the selected brand or installation type.");
        }
    });

    // Step 8 - Power - System (onchange)
    jQuery(document).on('change', 'input[name="choice-changesystem"]', function () {
        cache_selected_values('changesystem');

        if (jQuery(this).val() == jQuery('.accord-item-content ul li.elec-row-2').data('label')) {
            jQuery(this).parent().parent().parent().parent().find('a').click();
        }
    });

    // Step 9 - Water Tank
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 9) {
            var page_upgrade_category = 'WATER';
            
            display_standard_inclusion(page_upgrade_category, '#current-tank');

            get_upgrade_options(page_upgrade_category, 'Tank', 0, '#tanks-options', 'tanks');
            cache_selected_values('tanks');

            if (selected_caravan_model == "Hornet" || selected_caravan_model == "XTR" || selected_caravan_model == "Solara") {
                jQuery('#tanks-options').html("Upgrades included as standard");
            }

            option_rules();
        }
    });

    // Step 10 - Exterior
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 10) {
            var page_upgrade_category = 'EXTERIOR';

            display_standard_inclusion(page_upgrade_category, '#current-exterior');

            get_upgrade_options(page_upgrade_category, 'Body', 'Alloy Plate', '#alloyplate-options', 'alloyplate');
            var alloyplate_preview = Object.values(standardInclusions['EXTERIOR']['Body']['Alloy Plate']);
            add_standard_option('alloyplate', '#current-exterior ul li[data-category="alloyplate"] p', '#alloyplate-options', alloyplate_preview[0][selected_caravan_model + '-image'], 'alloyplate', 99);
            cache_selected_values('alloyplate');

            get_upgrade_options(page_upgrade_category, 'Body', 'Entry Door', '#entrydoor-options', 'entrydoor');
            var entrydoor_preview = Object.values(standardInclusions['EXTERIOR']['Body']['Entry Door']);
            add_standard_option('entrydoor', '#current-exterior ul li[data-category="entrydoor"] p', '#entrydoor-options', entrydoor_preview[0][selected_caravan_model + '-image'], 'entrydoor', 99);
            cache_selected_values('entrydoor');

            get_upgrade_options(page_upgrade_category, 'Storage', 0, '#storage-options', 'storage');
            var storage_preview = Object.values(standardInclusions['EXTERIOR']['Storage']['Storage']);
            add_standard_option('storage', '#current-exterior ul li[data-category="storage"] p', '#storage-options', storage_preview[0][selected_caravan_model + '-image'], 'storage', 99);
            cache_selected_values('storage');

            get_upgrade_options(page_upgrade_category, 'Accessories', 'Awning', '#awning-options', 'awning');
            var awning_preview = Object.values(standardInclusions['EXTERIOR']['Accessories']['Awning']);
            add_standard_option('awning', '#current-exterior ul li[data-category="awning"] p', '#awning-options', awning_preview[0][selected_caravan_model + '-image'], 'awning', 99);
            cache_selected_values('awning');

            get_upgrade_options(page_upgrade_category, 'Accessories', 'Slide-out Kitchen', '#slideoutkitchen-options', 'slideoutkitchen');
            var slideout_preview = Object.values(standardInclusions['EXTERIOR']['Accessories']['Slide-out Kitchen']);
            add_standard_option('slideoutkitchen', '#current-exterior ul li[data-category="slideoutkitchen"] p', '#slideoutkitchen-options', slideout_preview[0][selected_caravan_model + '-image'], 'slideoutkitchen', 99);
            cache_selected_values('slideoutkitchen');

            get_upgrade_options(page_upgrade_category, 'Accessories', 'Dust Reduction', '#dustreduction-options', 'dustreduction');
            var dust_preview = Object.values(standardInclusions['EXTERIOR']['Accessories']['Dust Reduction']);
            add_standard_option('dustreduction', '#current-exterior ul li[data-category="dustreduction"] p', '#dustreduction-options', dust_preview[0][selected_caravan_model + '-image'], 'dustreduction', 99);
            cache_selected_values('dustreduction');

            get_upgrade_options(page_upgrade_category, 'Accessories', 'Kitchen Extras', '#kitchenextras-options', 'kitchenextras');
            var extras_preview = Object.values(standardInclusions['EXTERIOR']['Accessories']['Kitchen Extras']);
            add_standard_option('kitchenextras', '#current-exterior ul li[data-category="kitchenextras"] p', '#kitchenextras-options', extras_preview[0][selected_caravan_model + '-image'], 'kitchenextras', 99);
            cache_selected_values('kitchenextras');

            get_upgrade_options(page_upgrade_category, 'Accessories', 'Bike Rack', '#bikeracks-options', 'bikeracks');
            cache_selected_values('bikeracks');

            option_rules();
        }
    });

    // Step 10 - Exterior - Entry Door (onchange)
    jQuery(document).on('change', 'input[name="choice-entrydoor"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

     // Step 10 - Exterior - Bike Racks (onchange)
    jQuery(document).on('change', 'input[name="choice-bikeracks"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 10 - Exterior - Dust Reduction (onchange)
    jQuery(document).on('change', 'input[name="choice-dustreduction"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 10 - Exterior - Kitchen Extras (onchange)
    jQuery(document).on('change', 'input[name="choice-kitchenextras"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 10 - Exterior - Slide-out Kitchen (onchange)
    jQuery(document).on('change', 'input[name="choice-slideoutkitchen"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 10 - Exterior - Alloy Plate (onchange)
    jQuery(document).on('change', 'input[name="choice-alloyplate"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 10 - Exterior - Storage (onchange)
    jQuery(document).on('change', 'input[name="choice-storage"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 10 - Exterior - Storage (onchange)
    jQuery(document).on('change', 'div#storage-options input', function () {
        var selected_storage = jQuery(this).val();
        var bike_rack_options = jQuery('#bikeracks-options input');
        jQuery('#bikeracks-options input').parent().removeClass('disabled-option');
        switch (selected_storage) {
            case "One-Piece TB98 Storage Box With Hinged Lid in Centre, Gas Cylinder Centre Rebate (2 Slides & 12v Socket)- N/A with Thule Bike Rack":
                bike_rack_options.each(function() {
                    var bike_rack = jQuery(this).val();
                    if (bike_rack.includes("Thule")) jQuery(this).parent().addClass('disabled-option');
                });

                // Reset bikeracks
                jQuery('#accord-bikeracks').removeClass('enhanced');
                bike_rack_options.prop('checked', false);
                sessionStorage.removeItem('bikeracks');
            break;
            case "One-Piece TB98-High Storage Box With Hinged Lid in Centre, Gas Cylinder Centre Rebate (2 Slides & 12v Socket)- N/A with Bike Racks":
                jQuery('#bikeracks-options input').parent().addClass('disabled-option');

                // Reset bikeracks
                jQuery('#accord-bikeracks').removeClass('enhanced');
                bike_rack_options.prop('checked', false);
                sessionStorage.removeItem('bikeracks');
            break;
            default:
                jQuery('#bikeracks-options input').parent().removeClass('disabled-option');
            break;
        }
    });

    // Step 10 - Exterior - Awning (onchange)
    jQuery(document).on('change', 'input[name="choice-awning"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 10 - Exterior - Slide-out Kitchen (onchange)
    jQuery(document).on('change', 'input[name="choice-slideoutkitchen"]', function() {
        var selected_val = jQuery(this).val();
        if (selected_val == 'K6-Plus Weber BBQ Provision, With Hybrid Induction & 2 Gas Hob - Black' && selected_caravan_model != "XTR") {
            // add gas bayonet
            var gas_bayonet = Object.values(caravan_upgrades['EXTERIOR']['Gas']);
            var gas_bayonet_name = gas_bayonet[0][0].name;
            var gas_bayonet_price = '';

            switch (selected_caravan_model) {
                case "Hornet":
                    gas_bayonet_price = gas_bayonet[0][0].hornetcustomerprice;
                break;
                case "Solara":
                    gas_bayonet_price = gas_bayonet[0][0].solaracustomerprice;
                break;
                case "Amaroo":
                    gas_bayonet_price = gas_bayonet[0][0].amaroocustomerprice;
                break;
            }

            if (gas_bayonet_price != "") { // if price exist, populate hidden fields
                jQuery('input#input_26_203').val(gas_bayonet_name);
                jQuery('input#input_26_202').val(gas_bayonet_price);
            }

            // show popup
            jQuery('body').append('<div id="upgrade-popup"><div class="upgrade-popup-inner"><p>Adding this option will require a Gas Bayonet and additional price of $'+ gas_bayonet_price +' to the caravan.</p><a href="#" id="close-popup">Close</a></div></div>');

            jQuery(document).on('click', '#close-popup, #upgrade-popup', function(e) {
                e.preventDefault();
                jQuery('#upgrade-popup').remove();
            });
        
        } else {
            jQuery('input#input_26_203').val("");
            jQuery('input#input_26_202').val("");
        }
    });

    // Step 10 - Exterior - Bike Racks (onchange)
    jQuery(document).on('change', 'input[name="choice-bikeracks"]', function() {
        var selected_val = jQuery(this).val();
        if (selected_val.includes('Thule')) { // if thule bike rack is selected, disable N/A to Thule storage
            jQuery('input[value="One-Piece TB98 Storage Box With Hinged Lid in Centre, Gas Cylinder Centre Rebate (2 Slides & 12v Socket)- N/A with Thule Bike Rack"]').parent().addClass('disabled-option');
            jQuery('input[value="One-Piece TB98-High Storage Box With Hinged Lid in Centre, Gas Cylinder Centre Rebate (2 Slides & 12v Socket)- N/A with Bike Racks"]').parent().removeClass('disabled-option');
        } else { // else (ISI bike rack) is selected, disable N/A to all bike racks
            jQuery('input[value="One-Piece TB98-High Storage Box With Hinged Lid in Centre, Gas Cylinder Centre Rebate (2 Slides & 12v Socket)- N/A with Bike Racks"]').parent().addClass('disabled-option');
            jQuery('input[value="One-Piece TB98 Storage Box With Hinged Lid in Centre, Gas Cylinder Centre Rebate (2 Slides & 12v Socket)- N/A with Thule Bike Rack"]').parent().removeClass('disabled-option');
        }
    });

    // Step 11 - Interior
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 11) {
            var page_upgrade_category = 'INTERIOR';

            display_standard_inclusion(page_upgrade_category, '#current-interior');
            jQuery('#current-interior li').each(function() {
                var subcategory = jQuery(this).html();
                if (subcategory.includes('Air Conditioning')) jQuery(this).remove();
                if (subcategory.includes('Fans')) jQuery(this).remove();
                if (subcategory.includes('Fridge')) jQuery(this).remove();
                if (subcategory.includes('Heating')) jQuery(this).remove();
                if (subcategory.includes('Hot Water Service')) jQuery(this).remove();
            });
            
            var colour_options = [
                ['Natural Warmth', ''],
                ['Beach Days', ''],
                ['Forest Track', ''],
                ['Rustic Charm', ''],
                ['Sand Dunes', ''],
                ['Coastal State', ''],
                ['Opium Noir', ''],
                ['Custom Palette', ''],
            ];
            add_fix_options('#colourpalettes-options', colour_options, 'colourpalettes');
            cache_selected_values('colourpalettes');

            get_upgrade_options(page_upgrade_category, 'Bathroom', 0, '#bathroom-options', 'bathroom');
            var bath_preview = Object.values(standardInclusions['INTERIOR']['Bathroom']['Bathroom']);
            add_standard_option('bathroom', '#current-interior ul li[data-category="bathroom"] p', '#bathroom-options', bath_preview[0][selected_caravan_model + '-image'], 'bathroom', 99);
            cache_selected_values('bathroom');

            get_upgrade_options(page_upgrade_category, 'Cabinetry', 0, '#cabinetry-options', 'cabinetry');
            cache_selected_values('cabinetry');

            option_rules();
        }
    });

    // Step 11 - Interior - Colour Palette (onchange)
    jQuery(document).on('change', 'div#colourpalettes-options input', function () {
        var selected_colour = jQuery(this).val();
        var colour_code = '';

        jQuery('.colour-palette-tab-panel-item').removeClass('active-colour');

        switch(selected_colour) {
            case "Natural Warmth":
                colour_code = 'nw';
            break;
            case "Beach Days":
                colour_code = 'bd';
            break;
            case "Forest Track":
                colour_code = 'ft';
            break;
            case "Rustic Charm":
                colour_code = 'rc';
            break;
            case "Sand Dunes":
                colour_code = 'sd';
            break;
            case "Coastal State":
                colour_code = 'cs';
            break;
            case "Opium Noir":
                colour_code = 'on';
            break;
            case "Custom Palette":
                colour_code = 'cp';
            break;
            default:
                colour_code = '';
            break;
        }

        if (colour_code != "") jQuery('.colour-palette-tab-panel-item#' + colour_code).addClass('active-colour');
    });

    // Step 11 - Interior - Bathroom (onchange)
    jQuery(document).on('change', 'input[name="choice-bathroom"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 12 - Appliances
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 12) {
            var page_upgrade_category = 'INTERIOR';

            display_standard_inclusion(page_upgrade_category, '#current-appliances');
            jQuery('#current-appliances li').each(function() {
                var subcategory = jQuery(this).html();
                if (subcategory.includes('Bathroom')) jQuery(this).remove();
                if (subcategory.includes('Coffee Machine Tray')) jQuery(this).remove();
                if (subcategory.includes('Dual Bins')) jQuery(this).remove();
                if (subcategory.includes('Dishwasher')) jQuery(this).remove();
            });

            get_upgrade_options(page_upgrade_category, 'Appliances', 'Cooling', '#cooling-options', 'cooling');
            var cooling_preview = Object.values(standardInclusions['INTERIOR']['Appliances']['Air Conditioning']);
            add_standard_option('cooling', '#current-appliances ul li[data-category="cooling"] p', '#cooling-options', cooling_preview[0][selected_caravan_model + '-image'], 'cooling', 99);
            cache_selected_values('cooling');

            console.log(install_type);
            
            get_upgrade_options(page_upgrade_category, 'Appliances', 'Fridge', '#fridge-options', 'fridge');
            var fridge_preview = Object.values(standardInclusions['INTERIOR']['Appliances']['Fridge']);
            add_standard_option('fridge', '#current-appliances ul li[data-category="fridge"] p', '#fridge-options', fridge_preview[0][selected_caravan_model + '-image'], 'fridge', 99);
            cache_selected_values('fridge');

            get_upgrade_options(page_upgrade_category, 'Appliances', 'Heating', '#heating-options', 'heating');
            var heating_preview = Object.values(standardInclusions['INTERIOR']['Appliances']['Heating']);
            add_standard_option('heating', '#current-appliances ul li[data-category="heating"] p', '#heating-options', heating_preview[0][selected_caravan_model + '-image'], 'heating', 99);

            if (install_type == "BEHIND FRIDGE") {
                // Remove other options of heater except Hydronic for specific caravans
                const codesToCheck = ["1709Q-R-L", "1806Q-M-C", "1806Q-M-L", "1906Q-M-C","1906Q-M-L", "1906Q-R-C", "1906Q-R-L", "2006Q-R-C","2006Q-R-L", "2006Q-R-SC", "2200Q-RC", "2300Q-RC"];
                const exists = codesToCheck.some(code => selected_main_caravan.includes(code));
                if (exists) {
                    jQuery('input[value="Diesel Heater"]').parent().hide();
                    jQuery('input[value="Truma Gas Heater"]').parent().hide();
                }
                cache_selected_values('heating');
            } else {
                // Remove other options of heater except Hydronic for specific caravans
                const codesToCheck = ["1709Q-R-L", "1806Q-M-C", "1806Q-M-L", "1906Q-M-C","1906Q-M-L", "1906Q-R-C", "1906Q-R-L", "2006Q-R-C","2006Q-R-L", "2006Q-R-SC", "2200Q-RC", "2300Q-RC"];
                const exists = codesToCheck.some(code => selected_main_caravan.includes(code));
                if (exists) {
                    jQuery('input[value="Diesel Heater"]').parent().hide();
                    jQuery('input[value="Truma Gas Heater"]').parent().hide();
                } else {
                    jQuery("input[value='Hydronic Diesel Hot Water Service & Heater in One (\"Gasless\" Interior Option)']").parent().hide();   
                }
                cache_selected_values('heating');
            }

            get_upgrade_options(page_upgrade_category, 'Appliances', 'Hot Water', '#hotwater-options', 'hotwater');
            var hotwater_preview = Object.values(standardInclusions['INTERIOR']['Appliances']['Hot Water Service']);
            add_standard_option('hotwater', '#current-appliances ul li[data-category="hotwater"] p', '#hotwater-options', hotwater_preview[0][selected_caravan_model + '-image'], 'hotwater', 99);
            cache_selected_values('hotwater');

            option_rules();
        }
    });

    // Step 12 - Appliances - Fridge (onchange)
    jQuery(document).on('change', 'input[name="choice-fridge"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 12 - Appliances - Heating (onchange)
    jQuery(document).on('change', 'input[name="choice-heating"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }

        jQuery('div#accord-hotwater').removeClass('disabled');
        if (jQuery(this).val() == 'Hydronic Diesel Hot Water Service & Heater in One ("Gasless" Interior Option)') {
            // Remove selected hot water + reset selection
            jQuery('div#accord-hotwater').addClass('disabled');
            jQuery('.hotwater-option-99 input').prop('checked', true);
            jQuery('#hotwater-options + a').click();
        }
    });

    // Step 12 - Appliances - Hot Water (onchange)
    jQuery(document).on('change', 'input[name="choice-hotwater"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 12 - Appliances - Cooling (onchange)
    jQuery(document).on('change', 'input[name="choice-cooling"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Step 13 - Safety & Security
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 13) {
            var page_upgrade_category = 'SAFETY.SECURITY';
            
            display_standard_inclusion(page_upgrade_category, '#current-security');

            get_upgrade_options(page_upgrade_category, 'Reversing camera', 0, '#reversecamera-options', 'reversecamera');
            var hotwater_preview = Object.values(standardInclusions['SAFETY.SECURITY']['Reversing camera']['Reversing camera']);
            add_standard_option('reversecamera', '#current-security ul li[data-category="reversecamera"] p', '#reversecamera-options', hotwater_preview[0][selected_caravan_model + '-image'], 'reversecamera', 99);
            cache_selected_values('reversecamera');

            get_upgrade_options(page_upgrade_category, 'Tracking GPS/anti-theft', 0, '#gpstracking-options', 'gpstracking');
            cache_selected_values('gpstracking');

            option_rules();
        }
    });

    // Step 13 - Security - Camera (onchange)
    jQuery(document).on('change', 'input[name="choice-reversecamera"]', function() {
        if (jQuery(this).hasClass('standard-option')) {
            jQuery(this).parent().parent().parent().find('a').click();
        }
    });

    // Mobile accordion
    if (jQuery('body').width() <= 767) {
        // hide all items on mobile
        jQuery('.model-table-container table td[active="true"]').hide();

        jQuery(document).on('click', '.model-table-container table td.cell-head', function() {
            // Check if the clicked item is currently active
            var isActive = jQuery(this).hasClass('active-row');

            jQuery('.model-table-container table td.cell-head').removeClass('active-row');
            jQuery('.model-table-container table td[active="true"]').hide();

            if (!isActive) { // If it was NOT active, make it active
                jQuery(this).addClass('active-row');
                jQuery(this).parent().find('td[active="true"]').show();
            } else { // If it was active, hide itself
                jQuery(this).removeClass('active-row');
                jQuery(this).parent().find('td[active="true"]').hide();
            }
        });
    }

    // Get upgrade and price on option change
    function getUpgradePrice(option_id, upgrade_name_element, upgrade_price_element) {
        jQuery(document).on('click', option_id + ' input', function() {
            var upg_name = jQuery(this).val();
            var upg_price = jQuery(this).parent().find('label').data('customer-price');

            jQuery(upgrade_name_element).val(upg_name);
            if (upgrade_price_element != null) {
                jQuery(upgrade_price_element).val(upg_price);
            }
        });
    }

    getUpgradePrice('#mainframe-options', 'input#input_26_196', 'input#input_26_197');
    getUpgradePrice('#frame-options', 'input#input_26_158', 'input#input_26_119');
    getUpgradePrice('#suspension-options', 'input#input_26_159', 'input#input_26_120');
    getUpgradePrice('#brakes-options', 'input#input_26_160', 'input#input_26_121');
    getUpgradePrice('#chassisfinish-options', 'input#input_26_161', 'input#input_26_122');
    getUpgradePrice('#hitchtype-options', 'input#input_26_162', 'input#input_26_123');
    getUpgradePrice('#jockeywheel-options', 'input#input_26_163', 'input#input_26_124');
    getUpgradePrice('#stabilisinglegs-options', 'input#input_26_164', 'input#input_26_125');
    getUpgradePrice('#stoneguard-options', 'input#input_26_165', 'input#input_26_126');
    getUpgradePrice('#wheelsandtires-options', 'input#input_26_166', 'input#input_26_127');
    getUpgradePrice('#brand-options', 'input#input_26_168');
    getUpgradePrice('#installationtype-options', 'input#input_26_169');
    getUpgradePrice('#changesystem-options', 'input#input_26_167', 'input#input_26_129');
    getUpgradePrice('#tvsize-options', 'input#input_26_170', 'input#input_26_130');
    getUpgradePrice('#wifi-options', 'input#input_26_171','input#input_26_131');
    getUpgradePrice('#starlink-options', 'input#input_26_172', 'input#input_26_132');
    getUpgradePrice('#tanks-options', 'input#input_26_173', 'input#input_26_133');
    getUpgradePrice('#alloyplate-options', 'input#input_26_174', 'input#input_26_134');
    getUpgradePrice('#entrydoor-options', 'input#input_26_175','input#input_26_135');
    getUpgradePrice('#storage-options', 'input#input_26_176', 'input#input_26_136');
    getUpgradePrice('#awning-options', 'input#input_26_177', 'input#input_26_137');
    getUpgradePrice('#slideoutkitchen-options', 'input#input_26_178', 'input#input_26_138');
    getUpgradePrice('#dustreduction-options', 'input#input_26_179', 'input#input_26_139');
    getUpgradePrice('#kitchenextras-options', 'input#input_26_180', 'input#input_26_140');
    getUpgradePrice('#bikeracks-options', 'input#input_26_181', 'input#input_26_141');
    getUpgradePrice('#colourpalettes-options', 'input#input_26_190');
    getUpgradePrice('#bathroom-options', 'input#input_26_182', 'input#input_26_142');
    getUpgradePrice('#cabinetry-options', 'input#input_26_183', 'input#input_26_143');
    getUpgradePrice('#cooling-options', 'input#input_26_184', 'input#input_26_144');
    getUpgradePrice('#fridge-options', 'input#input_26_185', 'input#input_26_145');
    getUpgradePrice('#heating-options', 'input#input_26_186', 'input#input_26_146');
    getUpgradePrice('#hotwater-options', 'input#input_26_187', 'input#input_26_147');
    getUpgradePrice('#reversecamera-options', 'input#input_26_188', 'input#input_26_148');
    getUpgradePrice('#gpstracking-options', 'input#input_26_189', 'input#input_26_149');

    // Step 14 - Your Details - Compute upgrades
    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {    
        if (current_page == 14) {
            function parseFormattedNumber(value) {
                if (!value) return 0;
                return parseFloat(value.replace(/,/g, '')) || 0;
            }

            var initial_price = parseFormattedNumber(jQuery('input#input_26_55').val());
            var upgrade_fields = [
                '#input_26_197', '#input_26_119', '#input_26_120', '#input_26_121', '#input_26_122', '#input_26_123',
                '#input_26_124', '#input_26_125', '#input_26_126', '#input_26_127', '#input_26_129', '#input_26_202',
                '#input_26_130', '#input_26_131', '#input_26_132', '#input_26_133', '#input_26_134', '#input_26_205',
                '#input_26_135', '#input_26_136', '#input_26_137', '#input_26_138', '#input_26_139',
                '#input_26_140', '#input_26_141', '#input_26_142', '#input_26_143', '#input_26_144',
                '#input_26_145', '#input_26_146', '#input_26_147', '#input_26_148', '#input_26_149'
            ];

            var upgrade_total_price = 0;
            upgrade_fields.forEach(function(selector) {
                // Compute first
                var val = jQuery('input' + selector).val();
                upgrade_total_price += parseFormattedNumber(val);
                
                // Reformat value for email
                if (val == '') {
                    jQuery('input' + selector).val('None selected.');
                } else {
                    jQuery('input' + selector).val('$' + val);
                }

                console.log(jQuery('input' + selector).val());
            });


            var total_price_with_upgrades = initial_price + upgrade_total_price;
            jQuery('input#input_26_150').val(
                total_price_with_upgrades.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            );
        }
    });

    // Clear selection
    jQuery(document).on('click', '.clr-selection', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var options = jQuery(this).data('options');
        var storage = jQuery(this).data('storage');
        var name = jQuery(this).data('inp-txt');
        var price = jQuery(this).data('inp-prc');

        switch (storage) {
            case 'brand':
                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');

                // Select electrical standard inclusions
                // Brand
                var currentSystemHtml = jQuery('div#current-system ul li').html();
                var current_system = '';
                if (currentSystemHtml.includes('Redarc')) {
                    jQuery('input[value="Redarc"]').prop('checked', true);
                    current_system = 'Redarc';
                } else if (currentSystemHtml.includes('Victron')) {
                jQuery('input[value="Victron"]').prop('checked', true);
                current_system = 'Victron';
                } else if (currentSystemHtml.includes('Enerdrive')) {
                    jQuery('input[value="Enerdrive"]').prop('checked', true);
                    current_system = 'Enerdrive';
                }

                // Install Type
                // Display available install options
                jQuery('#installationtype-options').html("");
                var installationtype = Object.keys(caravan_upgrades['ELECTRICAL']['Electrical system'][current_system]);
                jQuery.each(installationtype, function(index, installationtype) {
                    var radio_container = jQuery('<div>', { class: 'installationtype-option-' + index }),
                        active_selection = sessionStorage.getItem('installationtype'),
                        radio_check_install = false;

                    if (active_selection == installationtype) {
                        radio_check_install = true;
                    }

                    var radio_input = jQuery('<input>', {
                        type: 'radio',
                        name: 'choice-installationtype',
                        value: installationtype,
                        id: 'choice-'+ installationtype +'s-' + index,
                        checked: radio_check_install
                    });

                    var radio_label = jQuery('<label>', {
                        for: 'choice-'+ installationtype +'s-' + index,
                        id: 'label-' + index,
                        class: 'field-label',
                        text: installationtype
                    });

                    radio_container.append(radio_input, radio_label);
                    jQuery('#installationtype-options').append(radio_container)
                });

                // Select standard inclusion
                var current_installationtype_options = jQuery('div#current-system ul li').html();
                var install_type_ref2 = '';
                if (current_installationtype_options.includes('Under lounge')) {
                    install_type = "UNDER LOUNGE";
                    install_type_ref2 = 'Under Lounge';
                    jQuery('input[value="Under Lounge"]').attr('checked', true);
                } else {
                    install_type = "BEHIND FRIDGE";
                    install_type_ref2 = 'Behind Fridge';
                    jQuery('input[value="Behind Fridge"]').attr('checked', true);
                }

                console.log(install_type);

                // Show default system

                // Clear all 3 session storage
                sessionStorage.removeItem('brand');
                sessionStorage.removeItem('installationtype');
                sessionStorage.removeItem('changesystem');

                // Clear input fields
                jQuery('input#input_26_168').val("");
                jQuery('input#input_26_169').val("");
                jQuery('input#input_26_167').val("");
                jQuery('input#input_26_129').val("");
            break;
            case 'tvsize':
                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');

                // Select 24 inch size
                jQuery('#' + options + ' input').prop('checked', false);
                jQuery('.tvsize-option-1 input').prop('checked', true);
                
                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
                jQuery('input#input_26_' + price).val("");
            break;
            case 'wifi':
                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');

                // Select no wifi
                jQuery('#' + options + ' input').prop('checked', false);
                jQuery('.wifi-option-2 input').prop('checked', true);
                
                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
                jQuery('input#input_26_' + price).val("");
            break;
            case 'starlink':
                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');

                // Select no starlink
                jQuery('#' + options + ' input').prop('checked', false);
                jQuery('.starlink-option-1 input').prop('checked', true);
                
                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
                jQuery('input#input_26_' + price).val("");
            break;
            case 'axle':
                var suspension_options = jQuery('#suspension-options input');

                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');

                // Select default axle
                jQuery('#' + options + ' input').prop('checked', false);
                if (selected_main_caravan == "Amaroo 1806EW-F2.0-SA") {
                    jQuery('.axle-option-0 input').prop('checked', true);
                    // Single is back to selected - Disable non S/A options on suspension
                    suspension_options.each(function() {
                        var suspension = jQuery(this).val();
                        if (!suspension.includes("S/A")) jQuery(this).parent().addClass('disabled-option');
                        else jQuery(this).parent().removeClass('disabled-option');
                    });

                    // Wheels
                    jQuery('#wheelsandtires-options > div').show();
                    jQuery('#wheelsandtires-options > p').hide();
                } else {
                    jQuery('.axle-option-1 input').prop('checked', true);
                    // Tandem is back to selected - Disable S/A options on suspension
                    suspension_options.each(function() {
                        var suspension = jQuery(this).val();
                        if (suspension.includes("S/A")) jQuery(this).parent().addClass('disabled-option');
                        else jQuery(this).parent().removeClass('disabled-option');
                    });

                    // Wheels
                    jQuery('#wheelsandtires-options > div').show();
                    jQuery('#wheelsandtires-options > p').hide();
                }
                
                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
            break;
            case 'wheelsandtires':
                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');
                
                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
                jQuery('input#input_26_' + price).val("");
            break;
            case 'suspension':
                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');
                
                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
                jQuery('input#input_26_' + price).val("");

                // clear external hatch
                jQuery('input#input_26_204').val("");
                jQuery('input#input_26_205').val("");
            break;
            case 'frame':
                // Reset stabilising legs if specific a-frame is cleared
                if (sessionStorage.getItem('frame') == '6" A-Frame 1950mm & 12" Truss Chassis') {
                    // deselect item
                    jQuery('input[value="BOS Corner Jacks / Stabilisers, 700mm (2 each set, 2 sets)"]').prop('checked', false); 
                    sessionStorage.removeItem('stabilisinglegs');
                    jQuery('#accord-stabilisinglegs').removeClass('enhanced');

                    // reset hidden fields
                    jQuery('input#input_26_164').val("");
                    jQuery('input#input_26_125').val("");

                    // enable stabilising legs options
                    jQuery('#accord-stabilisinglegs a, #stabilisinglegs-options').removeClass('is-disabled');

                    console.log('reset stabilising legs');
                }

                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');
                
                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
                jQuery('input#input_26_' + price).val("");

                console.log('clear frame');
            break;
            case 'slideoutkitchen':
                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');

                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
                jQuery('input#input_26_' + price).val("");

                // Clear required gas bayonet
                jQuery('input#input_26_203').val("");
                jQuery('input#input_26_202').val("");
            break;
            default:
                // Remove upgraded tag
                jQuery('#accord-' + storage).removeClass('enhanced');

                // Clear session storage
                sessionStorage.removeItem(storage);

                // Clear input fields
                jQuery('input#input_26_' + name).val("");
                jQuery('input#input_26_' + price).val("");
            break;
        }

        // Always enable bike rack options on clearing storage option
        if (storage == "storage") jQuery('#bikeracks-options input').parent().removeClass('disabled-option');
        if (storage == "colourpalettes") jQuery('.colour-palette-tab-panel-item').removeClass('active-colour');
    });

    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {
        if (current_page >= 7) {
            const upgrades_list = ['mainframe','frame','axle','suspension','suspension-default','brakes','chassisfinish','hitchtype','jockeywheel','stabilisinglegs','stoneguard','wheelsandtires','wheelsandtires-default','brand','installationtype','changesystem','tvsize','wifi','starlink','tanks','alloyplate','entrydoor','storage','awning','slideoutkitchen','dustreduction','kitchenextras','bikeracks','colourpalettes','bathroom','cabinetry','cooling','fridge','heating','hotwater','reversecamera','gpstracking'];
        
            jQuery('.gform_previous_button').each(function() {
                const foundKeys = upgrades_list.filter(key => sessionStorage.getItem(key) !== null);
                if (foundKeys.length > 0) {
                    jQuery(this).after('<div><strong>base price:</strong><br/>$ ' + base_price + ' AUD + extras<br/></div>');
                } else {
                    jQuery(this).after('<div><strong>base price:</strong><br/>$ ' + base_price + ' AUD<br/></div>');
                }
            });
    
            jQuery('.gform_next_button').each(function() {
                jQuery(this).after('<div class="price-disclaimer"><strong>Updated as at 18/03/2026</strong><p class="trigger-disclaimer-popup">Read Disclaimer</p></div>');
            });

            jQuery('#gform_submit_button_26').after('<div class="price-disclaimer"><strong>Updated as at 18/03/2026</strong><p class="trigger-disclaimer-popup">Read Disclaimer</p></div>');

            jQuery('.accord-item-content-desc').each(function() {
                var text = jQuery(this).html();
                if (text.includes('Standard Inclusion')) jQuery(this).hide();
            });
        }
    });

    jQuery(document).on('gform_post_render', function(event, form_id, current_page) {
        if (current_page == 14) {
            const sessions_map = {
                mainframe: "Main Frame",
                frame: "Frame",
                axle: "Axle",
                suspension: "Suspension",
                "suspension-default": "Suspension (Default)",
                brakes: "Brakes",
                chassisfinish: "Chassis Finish",
                hitchtype: "Hitch Type",
                jockeywheel: "Jockey Wheel",
                stabilisinglegs: "Stabilising Legs",
                stoneguard: "Stone Guard",
                wheelsandtires: "Wheels and Tires",
                "wheelsandtires-default": "Wheels and Tires (Default)",
                brand: "Brand",
                installationtype: "Installation Type",
                changesystem: "Change System",
                tvsize: "TV Size",
                wifi: "Wifi",
                starlink: "Starlink",
                tanks: "Tanks",
                alloyplate: "Alloy Plate",
                entrydoor: "Entry Door",
                storage: "Storage",
                awning: "Awning",
                slideoutkitchen: "Slideout Kitchen",
                dustreduction: "Dust Reduction",
                kitchenextras: "Kitchen Extras",
                bikeracks: "Bike Racks",
                colourpalettes: "Colour Palette",
                bathroom: "Bathroom",
                cabinetry: "Cabinetry",
                cooling: "Cooling",
                fridge: "Fridge",
                heating: "Heating",
                hotwater: "Hot Water",
                reversecamera: "Reverse Camera",
                gpstracking: "GPS Tracking"
            };
        
            jQuery('.summary-page img').attr('src', jQuery('input#input_26_54').val());
            jQuery('.summary-page-caravan span').html(selected_main_caravan);

            const container = jQuery('.summary-page-upgrades');
            Object.entries(sessions_map).forEach(([key, label]) => {
                const value = sessionStorage.getItem(key);
                if (value !== null) {
                    container.append(`<p>${label}: ${value}</p>`);
                }
            });

            if (jQuery('.summary-page-upgrades p').length == 0) {
                jQuery('.summary-page h3').remove();
            }

        }
    });

    jQuery('#close-mobile-notice').click(function(e) {
        e.preventDefault();
        jQuery('#mobile-notice').remove();
    });

    jQuery(document).on('click', '.trigger-disclaimer-popup, #close-disclaimer-popup', function(e) {
        e.preventDefault();
        jQuery('#disclaimer-popup').toggleClass('show');
    });

});