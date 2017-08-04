$(document).ready(function () {
    $(document).foundation();
    //$('select[data-prompt]').foundationSelect();
    $('#upload-csv .dropify').dropify({
        messages: {
            'default': 'Drag your product template here or <span>browse</span> to upload'
            , 'replace': 'Drag your File Template here or browse to replace it'
            , 'remove': 'Remove'
            , 'error': 'Ooops, something wrong appended.'
        }
        , tpl: {
            wrap: '<div class="dropify-wrapper"></div>'
            , loader: '<div class="dropify-loader"></div>'
            , message: '<div class="dropify-message"><span class="icon-drag-drop" /> <p>{{ default }}</p></div>'
            , preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>'
            , filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>'
            , clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>'
            , errorLine: '<p class="dropify-error">{{ error }}</p>'
            , errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
        }
    });
    $('.dropify-po, #upload-po .dropify').dropify({
        messages: {
            'default': 'Drag your purchase order here<br/> or <span>Browse</span> to upload'
            , 'replace': 'Drag your PO file here<br/> or browse to replace it'
            , 'remove': 'Remove'
            , 'error': 'Ooops, something wrong appended.'
        }
        , tpl: {
            wrap: '<div class="dropify-wrapper"></div>'
            , loader: '<div class="dropify-loader"></div>'
            , message: '<div class="dropify-message"><span class="icon-upload-bill" /> <h4>{{ default }}</h4></div>'
            , preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>'
            , filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>'
            , clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>'
            , errorLine: '<p class="dropify-error">{{ error }}</p>'
            , errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
        }
    });
    $('.item-table table tbody tr').hover(function () {
        $(this).children().last().append('<button data-toggle="edit-item" class="edit" type="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>');
    }, function () {
        $(this).children().last().find('button:last').remove();
    });
    $('.category-table table tbody tr').hover(function () {
        $(this).children().last().append('<button data-toggle="edit-category" class="edit" type="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>');
    }, function () {
        $(this).children().last().find('button:last').remove();
    });
    $('.quantity-table table tbody tr').hover(function () {
        $(this).children().last().append('<button class="close" type="button"><i class="fa fa-close" aria-hidden="true"></i></button>');
        $(this).children().last().find('.close').click(function () {
            $(this).closest('tr').remove();
        });
    }, function () {
        $(this).children().last().find('button:last').remove();
    });
    $('.reveal#edit-item .discounts .tier li input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_minimal'
    });
    $('.reveal#edit-item .discounts .switch-toggle').click(function () {
        if ($('#edit-item #dollar-amount').is(':checked')) {
            $('.reveal#edit-item .discounts .tier li .input-group .percent').fadeOut(125, function () {
                $('.reveal#edit-item .discounts .tier li .input-group .currency').fadeIn();
            });
            //$('.reveal#edit-item .discounts .tier li .input-group').fadeToggle(500);
        }
        else if ($('#edit-item #percentage').is(':checked')) {
            $('.reveal#edit-item .discounts .tier li .input-group .currency').fadeOut(125, function () {
                $('.reveal#edit-item .discounts .tier li .input-group .percent').fadeIn();
            });
            //$('.reveal#edit-item .discounts .tier li .input-group').fadeToggle(500);
        }
    });
    $('.reveal#edit-category .discounts .tier li input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_minimal'
    });
    $('.reveal#edit-category .discounts .switch-toggle').click(function () {
        if ($('#edit-category #dollar-amount').is(':checked')) {
            $('.reveal#edit-category .discounts .tier li .input-group .percent').delay(250).fadeOut(125);
            $('.reveal#edit-category .discounts .tier li .input-group .currency').delay(250).fadeIn(125);
            //$('.reveal#edit-category .discounts .tier li .input-group').fadeToggle(500);
        }
        else if ($('#edit-category #percentage').is(':checked')) {
            $('.reveal#edit-category .discounts .tier li .input-group .currency').delay(250).fadeOut(125);
            $('.reveal#edit-category .discounts .tier li .input-group .percent').delay(250).fadeIn(125);
            //$('.reveal#edit-category .discounts .tier li .input-group').fadeToggle(500);
        }
    });
    $('.items input').on('ifToggled', function () {
        $(this).closest('li').toggleClass('selected');
    });
    $('.items input').iCheck({
        radioClass: 'iradio_minimal'
    });
    $('.refund-request table tbody tr td.option .approve').click(function () {
        $('.refund-request table tbody tr td.option > .button').fadeOut(function () {
            $('.refund-request table tbody tr td.option .input-group, .refund-request table tbody tr td.option .cancel').fadeIn().css('display', 'table');
        });
    });
    $('.refund-request table tbody tr td.option .cancel').click(function () {
        $('.refund-request table tbody tr td.option .input-group, .refund-request table tbody tr td.option .cancel').fadeOut(function () {
            $('.refund-request table tbody tr td.option > .button').fadeIn();
        });
    });
    $('.refund-request table tbody tr td.option .input-group .input-group-button .button').click(function () {
        $('.refund-request table tbody tr td.option .input-group, .refund-request table tbody tr td.option .cancel').fadeOut(function () {
            $('.refund-request table tbody tr td.option').replaceWith('<td><span class="approved">Approved</span>Refund Amount: US$ 165,000</td>');
        });
    });
    $('.refund-request table tbody tr td .reject').click(function () {
        $('.refund-request table tbody tr td.option > .button').fadeOut();
        $('.refund-request table tbody tr td.option').replaceWith('<td><span class="rejected">Rejected</span></td>');
    });
    $('.top-bar .top-bar-right .customer, .main-section .add-cvs, .side-menu aside .add-po, .deal-table .category-active .deal .cancel-promo, .main-section.full-height .tile-grid .tile-box .cancel-button').click(function (e) {
        $('.dropdown', this).toggleClass('active');
    });
    $('.reveal#invite-friends .add button').click(function () {
        $('#invite').append('<div class="row"><div class="small-6 columns"><label>Email Address<input type="text"></label></div><div class="small-6 columns"><label>Phone Number<input type="text"></label></div></div>');
    });
    $('.reveal#invite-friends .next').click(function () {
        $('#step-one').fadeOut(function () {
            $('#step-two').fadeIn();
        });
    });
    /*$('.deal-table .deal-box.category-active .offer .time .time-box, .main-section.full-height .tile-grid .tile-box .bottom-box .time-box, .main-section.full-height .tile-grid .info .completion .time-box').countdown('2017/02/28 23:17:50')
        .on('update.countdown', function (event) {
            var format = '<span><em>%d</em>days</span> <span><em>%H</em>hours</span> <span><em>%M</em>min</span> <span><em>%S</em>sec</span>';
            $(this).html(event.strftime(format));
        })
        .on('finish.countdown', function (event) {
            $(this).html('This offer has expired!')
        });*/
    // $('.main-section.full-height .tile-grid .info .completion .time-box').countdown('2017/11/27 23:17:50')
    // .on('update.countdown', function(event) {
    //     var format = '<span><em>%H</em>hours</span> <span><em>%M</em>min</span> <span><em>%S</em>sec</span>';
    //     $(this).html(event.strftime(format));
    // })
    // .on('finish.countdown', function(event) {
    //     $(this).html('This offer has expired!')
    // });
    $('.main-section.full-height .tile-grid .tile-box .trash-button').mouseleave(function () {
        $('.tooltip').removeAttr('style');
    });
    $('.form-box .form').mCustomScrollbar({
        theme: "minimal-dark"
    });
    $('.tile-grid .tile-box .add').click(function () {
        if ($('.top-bar .top-bar-right .cart-item').hasClass('has-item')) {
            $('.top-bar .top-bar-right .cart-item').addClass('add');
            setTimeout(function () {
                $('.top-bar .top-bar-right .cart-item').removeClass('add');
            }, 350);
        }
        $('.top-bar .top-bar-right .cart-item').addClass('has-item').text(function (i, t) {
            return Number(t) + 1;
        });
    });
    // $('.main-section.full-height .tile-grid .tile-box .bottom-box .button-group .accept').click(function() {
    //     var $elem = $(this).closest('.tile-box');
    //     $('[data-offer-accepted]').attr('data-equalizer-watch', 'box');
    //     MotionUI.animateOut($elem, 'hinge-out-from-middle-y', function() {
    //         new Foundation.Equalizer($('[data-equalizer="box"]')).applyHeight();           
    //          MotionUI.animateIn('[data-offer-accepted]', 'hinge-in-from-middle-y', function() {
    //             new Foundation.Equalizer($('[data-equalizer="box"]')).applyHeight();
    //         });
    //         $elem.remove();
    //     });        
    // });
    // // You can also pass a callback that runs when the transition finishes
    // MotionUI.animateOut('#element', 'fade-out', function() {
    // console.log('Transition done!');
    // });
});