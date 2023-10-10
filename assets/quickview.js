$(document).ready(function () {
  $.getScript("//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js").done(function() {
    quickView();
  });
});

 

function quickView() {
  $("body").on('click', '.quick-view', function () {

    if ($('#quick-view').length == 0){$("body").append('<div id="quick-view"></div>');}

    var product_handle = $(this).data('handle');

    $('#quick-view').attr('product-handle', product_handle);

    jQuery.getJSON('/products/' + product_handle + '.js', function (product) {

      var title = product.title;

      var type = product.type;

      var price = 0;

      var original_price = 0;

//       var desc = product.description;

      var images = product.images;

      var variants = product.variants;

      var options = product.options;

      var url = '/products/' + product_handle;

      $('.qv-product-title').text(title);

      $('.qv-product-type').text(type);

//       $('.qv-product-description').html(desc);

      $('.view-product').attr('href', url);

      var imageCount = $(images).length;

      $(images).each(function (i, image) {

        if (i == imageCount - 1) {

          var image_embed = '<div><img class="lazy2" src="' + image + '"></div>';

          image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_700x.png');

          $('.qv-product-images').append(image_embed);

 

          $('.qv-product-images').slick({

            'dots': false,

            'arrows': true,

            'respondTo': 'min',

            'useTransform': false

          }).css('opacity', '1');

 

        } else {

          image_embed = '<div><img class="lazy2" src="' + image + '"></div>';

          image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');

          $('.qv-product-images').append(image_embed);

        }

      });

      $(options).each(function (i, option) {
        var opt = option.name;
        var selectClass = '.option.' + opt.toLowerCase();
        $('.qv-product-options').append('<div class="option-selection-' + opt.toLowerCase() + '"><span class="option">' + opt + '</span><select class="option-' + i + ' option ' + opt.toLowerCase() + '"></select></div>');
        $(option.values).each(function (i, value) {
          $('.option.' + opt.toLowerCase()).append('<option value="' + value + '">' + value + '</option>');
        });
      });

      $(product.variants).each(function (i, v) {
       
        if (v.inventory_quantity == 0) {
        
          $('.qv-add-button').prop('disabled', true).val('Sold Out');
          $('.qv-add-to-cart').hide();          
          $('.qv-product-price').text('Sold Out').show();
          return true
        } else {
          price = parseFloat(v.price / 100).toFixed(2);
          original_price = parseFloat(v.compare_at_price / 100).toFixed(2);
          var nf = new Intl.NumberFormat('en-US');
              price=   nf.format(price)
          original_price=   nf.format(original_price)
          $('.qv-product-price').text('Rs. ' + price +'.00');
          if (original_price > 0) {
            $('.qv-product-original-price').text('Rs.' + original_price +'.00').show();
          } else {
            $('.qv-product-original-price').hide();
          }
          $('select.option-0').val(v.option1);
          $('select.option-1').val(v.option2);
          $('select.option-2').val(v.option3);
          return false
        }
      });
    });

 

    $(document).on("change", "#quick-view select", function () {
      var selectedOptions = '';
      $('#quick-view select').each(function (i) {
        if (selectedOptions == '') {
          selectedOptions = $(this).val();
        } else {
          selectedOptions = selectedOptions + ' / ' + $(this).val();
        }
      });

      jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
        $(product.variants).each(function (i, v) {
          if (v.title == selectedOptions) {
            var price = parseFloat(v.price / 100).toFixed(2);
            var original_price = parseFloat(v.compare_at_price / 100).toFixed(2);
            var v_qty = v.inventory_quantity;
            var v_inv = v.inventory_management;
            var nf = new Intl.NumberFormat('en-US');
              price=   nf.format(price)
          original_price=   nf.format(original_price)
            $('.qv-product-price').text('Rs. ' + price +'.00');
            $('.qv-product-original-price').text('Rs. ' + original_price+'.00');
            if (v_inv == null) {

              $('.qv-add-button').prop('disabled', false).val('Add to Cart');
            } else {
              if (v.inventory_quantity < 1) {
                
                $('.qv-add-button').prop('disabled', true).val('Sold Out');
              } else {
               
                $('.qv-add-button').prop('disabled', false).val('Add to Cart');
              }
            }
          }
        });
      });
      
      $('.fancybox-close').on('click', function(){
       $('#quick-view').removeClass('active_quick_view');
      });
    }); // end ready function

    $.fancybox({
      href: '#quick-view',
      maxWidth: 1140,
      maxHeight: 800,
      fitToView: true,
      width: '75%',
      height: '70%',
      autoSize: false,
      closeClick: false,
      openEffect: 'none',
      closeEffect: 'none',
      'beforeLoad': function () {
        $('#quick-view').addClass('active_quick_view');
        //var product_handle = $('#quick-view').attr('class');
//         $(document).on("click", ".qv-add-button", function () {
//           var qty = $('.qv-quantity').val();          
// // 		var item_count = $(".cart-link__bubble .cart-link__bubble-num").val();            
//           var selectedOptions = '';
//           var var_id = '';
// //           $('#quick-view select').each(function (i) {
// //             if (selectedOptions == '') {
// //               selectedOptions = $(this).val();
// //             } else {
// //               selectedOptions = selectedOptions + ' / ' + $(this).val();
// //             }
            
            
// //           });
          
//           selectedOptions = $('.active_quick_view select option:selected').val();
//           product_handle  = $('.active_quick_view').attr('product-handle');
//           jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
            
//             $(product.variants).each(function (i, v) {  
              
//               if (v.title == selectedOptions) {
//                 var variant_id = v.id;
//                 addItemToCartQuickView(variant_id,1);
//               }
//             });
//           });
          
//           function processCart() {
//         jQuery.post('/cart/add.js', {        
//               quantity: qty,
//               id: var_id,         
//             },
//                         null,
//                         "json"
//                        ).done(function () {          
//           $.getJSON('/cart.json', function(cart) {
//             var total_count = cart.item_count;
//             $('body').addClass('cart-has-items');
//             $('.cart-link .cart-link__bubble').addClass('cart-link__bubble--visible');
//             $('.cart-link .cart-link__bubble').find('.cart-link__bubble-num').text(total_count)             
//           });
          
//          $('.item_added').css("color","green").fadeIn("fast");
// //               $('.qv-add-to-cart-response').addClass('success').html('<span>' + $('.qv-product-title').text() + ' has been added to your cart. <a href="/cart">Click here to view your cart.</a>');
//                 cartUpdateJs();             
//              $(".cart-link__bubble .cart-link__bubble-num").trigger('click');         
//             })
//             .fail(function ($xhr) {
//               var data = $xhr.responseJSON;
//               $('.qv-add-to-cart-response').addClass('error').html('<span><b>ERROR: </b>' + data.description);
//               });
//              }
//         });
        $('.fancybox-wrap').css('overflow', 'hidden !important');
      },

       'afterShow': function () {
        $('#quick-view').hide().html(content).css('opacity', '1').fadeIn(function () {
          $('.qv-product-images').addClass('loaded');
        });
      },
      'afterClose': function () {
        $('#quick-view').removeClass().empty();
      }
    });  
  });
};

