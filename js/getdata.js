/*
 * @Author: hupooW 
 * @Date: 2018-03-21 14:39:23 
 * @Last Modified by: hupooW
 * @Last Modified time: 2018-03-21 19:39:35
 */
    config = {

         'LOCALHOST' :'http://192.168.0.113:8080',
         'IMGURL'    : "http://image.mianle.me"
    }

    function A(ret) {
        console.log(ret)
    }

MLM = {

    /**
     * 
     * 广告数据获取
     * @param {json} jsonObj 
     * @param {string} adPosition  ？？？
     * @param {string} adposName 广告位名称
     */
    //     jsonObj = {
    //      'adPosition':'text',
    //     'adposName':'text' 
    adData: function (jsonObj) {
        var res = null;
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'post',
                url: config.LOCALHOST + '/wxshop/adposition_imgs_do_list',
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(obj),
                success: function (ret) {
                    resolve(ret);
                },
                 error: function () {
                     reject();
                }
            })
        }).then(function (value) {
            res = value;
            return res;
        });
        
        // $.ajax({
        //     type: 'post',
        //     url: config.LOCALHOST + '/wxshop/adposition_imgs_do_list',
        //     dataType: "json",
        //     contentType: "application/json;charset=utf-8",
        //     data: JSON.stringify(obj),
        //     success:function (ret){
        //         A(ret);
        //         // error: function (jqXHR, textStatus, errorThrown) {
        //         //     console.log(jqXHR.responseText);
        //         //     console.log(jqXHR.status);
        //         //     console.log(jqXHR.readyState);
        //         //     console.log(jqXHR.statusText);
        //         // }
        //     }
        // })
        
        
    },

   
   /**
   * 
   * 商品评论数据获取
   * @param {json} jsonObj json 对象
   * @param {int} pageNum  当前页数
   * @param {int} pageSize 每页显示记录数
   * @param {int} queryMain  首页展示分类
   * @param {int} query2  所有二级分类
   */
  // jsonObj = { 
  // 'pageNum': 1,
  //  'pageSize': 10, 
  //  'queryMain': 1,
  //   'query2': 0 
  // }
    goodsClassifyData: function (jsonObj) {
        $.ajax({
            type: 'post',
            url: config.LOCALHOST + '/wxshop/goods_category_do_page',
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json;charset=utf-8",
            success: function (ret) {
                console.log(ret)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                console.log(jqXHR.status);
                console.log(jqXHR.readyState);
                console.log(jqXHR.statusText);
            }
        })
    },
    /**
     * 
     * 商品列表
     * @param {any} jsonObj 
     * @param {int} pageNum 页码
     * @param {int} pageSize 每页数据大小
     * @param {int} categoryId 分类ID
     */
    // jsonObj = { 
  // pageNum: 1,
  //  pageSize: 10, 
  //  categoryId: 1,
  // }
    goodsListData: function (jsonObj) {
    $.ajax({
        type: 'get',
        url: config.LOCALHOST +'/wxshop/get_goods_list_by_category',
        dataType: "json",
        data: jsonObj,
        contentType: "application/json;charset=utf-8",
        success: function (ret) {
            console.log(ret)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(jqXHR.status);
            console.log(jqXHR.readyState);
            console.log(jqXHR.statusText);
        }
    })
},
    /**
     * 
     *  商品详情数据
     * @param {int} Id  商品id 
     */
    goodsDetailData: function(Id) {
    $.ajax({
        type: 'get',
        url: config.LOCALHOST+'/wxshop/get_goods_detail_info?goodsId='+Id,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function (ret) {
            console.log(ret)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(jqXHR.status);
            console.log(jqXHR.readyState);
            console.log(jqXHR.statusText);
        }
    })
    }, 
  /**
   * 
   * 商品评论数据获取
   * @param {jdon} jsonObj json 对象
   * @param {int} pageNum  当前页码
   * @param {int} pageSize 请求数据数
   * @param {int} goodsId  商品Id
   * @param {int} commentType  评论类型  好评 中评 差评 
   */
    // jsonObj = { 
        // pageNum: 1,
        //  pageSize: 10, 
        //  goodsId: 1,
        //  commentType: 1,
        // }
  goodsCommentsData: function (jsonObj) {
    $.ajax({
        type: 'get',
        url: config.LOCALHOST+'/wxshop/get_comments',
        dataType: "json",
        data: jsonObj,
        contentType: "application/json;charset=utf-8",
        success: function (ret) {
            console.log(ret)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(jqXHR.status);
            console.log(jqXHR.readyState);
            console.log(jqXHR.statusText);
        }
    })
}
};
