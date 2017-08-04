var numberOfProducts = 0;
$(document).ready(function () {
    $('#category').on('change', function () {
        showProduct();
    });
    $('#search-bar').on('keydown', function () {
        showProduct();
    });
    $('#price').on('change', function () {
        showProduct();
    });
    $("#confirmProducts").click(function () {
        var deliveryDate = $('#deliveryDate').val();
        var allProductKey = $(".productKey");
        var keyProduct = [];
        var productPrice = [];
        var productQuantity = [];
        var exit = false;
        allProductKey.each(function () {
            var keyProd = $(this).val();
            keyProduct.push(parseInt(keyProd));
            productPrice.push(parseInt($("#price_" + keyProd).val()));
            if(parseInt($("#quantity_" + keyProd).val()) > 1 && !isNaN(parseInt($("#quantity_" + keyProd).val()))){                
                productQuantity.push(parseInt($("#quantity_" + keyProd).val()));
                $("#quantity_" + keyProd).css("border", "");
            } else {
                $("#quantity_" + keyProd).css('border', '1px solid red');
                exit = true;
            }
        });
        if(!exit){
            $.post('add_to_order.php', {
                action: "add_to_order"
                , keyProduct: keyProduct
                , productPrice: productPrice
                , productQuantity: productQuantity
                , deliveryDate: deliveryDate
            }, function (data) {
                var error = $(data).find('error').text();
                if (error.length > 0) {
                    alert('You must chose some product');
                }
                else {
                    var result = $(data).find('result').text();
                    window.location.href = result;
                }
            }, "xml");            
        }
    });
    $("#loginSubmit").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        $.post('login.php', {
            email: email
            , password: password
        }, function (data) {
            var userType = $(data).find('userType').text();
            if (userType.length < 0) {
                alert('Invalid login!');
            }
            else {
                if (userType == "1" || userType == "3") {
                    location.href = '/yova/my-requests.php';
                }
                else if (userType == "2") {
                    location.href = "/yova/active_deals.php";
                }
            }
        }, "xml");
    });
    $(".red").first().click();
    $(".requests").first().click();
    $("#createProduct").click(function () {
        var file_data = $('#productFileUpload').prop('files')[0];
        var productName = $("#productName").val();
        var errors = false;
        if (productName.length == 0) {
            $("#productName").css('border', '1px solid red');
            errors = true;
        } else {
            $("#productName").css('border', '');            
        }
        var productCode = $("#productCode").val();
        if (productCode.length == 0) {
            $("#productCode").css('border', '1px solid red');
            errors = true;
        } else {
            $("#productCode").css('border', '');            
        }
        var productDescription = $("#productDescription").val();
        if (productDescription.length == 0) {
            $("#productDescription").css('border', '1px solid red');
            errors = true;
        } else {
            $("#productDescription").css('border', '');            
        }
        var productPrice = $("#productPrice").val();
        if (productPrice.length == 0) {
            $("#productPrice").css('border', '1px solid red');
            errors = true;
        } else {
            $("#productPrice").css('border', '');            
        }
        var productCategory = $("#productCategory").find(":selected").val();
        if (productCategory.length == 0) {
            $("#productCategory").css('border', '1px solid red');
            errors = true;
        } else {
            $("#productCategory").css('border', '');            
        }
        var productUnit = $("#productUnit").find(":selected").val();
        if (productUnit.length == 0) {
            $("#productUnit").css('border', '1px solid red');
            errors = true;
        } else {
            $("#productUnit").css('border', '');            
        }
        if(errors){
           return false; 
        }
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('productName', productName);
        form_data.append('productCode', productCode);
        form_data.append('productDescription', productDescription);
        form_data.append('productPrice', productPrice);
        form_data.append('productCategory', productCategory);
        form_data.append('productUnit', productUnit);
        form_data.append('action', "newProduct");
        $.ajax({
            url: 'products.php'
            , dataType: 'xml'
            , cache: false
            , contentType: false
            , processData: false
            , data: form_data
            , type: 'post'
            , success: function (data) {
                var error = $(data).find('error').text();
                var errorSku = $(data).find('errorSku').text();
                if (errorSku.length > 0) {
                    $("#productCode").css('border', '1px solid red');
                    return;
                }
                var keyProduct = $(data).find('keyProduct').text();
                $(".close-button").click();
                $('#newProduct').find("input[type=text], input[type=number], textarea").val("");
                $('#newProduct').find("input[type=text], input[type=number], textarea").css("border", '');
                $('#newProduct').find("input[type=file]").val("");
                $('#newProduct').find("input[type=file]").css("border", '');
                numberOfProducts++;
                $('#itemsNumber').html(numberOfProducts + "items");
                showProductOnAddProduct(keyProduct);
                $("#nextProduct").fadeIn();
            }
        });
    });
    $("#editProductAction").click(function () {
        var file_data = $('#editProduct #productFileUpload').prop('files')[0];
        var keyProduct = $("#editProduct #keyProduct").val();
        var productName = $("#editProduct #productName").val();
        var productCode = $("#editProduct #productCode").val();
        var productDescription = $("#editProduct #productDescription").val();
        var productPrice = $("#editProduct #productPrice").val();
        var productCategory = $("#editProduct #productCategory").find(":selected").val();
        var productUnit = $("#editProduct #productUnit").find(":selected").val();
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('keyProduct', keyProduct);
        form_data.append('productName', productName);
        form_data.append('productCode', productCode);
        form_data.append('productDescription', productDescription);
        form_data.append('productPrice', productPrice);
        form_data.append('productCategory', productCategory);
        form_data.append('productUnit', productUnit);
        form_data.append('action', "editProduct");
        $.ajax({
            url: 'products.php'
            , dataType: 'xml'
            , cache: false
            , contentType: false
            , processData: false
            , data: form_data
            , type: 'post'
            , success: function (data) {
                var error = $(data).find('error').text();
                if (error.length > 0) {
                    alert(error);
                    return;
                }
                var keyProduct = $(data).find('keyProduct').text();
                $(".close-button").click();
                location.reload();
            }
            , error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });
    $("#submitTier").click(function () {
        var maxQua = $("#edit-item .maxQua");
        var amountCl = $("#edit-item .amount");
        var quantity = [];
        var amount = [];
        var maxTier = $("#edit-item #maxTier:checked").length == 0 ? 0 : 1;
        maxQua.each(function () {
            if ($(this).val() == "") {
                $(this).css("border", "solid 1px red");
                return false;
            }
            quantity.push(parseInt($(this).val()));
        });
        amountCl.each(function () {
            if ($(this).val() == "") {
                $(this).css("border", "solid 1px red");
                return false;
            }
            amount.push(parseInt($(this).val()));
        });
        var productChecked = $("#edit-item .product:checked").val();
        var type = $("#edit-item input[name=view]").val();
        var form_data = new FormData();
        form_data.append('action', "addToTierProduct");
        form_data.append('keyProduct', productChecked);
        form_data.append('quantity', quantity);
        form_data.append('amount', amount);
        form_data.append('maxTier ', maxTier);
        form_data.append('type', type);
        $.ajax({
            url: 'products.php'
            , dataType: 'xml'
            , cache: false
            , contentType: false
            , processData: false
            , data: form_data
            , type: 'post'
            , success: function (data) {
                $(".icon-shoper-a").addClass('icon-shoper-b');
                $(".icon-shoper-b").removeClass('icon-shoper-a');
                $('#toFinish').fadeIn();
                $('.close-button').click();
            }
            , error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });
    $("#submitTierCat").click(function () {
        var maxQua = $("#edit-category .maxQua");
        var amountCl = $("#edit-category .amount");
        var quantity = [];
        var amount = [];
        var maxTier = $("#edit-category #maxTier:checked").length == 0 ? 0 : 1;
        maxQua.each(function () {
            if ($(this).val() == "") {
                $(this).css("border", "solid 1px red");
                return false;
            }
            quantity.push(parseInt($(this).val()));
        });
        amountCl.each(function () {
            if ($(this).val() == "") {
                $(this).css("border", "solid 1px red");
                return false;
            }
            amount.push(parseInt($(this).val()));
        });
        var categoryChecked = $("#edit-category .category:checked").val();
        var type = $("#edit-category input[name=view]").val();
        var form_data = new FormData();
        form_data.append('action', "addToTierCategory");
        form_data.append('keyCategory', categoryChecked);
        form_data.append('quantity', quantity);
        form_data.append('amount', amount);
        form_data.append('maxTier ', maxTier);
        form_data.append('type', type);
        $.ajax({
            url: 'products.php'
            , dataType: 'xml'
            , cache: false
            , contentType: false
            , processData: false
            , data: form_data
            , type: 'post'
            , success: function (data) {
                $('#toFinish').fadeIn();
                $('.close-button').click();
            }
            , error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });
    $("#finishUserCreate").click(function () {
        var form_data = new FormData();
        var emptyInput = $("#userSignUp").find('input').filter(function () {
            return this.value === "";
        });
        var emptySelect = $("#userSignUp").find('select').filter(function () {
            return this.value === "";
        });
        if (emptyInput.length > 0 || emptySelect.length > 0) {
            alert('All fields must be entered.');
        }
        else {
            var firstName = $("#first").val();
            var lastName = $("#last").val();
            var userName = $("#user").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var passwordConfirm = $("#passwordConfirm").val();
            var profilePicture = $('#profilePicture').prop('files')[0];
            var legalBussinesName = $("#legalBussinesName").val();
            var industry = $("#industry").val();
            var businessAddress = $("#businessAddress").val();
            var taxId = $("#taxId").val();
            var city = $("#city").val();
            var state = $("#state").val();
            var zip = $("#zip").val();
            if (password != passwordConfirm) {
                alert('Passwords must match.');
                return false;
            }
            var form_data = new FormData();
            form_data.append('action', "add_user");
            form_data.append('firstName', firstName);
            form_data.append('lastName', lastName);
            form_data.append('userName', userName);
            form_data.append('email', email);
            form_data.append('password', password);
            form_data.append('file', profilePicture);
            form_data.append('legalBussinesName', legalBussinesName);
            form_data.append('industry', industry);
            form_data.append('businessAddress', businessAddress);
            form_data.append('taxId', taxId);
            form_data.append('city', city);
            form_data.append('state', state);
            form_data.append('zip', zip);
            $.ajax({
                url: 'add_user.php'
                , dataType: 'xml'
                , cache: false
                , contentType: false
                , processData: false
                , data: form_data
                , type: 'post'
                , success: function (data) {
                    var error = $(data).find('error').text();
                    if (error.length > 0) {
                        alert(error);
                        return;
                    }
                    var info = $(data).find('info').text();
                    window.location.href = info;
                }
                , error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });
    $('.active-deals').click(function () {
        var id = $(this).id.split('_')[1];
        console.log(id);
        showProductDeal(keyProduct);
    });
    $("#submitUser").click(function () {
        var empty = $("#panel1v").find('input').filter(function () {
            return this.value === "";
        });
        if (empty.length) {
            alert('All fields must be entered.');
        }
        else {
            var username = $("#username").val();
            var email = $("#email").val();
            var currentPassword = $("#currentPassword").val();
            var form_data = new FormData();
            form_data.append('action', "submitUser");
            form_data.append('username', username);
            form_data.append('email', email);
            form_data.append('currentPassword', currentPassword);
            $.ajax({
                url: 'change_user.php'
                , dataType: 'xml'
                , cache: false
                , contentType: false
                , processData: false
                , data: form_data
                , type: 'post'
                , success: function (data) {
                    var returnData = $(data).find('return');
                    var error = $(returnData).find('error').text();
                    var emailError = $(returnData).find('emailError').text();
                    var usernameError = $(returnData).find('usernameError').text();
                    if (error.length > 0) {
                        $("#currentPassword").css("border", "1px solid red");
                    }
                    else {
                        $("#currentPassword").css("border", "");
                    }
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
                    if (error.length == 0 && emailError.length == 0 && usernameError.length == 0) {
                        $("#currentPassword").val("");
                        alert("Data");
                    }
                }
                , error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });
    $("#submitPassword").click(function () {
        var form_data = new FormData();
        var empty = $("#panel2v").find('input').filter(function () {
            return this.value === "";
        });
        if (empty.length) {
            alert('All fields must be entered.');
        }
        else {
            var currentPassword = $("#currentPasswordEdit").val();
            var password = $("#newPassword").val();
            var passwordConfirm = $("#confirmPassword").val();
            if (password != passwordConfirm) {
                alert('Passwords must match.');
                return false;
            }
            var form_data = new FormData();
            form_data.append('action', "submitPassword");
            form_data.append('currentPassword', currentPassword);
            form_data.append('newPassword', password);
            form_data.append('confirmPassword', passwordConfirm);
            $.ajax({
                url: 'change_user.php'
                , dataType: 'xml'
                , cache: false
                , contentType: false
                , processData: false
                , data: form_data
                , type: 'post'
                , success: function (data) {
                    var error = $(data).find('error').text();
                    if (error.length > 0) {
                        $("#currentPasswordEdit").css("border", "1px solid red");
                        alert(error);
                        return;
                    }
                    else {
                        $("#currentPasswordEdit").css("border", "");
                        $("#currentPasswordEdit").val("");
                        $("#newPassword").val("");
                        $("#confirmPassword").val("");
                        alert("Password changed");
                    }
                }
                , error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });
    $("#submitData").click(function () {
        var form_data = new FormData();
        var empty = $("#panel3v").find('input[type=text]').filter(function () {
            return this.value === "";
        });
        if (empty.length) {
            alert('All fields must be entered.');
        }
        else {
            var profilePicture = $('#panel3v #profilePicture').prop('files')[0]; //
            var legalBussinesName = $("#panel3v #legalBusinesName").val(); //
            var industry = $("#panel3v #industry").val(); //
            var businessAddress = $("#panel3v #bussinesAddress").val(); //
            var taxId = $("#panel3v #taxID").val(); //
            var city = $("#panel3v #city").val(); //
            var state = $("#panel3v #state").val(); //
            var zip = $("#panel3v #zip").val();
            var form_data = new FormData();
            form_data.append('action', "submitData");
            form_data.append('file', profilePicture);
            form_data.append('legalBussinesName', legalBussinesName);
            form_data.append('industry', industry);
            form_data.append('businessAddress', businessAddress);
            form_data.append('taxID', taxId);
            form_data.append('city', city);
            form_data.append('state', state);
            form_data.append('zip', zip);
            $.ajax({
                url: 'change_user.php'
                , dataType: 'xml'
                , cache: false
                , contentType: false
                , processData: false
                , data: form_data
                , type: 'post'
                , success: function (data) {
                    var error = $(data).find('error').text();
                    if (error.length > 0) {
                        alert(error);
                        return;
                    }
                    else {
                        location.reload();
                    }
                }
                , error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });
});
/* heigh for sidebar and leftside */
/*var documentHeight = $(document).height();
$('.side-menu').height(documentHeight);
var windowHeight = $(window).innerHeight() - 100;
$('.main-section .side-grid').innerHeight(windowHeight);
$(window).resize(function () {
    var documentHeight = $(window).height() - 65;
    $('.side-menu aside').height(documentHeight);
    var windowHeight = $(window).innerHeight() - 100;
    $('.main-section .side-grid').innerHeight(windowHeight);
});*/
/* sibebar */
$('.side-menu aside .toggle-side').click(function () {
    $('.side-menu aside').toggleClass('open').addClass('hidden');
    $('.side-menu .side-grid').toggleClass('open');
    setTimeout(function () {
        $('.side-menu aside').removeClass('hidden');
    }, 350);
});
/* active deals */
$('.active-deals').slick({
    infinite: false
    , swipe: false
    , slidesToShow: 5
    , slidesToScroll: 1
});
/* login */
$('.floating-box .login input[type="checkbox"]').iCheck({
    checkboxClass: 'icheckbox_minimal-purple'
});
/* cart box */
$('.cart-box .flatpickr').flatpickr({
    minDate: "today"
});
$('.cart-box .item-list').mCustomScrollbar({
    theme: "minimal-dark"
});
$('.cart-box .item-list .item .remove').click(function () {
    $(this).parent().remove();
});
$('.cart-box .close').click(function () {
    $(this).parent().removeClass('active');
});

function showProductOnAddProduct(keyProduct) {
    var form_data = new FormData();
    form_data.append('keyProduct', keyProduct);
    form_data.append('action', "showProductOnAdd");
    $.ajax({
        url: 'products.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var error = $(data).find('error').text();
            if (error.length > 0) {
                alert(error);
                return;
            }
            if ($('#productsSample').find('.sample').size() > 0) {
                $('#productsSample').html("");
            }
            // postavi proizvod sa append to $('#productsSample')
            var products = $(data).find('products');
            var result = "";
            products.find('product').each(function () {
                var keyProduct = $(this).find('keyProduct').text();
                var image = $(this).find('images').text();
                var name = $(this).find('name').text();
                var unit = $(this).find('unit').text();
                var description = $(this).find('description').text();
                var category = $(this).find('category').text();
                var price = $(this).find('price').text();
                result += '<div class="columns products">';
                result += '<div class="tile-box">';
                result += '<button class="trash-button" type="button" onclick="deleteProduct(\'' + keyProduct + '\')"><i class="fa fa-trash" aria-hidden="true"></i></button>';
                result += '<button class="edit-button" data-open="edit-products" aria-controls="edit-products" aria-haspopup="true" tabindex="0" type="button" onclick="editProductPrepare(\'' + keyProduct + '\')"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
                result += '<span class="price-top">$' + price + '</span>';
                result += '<img class="float-center" src="' + image + '" style = "height: 120px;">';
                result += '<h3>';
                result += name;
                result += '<span>Unit: ' + unit + '</span>';
                result += '</h3>';
                result += '<p>' + description + '</p>';
                result += '</div>';
                result += '</div>';
            });
            $('#productsSample').append(result);
        }
    });
}

function showProduct() {
    var category = $('#category').find(":selected").val();
    var searchName = $('#search-bar').val();
    var price = $('#price').val();
    var form_data = new FormData();
    form_data.append('action', "catalogue");
    form_data.append('category', category);
    form_data.append('searchName', searchName);
    form_data.append('price', price);
    $.ajax({
        url: 'catalogue.php', 
        dataType: 'xml',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data, 
        type: 'post',
        success: function (data) {
            var chosen;
            var error = $(data).find('error').text();
            var htmlProduct = "";
            if (error.length > 0) {
                htmlProduct = $(data).find('error').text();
            }
            else {
                chosen = $(data).find('chosen').text();
                if(chosen != ""){
                    chosen = chosen.split(" ");
                }
                var products = $(data).find('products');
                if (products.length > 0) {
                    $(products).find('product').each(function () {
                        var keyProduct = $(this).find('keyProduct').text();
                        var name = $(this).find('name').text();
                        var description = $(this).find('description').text();
                        var image = $(this).find('image').text();
                        var category = $(this).find('category').text();
                        var price = parseFloat($(this).find('price').text());
                        var units = $(this).find('units').text();
                        htmlProduct += '<div class="columns">';
                        htmlProduct += '<div class="tile-box">';
                        htmlProduct += '<span class="price-top">$' + price + '</span>';
                        htmlProduct += '<img class="float-center" src="' + image + '" style="height: 105px;">';
                        htmlProduct += '<h3>' + name + '<span>Unit: ' + units + '</span></h3>';
                        if (description.length < 70) {
                            var descExp = " ";
                            for (var i = 0; i < 70 - description.length; i++) {
                                descExp += "&nbsp;";
                            }
                            description += descExp;
                        }
                        htmlProduct += '<p>' + description + '</p>';
                        htmlProduct += '<a onclick="addToCart(' + keyProduct + ')">';
                        htmlProduct += '<button type="button" class="button add" id="cartAdd_' + keyProduct + '">Add to Cart</button>';
                        htmlProduct += '</a>';
                        htmlProduct += '</div>';
                        htmlProduct += '</div>';
                    });
                }
            }
            $('#shoes').html(htmlProduct);
            for(var i = 0; i<chosen.length; i++){
                addToCart(chosen[i]);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function settingProductEdit() {
    var deliveryDate = $('#deliveryDate').val();
    if (cart.length < 1) {
        alert("Select product first");
        return false;
    }
    else if (deliveryDate.length < 1) {
        $('#deliveryDate').css('border', '1px solid red');
        return false;
    }
    $("#closeCartBox").click();
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
            if (products.length > 0) {
                $(products).find('product').each(function () {
                    var keyProduct = $(this).find('keyProduct').text();
                    var name = $(this).find('name').text();
                    var image = $(this).find('image').text();
                    var price = parseInt($(this).find('price').text());
                    var quantity = parseInt($(this).find('quantity').text());
                    var amount = price;
                    product += '<tr>';
                    product += '<td><input type="hidden" class="productKey" name="productKey" id="productKey_' + keyProduct + '" value="' + keyProduct + '"/><img src="' + image + '" style="height: 80px;" />' + name + '</td>';
                    product += '<td><input class="amounts" type="text" name="price" id="price_' + keyProduct + '" value="' + price + '"></td>';
                    product += '<td><input class="amounts" type="text" name="quantity" id="quantity_' + keyProduct + '" value="1"></td>';
                    product += '<td>$ <span id="amount_' + keyProduct + '">' + amount + '</span></td>';
                    product += '</tr>';
                });
                $("#detailsEdit").html(product);
                $("#selectProd").removeClass("active");
                $("#enterDit").addClass("active");
                $("#catalogueSelect").fadeOut();
                $("#goToDetails").fadeOut();
                $("#enterDetails").fadeIn();
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                $(".amounts").bind('keyup mouseup', function () {
                    var idNum = this.id.split("_")[1];
                    var price = $("#price_" + idNum).val();
                    var quantity = $("#quantity_" + idNum).val();
                    var amount = price * quantity;
                    $("#amount_" + idNum).text(amount);
                });
            }
        }
    }, "xml");
}

function showProductDeal(keyProduct) {
    var form_data = new FormData();
    form_data.append('keyProduct', keyProduct);
    form_data.append('action', "show_deals");
    $.ajax({
        url: 'deals.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var error = $(data).find('error').text();
            if (error.length > 0) {
                alert('You must chose some product.');
            }
            else {
                var productInfo = $(data).find('productInfo');
                var product = "";
                var result = "";
                if (productInfo.length > 0) {
                    var keyAggregated = 0;
                    var keyProduct = $(productInfo).find('keyProduct').text();
                    var productName = $(productInfo).find('productName').text();
                    var productImage = $(productInfo).find('productImage').text();
                    var productPrice = $(productInfo).find('productPrice').text();
                    var promotionStarted = parseInt($(productInfo).find('promotionStarted').text());
                    var discounts = "";
                    var discountsAm = "";
                    var callTimer = false;
                    if (promotionStarted == 0) {
                        product += '<div class="columns">';
                        product += '<div class="product-content">';
                        product += '<div class="product-box">';
                        product += '<img src="' + productImage + '">';
                        product += '<h3>' + productName + '</h3>';
                        product += '<ul class="no-bullet">';
                        product += '<li>Standard Price:';
                        product += '<span><strong class="price">USD ' + productPrice + '</strong> <strong>/box</strong></span>';
                        product += '</li>';
                        if ($(productInfo).find('tier').length > 0) {
                            $(productInfo).find('tier').each(function () {
                                var unitQuatityMax = $(this).find('unitQuantityMax').text();
                                var unitQuantityMin = $(this).find('unitQuantityMin').text();
                                var unitPrice = $(this).find('unitPrice').text();
                                var discountAmount = 100 - (100 * parseFloat(unitPrice)) / parseFloat(productPrice);
                                discounts += '<span class="discounts">' + unitQuantityMin + '-' + unitQuatityMax + ' boxes for <strong class="price">USD ' + unitPrice + '</strong> <strong>/box</strong></span>';
                                discountsAm += '<span class="discountsAm"><strong>' + discountAmount.toFixed(2) + '% off</strong></span><br/>';
                            });
                            product += '<li>Discount Price';
                            product += discounts;
                            product += '</li>';
                            product += '<li>Discount Amount';
                            product += discountsAm;
                            product += '</li>';
                        }
                        product += '</ul>';
                        product += '</div>';
                        if ($(productInfo).find('aggregation').length > 0) {
                            product += '<span id="info">';
                            $(productInfo).find('aggregation').each(function () {
                                var keyAgg = $(this).find('keyAggregated').text();
                                var quaAgg = $(this).find('quantityAggregated').text();
                                product += '<h1>Congratulations! You aggregated ' + quaAgg + ' boxes <small>Would you like to run a promotion?</small></h1>';
                                product += '<div class="button-group">';
                                product += '<button type="button" class="button success" data-open="add-time-restrictions" type="button" class="button login" aria-controls="add-time-restrictions" aria-haspopup="true" tabindex="0" onclick="preparePromotion(' + keyAgg + ', ' + keyProduct + ')">YES</button>';
                                product += '<button type="button" class="button alert">NO</button>';
                                product += '</div>';
                            });
                            product += '</span>';
                        }
                        else {
                            product += '<h1>Aggregating...</h1>';
                        }
                        $("#deals").html(product);
                    }
                    else {
                        var numberOfOffers = 0;
                        var numberAccepted = 0;
                        var timeOfferEnds = undefined;
                        var promotionStatus;
                        var quantityAggregated = 0;
                        var productPrice = $(productInfo).find('productPrice').text();
                        var productQuantity = $(productInfo).find('productQuantity').text();
                        var unitQuatityMax = productQuantity;
                        var unitPrice = productPrice;
                        var unitQuantityMin = 1;
                        if ($(productInfo).find('aggregation').length > 0) {
                            $(productInfo).find('aggregation').each(function () {
                                numberOfOffers = parseInt($(this).find('numberOfOffers').text());
                                numberAccepted = parseInt($(this).find('numberAccepted').text());
                                timeOfferEnds = $(this).find('timeOfferEnds').text();
                                promotionStatus = parseInt($(this).find('promotionStatus').text());
                                quantityAggregated = parseInt($(this).find('quantityAggregated').text());
                                keyAggregated = $(this).find('keyAggregated').text();
                            });
                        }
                        if ($(productInfo).find('tierAgg').length > 0) {
                            $(productInfo).find('tierAgg').each(function () {
                                unitQuatityMax = $(this).find('unitQuantityMax').text();
                                unitQuantityMin = $(this).find('unitQuantityMin').text();
                                unitPrice = $(this).find('unitPrice').text();
                            });
                        }
                        var discountAmount = 100 - (100 * parseFloat(unitPrice)) / parseFloat(productPrice);
                        var needShippingNumber = false;
                        if (promotionStatus == 0) {
                            product += '<div class="columns table deal-table">';
                            product += '<div class="deal-box category-active">';
                            product += '<div class="offer">';
                            product += '<img src="' + productImage + '" style="width: 120px;" />';
                            product += '<div class="deals">';
                            product += '<h1>Shoes Category</h1>';
                            product += '<div class="current-deals">';
                            product += ' Promotion Tier ';
                            product += '<span>Dollar</span>';
                            product += '</div>';
                            product += '<div class="price"> ';
                            product += unitQuantityMin + ' - ' + unitQuatityMax + ' boxes for <span>USD ' + unitPrice + '</span> / box ';
                            product += '</div>';
                            product += '</div>';
                            product += '<div class="time">';
                            product += '<h2> Time Remaining </h2>';
                            product += '<div class="time-box"></div>';
                            product += '</div>';
                            product += '</div>';
                            product += '<div class="completion">';
                            product += '<h4>Completion</h4>';
                            product += '<div class="progress" role="progressbar" tabindex="0" aria-valuenow="' + (numberAccepted / numberOfOffers) * 100 + '" aria-valuemin="0" aria-valuemax="100">';
                            product += '<div class="progress-meter" style="width:' + (numberAccepted / numberOfOffers) * 100 + '%;"></div>';
                            product += '</div>';
                            product += '<div class="progress-step"> ';
                            product += numberAccepted + ' / ' + numberOfOffers;
                            product += ' </div>';
                            product += '</div>';
                            product += '</div>';
                            callTimer = true;
                        }
                        else if (promotionStatus == 1) {
                            product += '<div class="columns table deal-table">';
                            product += '<div class="deal-box category-active">';
                            product += '<div class="offer deal"> <img src="' + productImage + '" style="width: 80px;">';
                            product += '<div class="deals">';
                            product += '<h1>Shoes Category</h1>';
                            product += '<div class="deals-status"> <span class="icon-deals-check"></span> <span>Promotion Completed</span> </div>';
                            product += '<div class="current-deals"> Promotion Tier <span>Dollar</span> </div>';
                            product += unitQuantityMin + ' - ' + unitQuatityMax + ' boxes for <span>USD ' + unitPrice + '</span> / box';
                            product += '<div class="total"> <span>';
                            product += '<strong>Total Buyers</strong>';
                            product += numberAccepted;
                            product += '</span> <span>';
                            product += '<strong>Total Quantity</strong>';
                            product += quantityAggregated + ' boxes';
                            product += '</span> </div>';
                            product += '</div>';
                            product += '</div>';
                            product += '</div>';
                            needShippingNumber = false;
                        }
                        else if (promotionStatus == 2) {
                            product += '<div class="columns table deal-table">';
                            product += '<div class="deal-box category-active">';
                            product += '<div class="offer deal"> <img src="' + productImage + '" style="width: 80px;">';
                            product += '<div class="deals">';
                            product += '<h1>Shoes Category</h1>';
                            product += '<div class="deals-status"> <span class="icon-deals-cancel"></span> <span>Promotion Cancelled</span> </div>';
                            product += '<div class="current-deals"> Promotion Tier <span>Dollar</span> </div>';
                            product += unitQuantityMin + ' - ' + unitQuatityMax + ' boxes for <span>USD ' + unitPrice + '</span> / box';
                            product += '<div class="total"> <span>';
                            product += '<strong>Total Buyers</strong>';
                            product += numberAccepted;
                            product += '</span> <span>';
                            product += '<strong>Total Quantity</strong>';
                            product += quantityAggregated + ' boxes';
                            product += '</span> </div>';
                            product += '</div>';
                            product += '</div>';
                            product += '</div>';
                        }
                        if ($(productInfo).find('buyers').length > 0) {
                            product += '<table>';
                            product += '<thead>';
                            product += '<tr>';
                            product += '<td>BUYER</td>';
                            product += '<td>QUANTITY</td>';
                            product += '<td>LOCATION</td>';
                            if (needShippingNumber) {
                                product += '<td></td>';
                            }
                            product += '</tr>';
                            product += '</thead>';
                            product += '<tbody>';
                            $(productInfo).find('buyers').find('buyer').each(function () {
                                var name = $(this).find('name').text();
                                var quantity = $(this).find('quantity').text();
                                var location = $(this).find('location').text();
                                var image = $(this).find('image').text();
                                var keyBuyer = $(this).find('keyBuyer').text();
                                var keyOrder = $(this).find('keyOrder').text();
                                product += '<tr>';
                                product += '<td><div class="brand nike gap"></div>' + name + '</td>';
                                product += '<td>' + quantity + '</td>';
                                product += '<td>' + location + '</td>';
                                if (needShippingNumber) {
                                    product += '<td id="order_ship_' + keyOrder + '" >';
                                    product += '<button type="button" class="button buyer addShipping" onclick="showShippingInsert(' + keyOrder + ', ' + keyAggregated + ')">Add shipping number</button><div class="input-group"><input class="input-group-field" type="text" placeholder="Refund Amount"><div class="input-group-button"><button type="submit" class="button"><i class="fa fa-check" aria-hidden="true"></i></button></div>';
                                    product += '</td>';
                                }
                                product += '</tr>';
                            });
                            product += '</tbody>';
                            product += '</table>';
                        }
                        product += '</div>';
                        $("#deals").html(product);
                        if (callTimer) {
                            countDown(timeOfferEnds, status);
                        }
                    }
                }
            }
        }
        , error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function showShippingInsert(keyOrder, keyAggregated) {
    var product = "";
    product += '<input type="date" name="expeditionDate" id="expeditionDate_' + keyOrder + '">';
    product += '<input type="text" name="shippingNumber" id="shippingNumber_' + keyOrder + '">';
    product += '<button onclick="addShippingNumber(' + keyOrder + ', ' + keyAggregated + ')"></button>';
    $('#order_ship_' + keyOrder).html(product);
}

function addShippingNumber(keyOrder, keyAggregated) {
    var form_data = new FormData();
    var shippingNumber = $('#shippingNumber_' + keyOrder).val();
    var expeditionDate = $('#expeditionDate_' + keyOrder).val();
    form_data.append('keyAgg', keyAggregated);
    form_data.append('keyOrder', keyOrder);
    form_data.append('shippingNumber', shippingNumber);
    form_data.append('expeditionDate', expeditionDate);
    form_data.append('action', "addShippingNumber");
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            // show shipping number
        }
        , error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function countDown(timer, status) {
    $('.deal-table .deal-box.category-active .offer .time .time-box, .main-section.full-height .tile-grid .tile-box .bottom-box .time-box, .main-section.full-height .tile-grid .info .completion .time-box').countdown(timer).on('update.countdown', function (event) {
        var format = '<span><em>%d</em>days</span> <span><em>%H</em>hours</span> <span><em>%M</em>min</span> <span><em>%S</em>sec</span>';
        $(this).html(event.strftime(format));
    }).on('finish.countdown', function (event) {
        $(this).html('This offer has expired!')
    });
}

function preparePromotion(keyAgg, keyProduct) {
    $("#promoKeyAgg").val(keyAgg);
    $("#promoKeyProduct").val(keyProduct);
}

function countDownOrder(timeOfferEndsAr, keysForTimer) {
    for (var i = 0; i < keysForTimer.length; i++) {
        $('#time-box-' + keysForTimer[i]).countdown(timeOfferEndsAr[i]).on('update.countdown', function (event) {
            var format = '<span><em>%d</em>days</span> <span><em>%H</em>hours</span> <span><em>%M</em>min</span> <span><em>%S</em>sec</span>';
            $(this).html(event.strftime(format));
        }).on('finish.countdown', function (event) {
            $(this).html('This offer has expired!')
        });
    }
}

function startPromotion(timeRestriction) {
    var daysPromo;
    if (timeRestriction) {
        daysPromo = parseInt($("#daysPromotion").val());
    } else {
        daysPromo = null;
    }
    if (isNaN(daysPromo)) {
        daysPromo = null;
    }
    var keyAgg = $("#promoKeyAgg").val();
    var keyProduct = $("#promoKeyProduct").val();
    var form_data = new FormData();
    form_data.append('keyAgg', keyAgg);
    form_data.append('daysPromo', daysPromo);
    form_data.append('action', "startPromotion");
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            showProductDeal(keyProduct);
        }
        , error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function showOrders(keyOrder, typeOrder) {
    $.post('get_orders.php', {
        orderKey: keyOrder
        , typeOrder: typeOrder
    }, function (data) {
        var error = $(data).find('error').text();
        if (error.length > 0) {
            alert(error);
        }
        else {
            var orders = $(data).find('orders');
            var result = ""; //showOrders
            var keysForTimer = [];
            var timeOfferEndsAr = [];
            if (orders.length > 0) {
                $('#currentOrder').val(keyOrder);
                $('#currentOrderType').val(typeOrder);
                $(orders).find('order').each(function () {
                    var from = $(this).find('from').text();
                    var keyAgregated = $(this).find('keyAgregated').text();
                    var keyProductOrder = $(this).find('keyProductOrder').text();
                    var buyer = $(this).find('buyer').text();
                    var name = $(this).find('name').text();
                    var keyProduct = parseInt($(this).find('keyProduct').text());
                    var description = $(this).find('description').text();
                    var image = $(this).find('image').text();
                    var units = $(this).find('units').text();
                    var category = $(this).find('category').text();
                    var quantity = $(this).find('quantity').text();
                    var rate = $(this).find('rate').text();
                    var agregated = parseInt($(this).find('agregated').text());
                    var maxQuantity = parseInt($(this).find('maxQuantity').text());
                    var status = $(this).find('status').text();
                    var percent = maxQuantity > agregated ? ((100 * agregated) / maxQuantity) : 100;
                    var unitPrice = $(this).find('unitPrice').text();
                    var productPrice = $(this).find('productPrice').text();
                    var discountAmount = 100 - (100 * parseFloat(unitPrice)) / parseFloat(productPrice);
                    var unitPrice = $(this).find('unitPrice').text();
                    var numberOfOffers = $(this).find('numberOfOffers').text();
                    var numberAccepted = $(this).find('numberAccepted').text();
                    var shippingID = $(this).find('shippingID').text();
                    var timeOfferEnds = $(this).find('timeOfferEnds').text();
                    var Tier = "";
                    if ($(this).find('tiers').length > 0) {
                        Tier += '<div class="tile-box info" data-equalizer-watch="box" data-closable style="height: 522px;display:none;" id="discountTier_' + keyProduct + '">';
                        Tier += '<button class="close-button" type="button" onclick="hideTier(' + keyProduct + ')" ><span aria-hidden="true">&times;</span></button>';
                        Tier += '<h3>Discount Tier Info</h3>';
                        Tier += '<dl class="discount">';
                        $(this).find('tiers').find('tier').each(function () {
                            var unitQuatityMax = $(this).find('unitQuantityMax').text();
                            var unitQuantityMin = $(this).find('unitQuantityMin').text();
                            var unitPrice = $(this).find('unitPriceTier').text();
                            Tier += '<dd>' + unitQuantityMin + ' - ' + unitQuatityMax + ' boxes for <strong><span>USD ' + unitPrice + '</span> /' + units + '</strong></dd>';
                        });
                        Tier += '</dl>';
                        Tier += '</div>';
                    }
                    if (status == "1") { //status1
                        result += '<div class="columns">';
                        result += '<div class="tile-box" data-equalizer-watch="box" style="height: 522px;" id="product_order_'+keyProduct+'" >';
                        result += '<button class="archive-button" type="button"><span data-tooltip class="has-tip top" data-click-open="true" data-disable-hover="false" title="View Discounts Tier" onclick="showTierForProduct(' + keyProduct + ')"><i class="fa fa-archive" aria-hidden="true"></i></span></button>';
                        result += '<button class="edit-button" data-open="change-order-quantity" aria-controls="change-order-quantity" aria-haspopup="true" tabindex="0" type="button" onclick="changeOrderQuantityPrepare(' + keyProductOrder + ', ' + keyAgregated + ', ' + rate + ', ' + quantity + ')"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + rate + '/' + units + ' <span><strong>Qty:</strong> ' + quantity + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<p>' + description + '</p>';
                        if (keyProduct > 0) {
                            result += '<div class="progress box" role="progressbar" tabindex="0" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100">';
                            result += '<div class="progress-meter" style="width:' + percent + '%;"></div>';
                        }
                        else {
                            result += '<div class="progress box" role="progressbar" tabindex="0" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">';
                            result += '<div class="progress-meter progress-meter-no-key" ></div>';
                        }
                        result += '</div>';
                        result += '<div class="text-center">Aggregated so far: <strong>' + agregated + ' ' + units + '</strong></div>';
                        result += '</div>';
                        result += Tier;
                        result += '</div>';
                    }
                    else if (status == "2") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box active" data-equalizer-watch="box" style="height: 522px;" id="product_order_' + keyProductOrder + '">';
                        result += '<button class="edit-button" type="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<h2>New Offer</h2>';
                        result += '<div class="save">';
                        result += '<strong>' + discountAmount.toFixed(2) + '% off</strong> per box';
                        result += '<span>YOU SAVE USD ' + (productPrice - unitPrice) + ' /box</span>';
                        result += '</div>';
                        result += '<div class="expanded button-group">';
                        result += '<button type="button" class="button accept" data-open="payment-info" aria-controls="payment-info" aria-haspopup="true" tabindex="0" onclick="acceptOrder(' + keyProductOrder + ')" id="acceptOrder_' + keyProductOrder + '">Accept</button>';
                        result += '<button type="button" class="button hollow" onclick="declineOrder()">Reject</button>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                        result += '<div class="tile-box info active payment_info" data-equalizer-watch="box" data-closable="" style="height: 522px;display:none" id="payment_' + keyProductOrder + '">';
                        result += '<button class="close-button" type="button" onclick="closePayment('+keyProductOrder+')"><span aria-hidden="true">&times;</span></button>';
                        result += '<h4>Please confirm your payment info</h4>';
                        result += '<dl>';
                        result += '<dt>Credit Card</dt>';
                        result += '<dd><strong>CC Number:</strong> 475-xxx-xxx-xxx-098</dd>';
                        result += '<dd><strong>Expiry Date:</strong> January 2020</dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<div class="button-group">';
                        result += '<button type="button" style="width: 100%;" class="button expanded" onclick="chosePayment(' + keyProductOrder + ', ' + keyAgregated + ', \'' + typeOrder + '\')">';
                        result += 'Payment info is correct';
                        result += '</button>';
                        result += '<button type="button" style="width: 100%;" class="button expanded hollow" onclick="changePayment(' + keyProductOrder + ')">';
                        result += 'I want to change my payment info';
                        result += '</button>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                        result += '<div class="tile-box info active" data-equalizer-watch="box" data-closable="" style="height: 522px;display:none" id="payment_info_' + keyProductOrder + '">';
                        result += '<button class="back-button" type="button" onclick="returnToPayment('+keyProductOrder+')"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>';
                        result += '<h3>Credit Card Info</h3>';
                        result += '<form>';
                        result += '<div class="card">';
                        result += '<label>Credit Card Number';
                        result += '<input type="number" id="creditCardNumber">';
                        result += '</label>';
                        result += '<label>';
                        result += '<span>Expiry Date</span>';
                        result += '<select>';
                        result += '<option disabled="" selected="">Month<option>';
                        result += '<option value="1">January<option>';
                        result += '<option value="2">February<option>';
                        result += '<option value="3">March<option>';
                        result += '<option value="4">April<option>';
                        result += '<option value="5">May<option>';
                        result += '<option value="6">June<option>';
                        result += '<option value="7">July<option>';
                        result += '<option value="8">August<option>';
                        result += '<option value="9">September<option>';
                        result += '<option value="10">October<option>';
                        result += '<option value="11">November<option>';
                        result += '<option value="12">December<option>';
                        result += '</select>';
                        result += '<select>';
                        result += '<option disabled="" selected="">Year</option>';
                        result += '<option value="2017">2017</option>';
                        result += '<option value="2018">2018</option>';
                        result += '<option value="2019">2019</option>';
                        result += '</select>';
                        result += '</label>';
                        result += '<label class="cvv">CVV';
                        result += '<input type="number" id="cvv">';
                        result += '</label>';
                        result += '</div>';
                        result += '</form>';
                        result += '<button type="button" class="button expanded" onclick="chosePayment(' + keyProductOrder + ', ' + keyAgregated + ', \'' + typeOrder + '\')">Confirm Payment Info</button>';
                        result += '</div>';
                        result += '</div>';
                    }
                    else if (status == "3") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box" data-equalizer-watch="box" style="height: 522px;">';
                        result += '<button class="edit-button" data-open="change-order-quantity" aria-controls="edit-products" aria-haspopup="true" tabindex="0" type="button" onclick="changeOrderQuantityPrepare(' + keyProductOrder + ', ' + keyAgregated + ', ' + rate + ', ' + quantity + ')"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
                        result += '<button class="trash-button" type="button" onclick="leaveOffer(' + keyProductOrder + ', ' + keyAgregated + ')"><span data-tooltip class="has-tip top" data-click-open="true" data-disable-hover="false" title="Leave Discount"><i class="fa fa-trash" aria-hidden="true"></i></span></button>';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<div class="completion">';
                        result += '<strong>Completion</strong>';
                        result += '<div class="progress" role="progressbar" tabindex="0" aria-valuenow="' + (numberAccepted / numberOfOffers) * 100 + '" aria-valuemin="0" aria-valuemax="100">';
                        result += '<div class="progress-meter" style="width:' + (numberAccepted / numberOfOffers) * 100 + '%;"></div>';
                        result += '</div>';
                        result += '<div class="progress-step">';
                        result += '' + numberAccepted + ' / ' + numberOfOffers + '';
                        result += '</div>';
                        result += '</div>';
                        result += '<div class="time-box" id="time-box-' + keyProductOrder + '"></div>';
                        result += '<div class="save">';
                        result += 'Discount Price: <strong>USD ' + unitPrice + ' /box</strong>';
                        result += '<span>YOU SAVE USD ' + (productPrice - unitPrice) + ' /box</span>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                        keysForTimer.push(keyProductOrder);
                        timeOfferEndsAr.push(timeOfferEnds);
                    }
                    else if (status == "4") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box active" data-equalizer-watch="box" id="confirmShipping_' + keyProductOrder + '" style="height: 522px;">';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<h2>You’ve got offer</h2>';
                        result += '<div class="save">';
                        result += '<strong>' + discountAmount.toFixed(2) + '% off</strong> per box';
                        result += '<span>YOU SAVE USD ' + (productPrice - unitPrice) + ' /box</span>';
                        result += '</div>';
                        result += '<button type="button" class="button expanded" onclick="getBuyerInfo(' + buyer + ', ' + keyProductOrder + ', \'' + typeOrder + '\')" >Confirm Shipping Info</button>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                    }
                    else if (status == "5") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box active" data-equalizer-watch="box" style="height: 522px;">';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<p>' + description + '</p>';
                        result += '<div class="bottom-box note" data-closable>';
                        result += 'Time is up, the quantity does not meet the target. The deal is cancelled. You will not be charged.';
                        result += '<button class="close-button" type="button" data-close>';
                        result += '<span aria-hidden="true">&times;</span>';
                        result += '</button>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                    }
                    else if (status == "6") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box" data-equalizer-watch="box" style="height: 522px;">';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<div class="shipping">';
                        result += '<strong>Shipping</strong>';
                        result += '<div class="tracking-id">Tracking ID: <span>' + shippingID + '</span> - via <span class="icon-fedex"></span></div>';
                        result += '</div>';
                        result += '<div class="save">';
                        result += 'Discount Price: <strong>USD ' + discountAmount.toFixed(2) + ' /box</strong>';
                        result += '<span>YOU SAVE USD ' + (productPrice - unitPrice) + ' /box</span>';
                        result += '</div>';
                        result += '<button type="button" class="button expanded" onclick="confirmDelivery(' + keyProductOrder + ', \'' + typeOrder + '\')">Confirm Delivery</button>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                    }
                    else if (status == "7") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box select" data-equalizer-watch="box" style="height: 522px;" id="request-refund-' + keyProductOrder + '">';
                        result += '<div class="cancel-button" onclick="showDrop(this)">';
                        result += '● ● ●';
                        result += '<div class="dropdown">';
                        result += '<button type="button" onclick="requestReturn(' + keyProductOrder + ', ' + buyer + ', \'' + typeOrder + '\')">Request Return</button>';
                        result += '</div>';
                        result += '</div>';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<div class="shipping">';
                        result += '<span class="icon-received"></span><strong>Items Received</strong>';
                        result += '<div class="tracking-id">Tracking ID: <span>' + shippingID + '</span> - via <span class="icon-fedex"></span></div>';
                        result += '</div>';
                        result += '<div class="save">';
                        result += 'Discount Price: <strong>USD ' + discountAmount.toFixed(2) + ' /box</strong>';
                        result += '<span>YOU SAVE USD ' + (productPrice - unitPrice) + ' /box</span>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                    }
                    else if (status == "8") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box" data-equalizer-watch="box" style="height: 522px;">';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<div class="shipping">';
                        result += '<span class="icon-transit"></span></span><strong>Pending Return Request</strong>';
                        result += '<div class="tracking-id">Tracking ID: <span>' + shippingID + '</span> - via <span class="icon-fedex"></span></div>';
                        result += '</div>';
                        result += '<div class="save">';
                        result += 'Discount Price: <strong>USD ' + discountAmount.toFixed(2) + ' /box</strong>';
                        result += '<span>YOU SAVE USD ' + (productPrice - unitPrice) + ' /box</span>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                    }
                    else if (status == "9") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box" data-equalizer-watch="box" style="height: 522px;">';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<div class="shipping">';
                        result += '<span class="icon-refund-approved"></span><strong>Refund Approved</strong>';
                        result += '<div class="tracking-id">Twill be sent in 2-3 days</div>';
                        result += '</div>';
                        result += '<div class="save refund">';
                        result += 'Refund Amount: <strong>USD 12,350</strong>';
                        result += '<span>stocking fee 3%</span>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                    }
                    else if (status == "10") {
                        result += '<div class="columns">';
                        result += '<div class="tile-box" data-equalizer-watch="box" style="height: 522px;">';
                        result += '<img class="float-center" src="' + image + '">';
                        result += '<h3>' + name + '</h3>';
                        result += '<dl>';
                        result += '<dd><strong>Category:</strong> ' + category + '</dd>';
                        result += '<dd><strong>Price:</strong> USD ' + unitPrice + '/box <span><strong>Qty:</strong> ' + agregated + ' ' + units + '</span></dd>';
                        result += '</dl>';
                        result += '<div class="bottom-box">';
                        result += '<div class="shipping">';
                        result += '<span class="icon-not-received"></span><strong>Refund Rejected</strong>';
                        result += '<div class="tracking-id">Please contact the seller</div>';
                        result += '</div>';
                        result += '<div class="save">';
                        result += '<div class="brand nike"></div>';
                        result += '<dl>';
                        result += '<dt>Daiwa Shoes</dt>';
                        result += '<dd>daiwashoes@gmail.com</dd>';
                        result += '<dd>+62983847910</dd>';
                        result += '</dl>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';
                    }
                });
            }
            $("#showOrders").html(result);
            countDownOrder(timeOfferEndsAr, keysForTimer);
        }
    }, "xml");
}
// will go to aceptance after payment is selected and money are widrawn

function acceptOrder(keyProductOrder) {
    $('#product_order_' + keyProductOrder).fadeOut(200, function () {
        $('#payment_' + keyProductOrder).fadeIn();
    });
}

function closePayment(keyProductOrder){
    $('#payment_' + keyProductOrder).fadeOut(200, function () {
        $('#product_order_' + keyProductOrder).fadeIn();
    });
}

function changePayment(keyProductOrder){
    $('#payment_' + keyProductOrder).fadeOut(200, function () {
        $('#payment_info_' + keyProductOrder).fadeIn();
    });
}

function returnToPayment(keyProductOrder){
    $('#payment_info_' + keyProductOrder).fadeOut(200, function () {
        $('#payment_' + keyProductOrder).fadeIn();
    });
    
}

function chosePayment(keyProductOrder, keyAgregated, typeOrder) {
    var form_data = new FormData();
    form_data.append('keyProductOrder', keyProductOrder);
    form_data.append('keyAgregated', keyAgregated);
    form_data.append('typeOrder', typeOrder);
    form_data.append('action', "payed");
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var keyOrder = $(data).find('order').text();
            var from = $(data).find('order').text();
            showOrders(keyOrder, typeOrder);
        }
    });
}

function showTierForProduct(keyProduct) {
    if($("#discountTier_" + keyProduct).length > 0){
        $("#product_order_" + keyProduct).fadeOut(200, function () {
            $("#discountTier_" + keyProduct).fadeIn();
        });
    }
}

function hideTier(keyProduct) {
    $("#discountTier_" + keyProduct).fadeOut(200, function () {
        $("#product_order_" + keyProduct).fadeIn();
    });
}



function getBuyerInfo(keyBuyer, keyProductOrder, typeOrder) {
    var form_data = new FormData();
    form_data.append('keyBuyer', keyBuyer);
    form_data.append('keyProductOrder', keyProductOrder);
    form_data.append('action', "getBuyer");
    var result = "";
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var buyer = $(data).find('buyer');
            var name = buyer.find('name').text();
            var address = buyer.find('address').text();
            var city = buyer.find('city').text();
            var state = buyer.find('state').text();
            var zip = buyer.find('zip').text();
            result += '<div class="tile-box info active" data-equalizer-watch="box" data-closable id="buyer_shipping_info_' + keyProductOrder + '" style="height: 522px;display:none">';
            result += '<button class="close-button" type="button" data-close><span aria-hidden="true">&times;</span></button>';
            result += '<h4>Please confirm your shipping info</h4>';
            result += '<dl>';
            result += '<dt>' + name + '</dt>';
            result += '<dd><strong>Street Address:</strong> ' + address + '</dd>';
            result += '<dd><strong>City:</strong> ' + city + '</dd>';
            result += '<dd><strong>State:</strong> ' + state + '</dd>';
            result += '<dd><strong>Country:</strong> United States of America</dd>';
            result += '<dd><strong>Postal Code:</strong> ' + zip + '</dd>';
            result += '</dl>';
            result += '<button type="button" class="button expanded" onclick="confirmShipping(' + keyProductOrder + ', \'' + typeOrder + '\')">Shipping info is correct</button>';
            result += '</div>';
            $('#confirmShipping_' + keyProductOrder).parent().append(result);
            $('#confirmShipping_' + keyProductOrder).fadeOut(500, function () {
                $('#buyer_shipping_info_' + keyProductOrder).fadeIn();
            });
        }
    });
}

function confirmShippingInfo(keyProductOrder) {}

function confirmShipping(keyProductOrder, typeOrder) {
    var form_data = new FormData();
    form_data.append('keyProductOrder', keyProductOrder);
    form_data.append('typeOrder', typeOrder);
    form_data.append('action', "shippingConfirmed");
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var keyOrder = $(data).find('order').text();
            var from = $(data).find('order').text();
            showOrders(keyOrder, typeOrder);
        }
        , error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function confirmDelivery(keyProductOrder, typeOrder) {
    var form_data = new FormData();
    form_data.append('keyProductOrder', keyProductOrder);
    form_data.append('typeOrder', typeOrder);
    form_data.append('action', "confirmDelivery");
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var keyOrder = $(data).find('order').text();
            showOrders(keyOrder, typeOrder);
        }
        , error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function reject(keyOrder, typeOrder) {
    var form_data = new FormData();
    form_data.append('keyProductOrder', keyOrder);
    form_data.append('typeOrder', typeOrder);
    form_data.append('action', "reject");
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            location.reload();
        }
        , error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function approve(keyOrder, typeOrder) {
    var form_data = new FormData();
    var amountRefunded = $("#" + typeOrder + "_refundAmount_" + keyOrder);
    form_data.append('keyProductOrder', keyOrder);
    form_data.append('typeOrder', typeOrder);
    form_data.append('amountRefunded', amountRefunded);
    form_data.append('action', "approve");
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            location.reload();
        }
        , error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function editProductPrepare(keyProduct) {
    var form_data = new FormData();
    form_data.append('keyProduct', keyProduct);
    form_data.append('action', 'editProductPrepare');
    $.ajax({
        url: 'products.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var error = $(data).find('error').text();
            if (error.length > 0) {
                alert(error);
                return;
            }
            var products = $(data).find('products');
            var result = "";
            products.find('product').each(function () {
                var keyProduct = $(this).find('keyProduct').text();
                var image = $(this).find('images').text();
                var name = $(this).find('name').text();
                var unit = $(this).find('unit').text();
                var description = $(this).find('description').text();
                var category = $(this).find('category').text();
                var price = $(this).find('price').text();
                var productCode = $(this).find('productCode').text();
                $('#editProduct #keyProduct').val(keyProduct);
                $('#editProduct #productName').val(name);
                $('#editProduct #productCode').val(productCode);
                $('#editProduct #productDescription').val(description);
                $('#editProduct #productPrice').val(price);
                $("#editProduct #productCategory").val(category);
                $('#editProduct #productUnit').val(unit);
            });
        }
        , error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function changeOrderQuantityPrepare(keyOrder, keyAgg, rate, quantity) {
    $('#change-order-quantity #keyAgg').val(keyAgg);
    $('#change-order-quantity #keyOrder').val(keyOrder);
    $('#change-order-quantity #newQuantity').val(quantity);
    $('#change-order-quantity #newPrice').val(rate);
}

function changeOrderQuantity() {
    var keyAgg = $('#change-order-quantity #keyAgg').val();
    var keyOrder = $('#change-order-quantity #keyOrder').val();
    var newQuantity = $('#change-order-quantity #newQuantity').val();
    var newPrice = $('#change-order-quantity #newPrice').val();
    if (newQuantity == "") {
        $('#change-order-quantity #newQuantity').css('border', '1px solid red');
        return;
    }
    if (newPrice == "") {
        $('#change-order-quantity #newPrice').css('border', '1px solid red');
        return;
    }
    var currentOrder = $('#currentOrder').val();
    var currentOrderType = $('#currentOrderType').val();
    var form_data = new FormData();
    form_data.append('keyAgg', keyAgg);
    form_data.append('keyOrder', keyOrder);
    form_data.append('newQuantity', newQuantity);
    form_data.append('newPrice', newPrice);
    form_data.append('currentOrderType', currentOrderType);
    form_data.append('action', 'editOrderQuantity');
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            showOrders(currentOrder, currentOrderType);
        }
        , error: function (xhr, ajaxOptions, thrownhError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function leaveOffer(keyProductOrder, keyAgregated) {
    var currentOrder = $('#currentOrder').val();
    var currentOrderType = $('#currentOrderType').val();
    var form_data = new FormData();
    form_data.append('keyAgregated', keyAgregated);
    form_data.append('keyProductOrder', keyProductOrder);
    form_data.append('currentOrder', currentOrder);
    form_data.append('currentOrderType', currentOrderType);
    form_data.append('action', 'leaveOffer');
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var info = $(data).find('info').text();
            if (info.length > 0) {
                location.reload();
            }
            else {
                showOrders(currentOrder, currentOrderType);
            }
        }
        , error: function (xhr, ajaxOptions, thrownhError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function requestReturn(keyProductOrder, keyBuyer, typeOrder) {
    var form_data = new FormData();
    form_data.append('keyBuyer', keyBuyer);
    form_data.append('keyProductOrder', keyProductOrder);
    form_data.append('action', "getBuyer");
    var result = "";
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            var buyer = $(data).find('buyer');
            var name = buyer.find('name').text();
            var address = buyer.find('address').text();
            var city = buyer.find('city').text();
            var state = buyer.find('state').text();
            var zip = buyer.find('zip').text();
            var result = "";
            result += '<div class="tile-box info active" data-equalizer-watch="box" data-closable="" style="height: 522px;" id="id-request-return-' + keyProductOrder + '">';
            result += '<button class="close-button" type="button" data-close=""><span aria-hidden="true">×</span></button>';
            result += '<h3>Return Items</h3>';
            result += '<p>To return this items, please send to address below:</p>';
            result += '<div class="brand nike"></div>';
            result += '<p class="text-center ">' + address + '<br> ' + state + ', ' + zip + '</p>';
            result += '<label>';
            result += 'Expedition';
            result += '<select>';
            result += '<option disabled="" selected=""></option>';
            result += '<option value="2017">Expedition</option>';
            result += '<option value="2017">Expedition</option>';
            result += '<option value="2017">Expedition</option>';
            result += '</select>';
            result += '</label>';
            result += '<label>Tracking ID';
            result += '<input type="number">';
            result += '</label>';
            result += '<button type="button" class="button expanded" onclick="requestReturnCallback(' + keyProductOrder + ', \'' + typeOrder + '\')">Request Return</button>';
            result += '</div>';
            $('#request-refund-' + keyProductOrder).parent().append(result);
            $('#request-refund-' + keyProductOrder).fadeOut(500, function () {
                $('#id-request-return-' + keyProductOrder).fadeIn();
            });
        }
    });
}

function requestReturnCallback(keyProductOrder, typeOrder) {
    var form_data = new FormData();
    form_data.append('keyProductOrder', keyProductOrder);
    form_data.append('typeOrder', typeOrder);
    form_data.append('action', "requestReturn");
    $.ajax({
        url: 'orders_processing.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            showOrders(currentOrder, currentOrderType);
        }
    });
}

function deleteProduct(keyProduct){
    var form_data = new FormData();
    form_data.append('keyProduct', keyProduct);
    form_data.append('action', "deleteProduct");
    $.ajax({
        url: 'products.php'
        , dataType: 'xml'
        , cache: false
        , contentType: false
        , processData: false
        , data: form_data
        , type: 'post'
        , success: function (data) {
            location.reload();
        }, error: function (xhr, ajaxOptions, thrownhError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}