$(function(){
  $('body').on("click",'.qv-add-button', function () {
    var selectedOptions = $('.active_quick_view select option:selected').val();
    var product_handle  = $('.active_quick_view').attr('product-handle');
    var qnt             = $('.active_quick_view .qv-quantity').val();
    
        jQuery.getJSON('/products/' + product_handle + '.js', function (product) {

          $(product.variants).each(function (i, v) {  

            if (v.title == selectedOptions) {

              var variant_id = v.id;
              addItemToCartQuickView(variant_id,qnt);
            }
          });
        });
  });
});

$(window).resize(function () {
  if ($('#quick-view').is(':visible')) {
    $('.qv-product-images').slick('setPosition');
  }
});
 

 function slickCarousel2() {
  $('.qv-product-images').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
  });
}
function destroyCarousel2() {
  if ($('.qv-product-images').hasClass('slick-initialized')) {
    $('.qv-product-images').slick('destroy');
  }      
}

function addItemToCartQuickView (variant_id, quantity) {
  var data = {
    "quantity": quantity,
    "id": variant_id,
  }
  jQuery.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function() {       
      $.getJSON('/cart.json', function(cart) {
        var total_count = cart.item_count;
        $('body').addClass('cart-has-items');
        $('.cart-link .cart-link__bubble').addClass('cart-link__bubble--visible');
        $('.cart-link .cart-link__bubble').find('.cart-link__bubble-num').text(total_count)             
      });

      $('.item_added').css("color","green").fadeIn("fast");            
      $(".cart-link__bubble .cart-link__bubble-num").trigger('click'); 
      
       var is_cart_trigger = 'false';
      cartUpdateJs(is_cart_trigger);
      
    }
  });
}

 