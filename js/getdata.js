/*
 * @Author: hupooW 
 * @Date: 2018-03-21 14:39:23 
 * @Last Modified by: hupooW
 * @Last Modified time: 2018-03-22 18:50:35
 */
    config = {

         'LOCALHOST' :'http://192.168.0.113:8080',
         'IMGURL'    : "http://image.mianle.me/"
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
    adData: function (jsonObj,callback) {
            $.ajax({
                type: 'post',
                url: config.LOCALHOST + '/wxshop/adposition_imgs_do_list',
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(obj),
                success: function (ret) {
                    callback(ret);
                },
                 error: function (xhr) {
                     console.log(xhr.responseText);
                }
            });
        
        
      
        
        
    },

   
   /**
   * 
   * 商品分类数据获取
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
    goodsClassifyData: function (jsonObj,callback) {
        $.ajax({
            type: 'post',
            url: config.LOCALHOST + '/wxshop/goods_category_do_page',
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json;charset=utf-8",
            success: function (ret) {
                callback(ret);
            },
            error: function (xhr) {
                console.log(xhr.responseText);
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
    goodsListData: function (jsonObj,callback) {
    $.ajax({
        type: 'get',
        url: config.LOCALHOST +'/wxshop/get_goods_list_by_category',
        dataType: "json",
        data: jsonObj,
        contentType: "application/json;charset=utf-8",
        success: function (ret) {
            callback(ret)
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    })
},
    /**
     * 
     *  商品详情数据
     * @param {int} Id  商品id 
     */
    goodsDetailData: function (Id, callback) {
    $.ajax({
        type: 'get',
        url: config.LOCALHOST+'/wxshop/get_goods_detail_info?goodsId='+Id,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function (ret) {
            callback(ret)
        },
        error: function (xhr) {
            console.log(xhr.responseText);
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
    goodsCommentsData: function (jsonObj, callback) {
    $.ajax({
        type: 'get',
        url: config.LOCALHOST+'/wxshop/get_comments',
        dataType: "json",
        data: jsonObj,
        contentType: "application/json;charset=utf-8",
        success: function (ret) {
            callback(ret)
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    })
},/**
 * 
 * 
 * @param {any} jsonObj 
 * @param {any} callback 
 */
//     id	int	UserAddress	编辑操作必填，新增操作不填
// userId	int	UserAddress	用户ID  必填
// useraddrName	String	UserAddress	收货人名字 必填
// useraddrEmail	String	UserAddress	收货人邮件 非必填
// useraddrCountry	int	UserAddress	国家ID  必填
// useraddrProvince	int	UserAddress	省ID   必填
// useraddrCity	int	UserAddress	市ID  必填
// useraddrDistrict	int	UserAddress	区ID   必填
// useraddrAddress	String	UserAddress	详细地址 必填[传值内容：省 市 区 详细地址]中间用空格隔开
// useraddrSignBuilding	String	UserAddress	标志性建筑 非必填
// useraddrZipcode	String	UserAddress	邮编 必填
// useraddrMobile	String	UserAddress	手机 必填
// useraddrTel	String	UserAddress	固定电话 非必填
/**
 * 
 * 获取地址列表
 * @param {int} Id 用户id 
 * @param {any} callback 回调函数
 */
getAddressList: function (Id, callback) {
    $.ajax({
        type: 'get',
        url: config.LOCALHOST + '/wxshop/get_user_address_list_by_user?userId=' + Id,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (ret) {
            callback(ret);
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    })
},

//     UserAddress	Object		
// id	int	UserAddress	编辑操作必填，新增操作不填
// userId	int	UserAddress	用户ID  必填
// useraddrName	String	UserAddress	收货人名字 必填
// useraddrEmail	String	UserAddress	收货人邮件 非必填
// useraddrCountry	int	UserAddress	国家ID  必填
// useraddrProvince	int	UserAddress	省ID   必填
// useraddrCity	int	UserAddress	市ID  必填
// useraddrDistrict	int	UserAddress	区ID   必填
// useraddrAddress	String	UserAddress	详细地址 必填[传值内容：省 市 区 详细地址]中间用空格隔开
// useraddrSignBuilding	String	UserAddress	标志性建筑 非必填
// useraddrZipcode	String	UserAddress	邮编 必填
// useraddrMobile	String	UserAddress	手机 必填
// useraddrTel	String	UserAddress	固定电话 非必填
/**
 * 
 * 更新地址新增地址
 * @param {any} jsonObj 地址信息
 * @param {any} callback 
 */
updateAddress: function (jsonObj, callback) {
    
    $.ajax({
        type: 'post',
        url: config.LOCALHOST + '/wxshop/do_user_address',
        dataType: "json",
        data:jsonObj,
        contentType: "application/json;charset=utf-8",
        success: function (ret) {
            callback(ret);
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    })
},
/**
 * 
 * 设置默认地址
 * @param {int} Id 默认地址id 
 * @param {any} callback 
 */
setDefaultAddress: function (Id, callback) {

        $.ajax({
            type: 'post',
            url: config.LOCALHOST + '/wxshop/set_default',
            dataType: "json",
            data: JSON.stringify({'id':Id}),
            contentType: "application/json;charset=utf-8",
            success: function (ret) {
                callback(ret);
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        })
    },
/**
 * 
 * //文章列表
 * @param {any} jsonObj 
 * @param {any} callback 
 */
//     param	Map < String, Object> 是
// pageNum	Integer	param	当前页数
// pageSize	Integer	param	每页显示记录条数
// typeId	Integer	param	文章类型id
// isRecomment	Integer	param	推荐级别1.低 2.中 3.高
// title	String	Param	文章标题, 用于根据标题搜索文章

// jsonObj ={
//     pageNum:1,
//     pageSize:5,
//     typeId:1,
//     isRecomment:1,
//     title:''
// }
getArticleList: function (jsonObj, callback) {
        $.ajax({
            type: 'post',
            url: config.LOCALHOST +'/wxshop/article_info_do_page',
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json;charset=utf-8",
            success: function (ret) {
                callback(ret);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        })
    },
/**
 * 获取文章详情
 * 
 * @param {any} jsonObj 
 * @param {any} callback 
 */
    // articleInfo	ArticleInfo		是
// id	Integer	articleInfo	文章id
// obj={
//     articleInfo:'text',
//     id:01
// }
getArticleDetail: function (jsonObj, callback) {
        $.ajax({
            type: 'post',
            url: config.LOCALHOST + '/wxshop/article_info_get_by_id',
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json;charset=utf-8",
            success: function (ret) {
                callback(ret);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        })
    },
login: function (jsonObj, callback) {
        $.ajax({
            type: 'post',
            url: config.LOCALHOST + '/wxshop/user_login',
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json;charset=utf-8",
            success: function (ret) {
                callback(ret);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        })
    },

getCode: function (jsonObj, callback) {
    
        $.ajax({
            type: 'post',
            url: config.LOCALHOST + '/wxshop/get_sms_code',
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json;charset=utf-8",
            success: function (ret) {
                callback(ret);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        })
    },
/**
 * 物流查询
 * 
 * @param {any} jsonObj 
 * @param {any} callback 
 */
getExpress: function (jsonObj, callback) {
    
        $.ajax({
            type: 'post',
            url: config.LOCALHOST + '/wxshop_uc/get_logistic_info',
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json;charset=utf-8",
            success: function (ret) {
                callback(ret);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        })
    },
};
