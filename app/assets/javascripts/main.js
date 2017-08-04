var cart = [];
var keyOfOrder;
$(document).ready(function () {
    $('#nextStep5').click(function () {
        var items = $(".itemForUpdate");
        var keyProduct = [];
        var productPrice = [];
        var productQuantity = [];
        $(items).each(function () {
            var idThis = this.id;
            keyProduct.push(parseInt($("#" + idThis + ">td>.productKey").val()));
            productPrice.push(parseInt($("#" + idThis + ">td>.price").val()));
            productQuantity.push(parseInt($("#" + idThis + ">td>.quantity").val()));
        });
        $.post('add_to_order.php', {
            action: "add_to_order"
            , keyProduct: keyProduct
            , productPrice: productPrice
            , productQuantity: productQuantity
        }, function (data) {
            var error = $(data).find('error').text();
            if (error.length > 0) {
                alert($(data).find('error').text());
            }
            else {
                var result = $(data).find('result').text();
                $("#step4").fadeOut();
                $("#nextStep4").fadeOut();
                $("#step5").fadeIn();
            }
        }, "xml");
    });
    $('#backChooseProduct').click(function () {
        $("#selectProd").addClass("active");
        $("#enterDit").removeClass("active");
        $("#enterDetails").fadeOut();
        $("#catalogueSelect").fadeIn();
        $("#goToDetails").fadeIn();
    });
    $('#backEditDetails').click(function () {
        $("#backChooseProduct").fadeIn();
        $("#backEditDetails").fadeOut();
        $("#clearAll").css("opacity", 1);
        $("#confirmProducts").fadeOut(500, function () {
            $("#checkDetails").fadeIn();
        });
        $(".amounts").prop('disabled', false);
    });
    $("#checkDetails").click(function () {
        var exit = false;
        $(".amounts").each(function(){
            var testValue = parseInt($(this).val());
            if(parseInt($(this).val()) < 1 || isNaN(parseInt($(this).val()))){
                $(this).css('border', '1px solid red');
                exit = true;
            }
        });
        if(!exit){
            $("#backChooseProduct").fadeOut();
            $("#backEditDetails").fadeIn();
            $("#clearAll").css("opacity", 0);
            $("#checkDetails").fadeOut(500, function () {
                $("#confirmProducts").fadeIn();
            });
            $(".amounts").prop('disabled', true);
            
        }
    });
    $("#nextEntry").click(function () {
        var empty = $("#firstStep").find('input').filter(function () {
            return this.value === "";
        });
        var password = $("#password").val();
        var passwordConfirm = $("#passwordConfirm").val();
        var email = $("#email").val();
        var username = $("#user").val();
        var emailError = "";
        var usernameError = "";
        var form_data = new FormData();
        form_data.append('username', username);
        form_data.append('email', email);
        form_data.append('action', "check");
        if (empty.length > 0) {
            alert('All fields must be entered.');
            return false;
        }
        else if (password != passwordConfirm) {
            $("input[type=password]").css("border", "solid 1px red");
            alert('Passwords must match.');
            return false;
        }
        $.ajax({
            url: 'login.php'
            , dataType: 'xml'
            , cache: false
            , contentType: false
            , processData: false
            , data: form_data
            , type: 'post'
            , success: function (data) {
                var returnData = $(data).find('return');
                emailError = $(returnData).find('emailError').text();
                usernameError = $(returnData).find('usernameError').text();
                if (emailError.length > 0) {
                    $("#email").css("border", "solid 1px red");
                }
                else {
                    $("#email").css("border", "");
                }
                if (usernameError.length > 0) {
                    $("#user").css("border", "solid 1px red");
                }
                else {
                    $("#user").css("border", "");
                }
                if (emailError.length == 0 && usernameError.length == 0) {
                    $("#firstStep").fadeOut(500, function () {
                        $("#secondStep").fadeIn();
                    });
                }
            }
            , error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });
    $("#backUserCreate").click(function () {
        $("#secondStep").fadeOut(500, function () {
            $("#firstStep").fadeIn();
        });
    });
    $("#clearAll").click(function () {
        $("#detailsEdit").html();
        $('#backChooseProduct').click();
        var tempCart = cart.slice();
        var n = tempCart.length;
        for (var i = 0; n > i; i++) {
            addToCart(tempCart[i]);
        }
        $(".item-list").html("");
    });
    $("#filePo").change(function () {
        var file_data = $('#filePo').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        console.log(file_data);
        $.ajax({
            url: 'po_reader.php'
            , dataType: 'xml'
            , cache: false
            , contentType: false
            , processData: false
            , data: form_data
            , type: 'post'
            , success: function (data) {
                var finish = $(data).find('finish ').text();
                window.location.href = finish;
            }
            , error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });
    $('#goToDetails').click(function () {
        settingProductEdit();
    });
    $('#cartImage').click(function () {
        if ($(".cart-box").hasClass('active')) {
            $("#closeCartBox").click();
        }
        else {
            $('.cart-box').addClass('active');
        }
    });
    $('#nextProductDiscount').click(function () {
        var productChecked = $("#edit-item .product:checked");
        if (productChecked.length > 0) {
            $('.reveal#edit-item .discounts').show();
            $('#nextProductDiscount').hide();
            $('#submitTier').show();
        }
        else {
            alert("Please select product to add tier.");
        }
    });
    $('#nextCategoryDiscount').click(function () {
        var productChecked = $("#edit-category .category:checked");
        if (productChecked.length > 0) {
            $('.reveal#edit-category .discounts').show();
            $('#nextCategoryDiscount').hide();
            $('#submitTierCat').show();
        }
        else {
            alert("Please select product to add tier.");
        }
    });
    $("#profilePicture").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#thumbnail').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $("productFileUpload").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#thumbnail').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $("#productFileUpload").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#thumbnail').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 70) {
            $('body').addClass('sticky-search');
        }
        else if (scrollTop < 70) {
            $('body').removeClass('sticky-search');
        }
    });
    $('.floating-box .subscription>.row .switch-toggle label[for="monthly"]').click(function () {
        $('.floating-box .subscription .sub-box > .sub-coupon').fadeOut(125);
        $('.floating-box .subscription .sub-box > .sub-plan').delay(125).fadeIn(125);
    });
    $('.floating-box .subscription>.row .switch-toggle label[for="coupon"]').click(function () {
        $('.floating-box .subscription .sub-box > .sub-plan').fadeOut(125);
        $('.floating-box .subscription .sub-box > .sub-coupon').delay(125).fadeIn(125);
    });
});

function addToCart(keyProduct) {
    if(keyProduct != undefined){
        keyProduct = parseInt(keyProduct);
        var cartAdd = $("#cartAdd_" + keyProduct).text();
        var indexOfProduct = cart.indexOf(keyProduct);
        if (cartAdd == "Added to cart" && indexOfProduct != -1) {
            cart.splice(indexOfProduct, 1);
            $("#cartAdd_" + keyProduct).text("Add to Cart");
        }
        else if (cart.length == 0 || indexOfProduct == -1) {
            cart.push(keyProduct);
            $("#cartAdd_" + keyProduct).text("Added to cart");
        }
    }
    if (cart.length > 0) {
        $.post('add_to_cart.php', {
            action: "add_to_cart"
            , productKeys: cart
        }, function (data) {
            var error = $(data).find('error').text();
            if (error.length > 0) {
                alert('You must chose some product');
            }
            else {
                var products = $(data).find('products');
                var product = "";
                if (products.length > 0 && cart.length > 0) {
                    $(products).find('product').each(function () {
                        var keyProduct = $(this).find('keyProduct').text();
                        var name = $(this).find('name').text();
                        var category = $(this).find('category').text();
                        var image = $(this).find('image').text();
                        var price = parseInt($(this).find('price').text());
                        var quantity = parseInt($(this).find('quantity').text());
                        var amount = price * quantity;
                        product += '<span class="item">';
                        product += '<strong class="name">' + name + '<span>' + category + '</span></strong>';
                        product += '<span class="price">$' + price + '</span>';
                        product += '<button class="remove" onclick="addToCart(' + keyProduct + ')"><i class="fa fa-times" aria-hidden="true"></i></button>';
                        product += '</span>';
                    });
                    $(".item-list").html(product);
                }
            }
        }, "xml");
        $("#cartImage").text(cart.length).addClass('has-item');
        $('.cart-box').addClass('active');
        if ($("#cartImage").hasClass('has-item')) {
            $("#cartImage").addClass('add');
            setTimeout(function () {
                $("#cartImage").removeClass('add');
            }, 350);
        }
    } else {
        $("#cartImage").text("0");
        $("#cartImage").text(cart.length).removeClass('has-item');
        $('.cart-box').removeClass('active');
        $(".item-list").html("");
        $.post('add_to_cart.php', {
            action: "unset"
        }, function (data) {
            console.log("Unset");
        });
    }
}

function removeProduct(product) {
    $("#" + product).remove();
    console.log("Removed with key" + product);
}

function addTierProduct() {
    var biggest = parseInt($("#edit-item .maxQua").last().val()) + 1;
    if (!isNaN(biggest)) {
        var tierNew = '<li class="tierLi"><span class="quantity">' + biggest + '</span><span class="divide">to</span><input type="text" name="maxQua" class="maxQua" min="' + biggest + '"><label id="maxTierLabel" for="maxTier"><input type="checkbox" name="max" id="maxTier">Maximum Tier</label><div class="input-group"><span class="input-group-label currency">USD</span><input name="amount" class="input-group-field amount" type="text"><span class="input-group-label percent">%</span></div><button class="close"><i class="fa fa-times" aria-hidden="true"></i></button></li>';
        $('#edit-item #maxTierLabel').remove();
        $('.reveal#edit-item .discounts .tier').append(tierNew);
        $('#edit-item #maxTierLabel').iCheck({
            checkboxClass: 'icheckbox_minimal'
        });
        $('.reveal#edit-item .discounts .tier li .close').click(function () {
            $(this).closest('li').remove();
        });
    }
}

function addTierDiscount() {
    var biggest = parseInt($("#edit-category .maxQua").last().val()) + 1;
    if (!isNaN(biggest)) {
        var tierNew = '<li class="tierLi"><span class="quantity">' + biggest + '</span><span class="divide">to</span><input type="text" name="maxQua" class="maxQua" min="' + biggest + '"><label id="maxTierLabel" for="maxTier"><input type="checkbox" name="max" id="maxTier">Maximum Tier</label><div class="input-group"><span class="input-group-label currency">USD</span><input name="amount" class="input-group-field amount" type="text"><span class="input-group-label percent">%</span></div><button class="close"><i class="fa fa-times" aria-hidden="true"></i></button></li>';
        $('#edit-category #maxTierLabel').remove();
        $('.reveal#edit-category .discounts .tier').append(tierNew);
        $('#edit-category #maxTierLabel').iCheck({
            checkboxClass: 'icheckbox_minimal'
        });
        $('.reveal#edit-category .discounts .tier li .close').click(function () {
            $(this).closest('li').remove();
        });
    }
}

function addDashes(f) {
    if (f.value.indexOf("\-") == -1) {
        f.value = f.value.slice(0, 2) + "-" + f.value.slice(2, 10);
    }
}

function showDrop(f) {
    $(f).find('.dropdown').toggleClass('active');;
}