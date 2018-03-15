/*
 * @Author: hupooW 
 * @Date: 2018-03-12 15:24:19 
 * @Last Modified by: hupooW
 * @Last Modified time: 2018-03-14 10:23:25
 */





Utils = {
    setParam: function (name, value) {  //存储数据
        localStorage.setItem(name, value)
    },
    getParam: function (name) {  //获取数据
        return localStorage.getItem(name)
    }
};


// 商品属性 
/* 
name : 名称
pro_id:商品id
img: 图片
num:数量
shop_id: 所属店铺Id,
price:价格
*/

// product = {
//     shop_id: '',
//     pro_detail: [{
//         name: '',
//         pro_id: '',
//         img: '',
//         num: 0,
//         price: 0.00,
//     }]
// };


// shoppingCart = [
//     {
//         'shop_id': '01',
//         'name': product.name,
//         'pro_id': product.pro_id,
//         'img': product.img,
//         'price': product.price

//     },
//     {
//         'shop_id': '01',
//         'name': product.name,
//         'pro_id': product.pro_id,
//         'img': product.img,
//         'price': product.price
//     }

// ]

cart = {
    addProduct: function (product) {
        // 查询数据
        var shoppingCart = Utils.getParam('shoppingCart');
        if (shoppingCart == null || shoppingCart == '') {
            var newproduct = {
                'shop_id': product.shop_id,
                'pro_id': product.pro_id,
                'name': product.name,
                'img': product.img,
                'price': product.price,
                'num': parseInt(product.num)
            };
            Utils.setParam('shoppingCart', '=[' + JSON.stringify(newproduct)+']');
        } else {
            //JSON.parse(ShoppingCart.substr(1, ShoppingCart.length))//对json数据的解释    将字符串变成json对象
            var productList = JSON.parse(shoppingCart.substr(1, shoppingCart.length));
            //查找购物车中是否有该商品  
            var res ;
                for (let i in productList) {
                    if (productList[i].pro_id == product.pro_id && productList[i].shop_id == product.shop_id){
                        productList[i].num = parseInt(productList[i].num) + parseInt(product.num);
                        res = true;
                        break;
                    }else{
                        res = false;
                    }
                    if (!res) {
                // 如果商品的id不存在 添加商品
                    productList.push({
                        'shop_id': product.shop_id,
                        'pro_id': product.pro_id,
                        'name': product.name,
                        'img': product.img,
                        'price': product.price,
                        'num': product.num
                    });
                    }
                }
                Utils.setParam('shoppingCart',  '='+ JSON.stringify(productList)  );
        }
    },
    // 修改商品数量
    updateProductNum: function (proId, num) {
        var shoppingCart = Utils.getParam('shoppingCart');
        var productList = JSON.parse(shoppingCart.substr(1, shoppingCart.length));
        for (let i in productList) {
            if (productList[i].pro_id == proId   ) {
                productList[i].num = parseInt(productList[i].num) + parseInt(num);
                break;
            }
            else{
                return false;
            }
        }
        Utils.setParam('shoppingCart', '=' + JSON.stringify(productList));
    },
    getProductList: function () {
        var shoppingCart = Utils.getParam('shoppingCart');
        if (shoppingCart !== null && shoppingCart !== '') {
            var productList = JSON.parse(shoppingCart.substr(1, shoppingCart.length));
            return productList;
        }
        else {
            return false;
        }
    },
    deleteProduct: function (pro_id) {
        var shoppingCart = Utils.getParam('shoppingCart');
        var productList = JSON.parse(shoppingCart.substr(1,shoppingCart.length));
        var list = [];
        for (const i in productList) {
            if (productList[i].pro_id !== pro_id) {
                list.push(productList[i]);
            }
        }
        Utils.setParam('shoppingCart', '=' + JSON.stringify(list));
    },
    removeCart: function () {
        localStorage.removeItem("shoppingCart");
        //删除变量名为key的存储变量 
    }

}

