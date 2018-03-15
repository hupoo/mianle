/*
 * @Author: hupooW 
 * @Date: 2018-03-09 09:44:49 
 * @Last Modified by: hupooW
 * @Last Modified time: 2018-03-14 10:32:16
 */


// 购物车操作

$(function(){


var $checkbox = $("input[name='checkbox']");        //所有复选框
var $lists = $('.lists');                        // 店铺盒子
var $shopCheck = $('.shop_check');                   // 店铺的 checkbox
var $sonCheck = $('.son_check');                    // 店铺下的商品 checkbox
var $totalAllCheck = $("#total_all_check");                //结算全选
var $opertateAllCheck = $("#operate_all_check");              //操作全选


// 初始化全选中
    var len = $('.m-cell.lists').length;
    if (len != 0) {
        $checkbox.prop('checked', true);
        totalMoney()
    }else{
        $totalAllCheck.prop('checked', false);
        
    }
// ============================ 结算全选===================
$totalAllCheck.click(function () {
    if ($(this).is(':checked'))
        $checkbox.prop('checked', true);
    else $checkbox.prop('checked', false);
    totalMoney()
})

// ============================ 操作全选===================

$opertateAllCheck.click(function () {
    if ($(this).is(':checked'))
        $checkbox.prop('checked', true);
    else $checkbox.prop('checked', false);
    totalMoney()

})



//   商品选择与全选关系

$sonCheck.each(function () {
    $sonCheck.click(function () {
        var len = $sonCheck.length;
        var num = 0;
        $sonCheck.each(function () {
            if ($(this).is(":checked")) {
                num++;
            }
        });
        if (len == num) {
            $totalAllCheck.prop('checked', true);
            $opertateAllCheck.prop('checked', true);
        } else {
            $totalAllCheck.prop('checked', false);
            $opertateAllCheck.prop('checked', false);
        }
        totalMoney()
    })

});

//====================店铺选择与旗下商品和全选的==============

$shopCheck.each(function () {
    $(this).click(function () {
        if ($(this).is(':checked')) {
            var len = $shopCheck.length;
            var num = 0;
            $shopCheck.each(function () {
                if ($(this).is(':checked')) {
                    num++;
                }
            });
            if (len == num) {
                $totalAllCheck.prop('checked', true);
                $opertateAllCheck.prop('checked', true);

            }
            //店铺下的checkbox选中状态
            $(this).parents('.lists').find('.son_check').prop("checked", true);
        } else {
            //否则，全局全选按钮取消对勾
            $totalAllCheck.prop('checked', false);
            $opertateAllCheck.prop('checked', true);

            //店铺下的checkbox选中状态

            $(this).parents('.lists').find('.son_check').prop("checked", false);
        };
        totalMoney()
    })
})

//====================店铺选择与旗下商品和全选的==============
$lists.each(function () {
    var $this = $(this);
    var $sonChecks = $this.find('.son_check');
    $sonChecks.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                var len = $sonChecks.length;
                var num = 0;
                $sonChecks.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                    if (num == len) {
                        $this.find('.shop_check').prop('checked', true);
                    }
                });
            }
            else {
                $this.find('.shop_check').prop('checked', false);

            }
        })
    })
})

// =======================数量关系=========================
// var $J_Del = $('.J_Del'),  //减
//     $J_Input = $('.J_Input'), //值
//     $J_Add = $('.J_Add');   //加

$('body .m-spinner').spinner({
    input: '.J_Input',
    add: '.J_Add',
    minus: '.J_Del',
    unit: function () {
        return 1;
    },
    max: function () {
        return 10;
    },
    callback: function (value, $ele) {
        // $ele 当前文本框[jQuery对象]
        var $priceTotalObj = $ele.parents('.count').find('.price_total'),
            $price = $ele.parents('.count').find('.price').text(),
            $priceTotal = value * parseFloat($price);
            $priceTotalObj.val($priceTotal.toFixed(1));
        var pro_id = $ele.parents('.m-list').attr('data-pro-id');
        cart.updateProductNum(pro_id, parseInt(value));
        totalMoney()
    }
});
// $J_Add.click(function (){
//         var $inputVal = $(this).prev('input'),
//             $count = parseInt($inputVal.val())+1,
//             $priceTotalObj = $(this).parents('.count').find('.price_total'),  //input
//             $price = $(this).parents('.count').find('.price').text(),
//             $priceTotal = $count*parseInt($price);
//     $inputVal.val($count);    
//     $priceTotalObj.val($priceTotal);  
//     console.log($priceTotalObj.val($priceTotal) )
// })

// $J_Del.click(function(){
//         var $inputVal = $(this).next('input'),
//             $count = parseInt($inputVal.val())-1,
//             $priceTotalObj = $(this).parents('.count').find('.price_total'),  //input
//             $price = $(this).parents('.count').find('.price').text(),
//             $priceTotal = $count*parseInt($price);
//     $inputVal.val($count);    
//     $priceTotalObj.val($priceTotal);  
// })

//======================================总计==========================================

function totalMoney() {
    var total_money = 0;
    $('.son_check').each(function () {
        if ($(this).is(':checked')) {
            var goods = parseFloat($(this).parents('.list-item-wrap').find('.price_total').val());
            total_money += goods;
        }
    });
    $('.realcash').html('&yen;' + total_money.toFixed(1));
}

//  开关
$('#J_edit').click(function () {
    $(this).addClass('hidden').siblings('#done').removeClass('hidden');
    $('#J_checkAll').removeClass('hidden').siblings('#J_total').addClass('hidden');
    $checkbox.prop('checked', false)
    totalMoney()

    //  逻辑操作
    // dosomething...
});
//  完成
$('#done').click(function () {
    $(this).addClass('hidden').siblings('#J_edit').removeClass('hidden');
    $('#J_total').removeClass('hidden').siblings('#J_checkAll').addClass('hidden');
    $checkbox.prop('checked', false)
    totalMoney()

    //  逻辑操作
    // dosomething...
});


// ======================= 删除 ===================

$('.btn-del').click(function () {
    var dialog = window.YDUI.dialog;
    var num = $(".son_check:checked").length;   //选中的
    var len = $sonCheck.length;
    if (num == 0) {
        dialog.toast('请选择要删除的订单', 'none', 1000);
        return;
    } else if (num == len) {
        dialog.confirm('', '确定清空购物车？', function () {
            $('.g-scrollview').html('<a href="#" rel="external nofollow" >购物车为空<br>点击去购买</a>')
            totalMoney()
            // 清除缓存
            cart.removeCart();
            $checkbox.prop('checked', false);
            return;
        });
    } else {
        dialog.confirm('', '是否删除当前订单', [
            {
                txt: '取消',
                color: '#000', /* false:黑色  true:绿色 或 使用颜色值 */
                callback: function () { }
            },
            {
                txt: '确定',
                color: '#fff',
                callback: function () {
                    $sonCheck.each(function () {
                        if ($(this).is(':checked')) {
                            if ($(this).parents('.lists').find('.shop_check').is(":checked")) {
                                $(this).parents('.lists').remove();
                            } else {
                                var n = $(this).parents('.m-list').index();
                                $('.g-scrollview').find(".m-list:eq(" + n + ")").remove();
                            }
                        }
                    });
                    totalMoney()

                }
            }
        ]);



    }



});
})


