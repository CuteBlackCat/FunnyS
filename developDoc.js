//接口相关：(初步文档，后续修订)
//code规定： 0 成功 - 1 失败   message: ”成功” || “失败”||” other message” 所有接口必须带上  后面接口省略
//时间一律给时间戳，为了方便阅读所以写2018.3.8

//访问地址http://47.52.238.90:4396/funnys

Login接口：
Url: POST http://47.52.238.90:4397/funnys/v1/login
Postdata:
{
    “username”: “wuxh”,
    “password”: “wuxh”
}
ResData:
{
    code: 0,
        message: ”成功”,
    data: {
        token: ‘一个随机序列’//判断是否登录
        userName: “wuxh”,
        userId: 38,
        userPhoto: 'imgs'
    }
}

//注册中不允许userName相同
register接口
Url: POST  .../funnys/v1 / register
Postdata:
{
    userName: "李嘉欣",
    password: "ling",
    userPhoto: 'imgs'
}
ResData:
{
    code
    message
}

// 除login和register借口不需要带token，其余header都要带token
//可能游戏不同会有不同的分类，不只是排名
游戏接口
url: GET .../funnys/rest / game / getUserRank
Postdata:
{
    gameName: 'Jump a jump',
    gameId: 1,
    userName: 'lijiaxin',
    userId: 1
}
ResData:
{
    code: 0,
    message: '成功',
    data: {
        maxCore: '4396',
        rank: 1
    }
}

聊天接口(待定)


故事接龙
//获取话题最热故事
url: GET .../funnys/rest/story/getHotTitle//
Postdata:
{
    num: 8 || 'all'//返回8条故事title||全部
}
Resdata:
{
    code: 0,
    message: 'success',
    data: {
        list:[
            {
                typeName: '笑话',
                typeId: 1
            },
            {
                typeName: '悲伤的故事',
                typeId: 2
            },
        ]
    }
}
//按title查询数据
url: GET .../funnys/rest/story/getTitleStory
Postdata:
{
    typeId: 1,
    condition: 'hot' || 'atleast',
    page:1,
    pageSize:10
}
{
    code:0,
    message:'success',
    data:{
        total:30,
        list: [
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 88,
                parentId: 0,
                typeId: 2
            },
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 89,
                parentId: 0,
                typeId: 2
            }
        ]
    }
}
// 获取所有
url: GET .../funnys/rest/story/getAllStory//只选取parentID为0的数据，每项只返回前10条
Postdata:
{
   
}
ResData:
{
    code: 0,
    message: 'chenggong',
    data: {
        hot: [
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 88,
                parentId: 0,
                typeId: 2
            },
        ],
        collection: [
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 88,
                parentId: 0,
                typeId: 2
            },
        ],
        atleast: [
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 88,
                parentId: 0,
                typeId: 2
            }
        ],
        comment: [
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 88,
                parentId: 0,
                typeId: 2
            }
        ]
    }
}

//获取特定故事
url: GET .../funnys/rest / story / getStory
Postdata:
{
    storyId: 45

}
ResData:
{
    code: 0,
    message: 'chenggong',
    data: {
        currentStory: {//当查询的storyId为0的时候，此字段为空，直接返回list
            storyName: '安河桥的故事',
            hot: 4396,
            introduction: '从南到北...',
            author: 'lijiaxin',
            publicTime: '2018.3.7',
            storyId: 45,
            parentId: 0,
            typeId: 2
        },
        list: [
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 88,
                parentId: 45,
                typeId: 2
            },
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 89,
                parentId: 45,
                typeId: 2
            }
        ]
    }
    }
}

//发布故事
url: GET .../funnys/rest / story / publicStory
Postdata:
{
    userName: 'lijiaxin',
    publicTime: '2018.3.7',
    storyName: '安河桥的故事',
    introduction: '从南到北...',
    content: '让我在卡你一眼，从南到北...',
    parentId: 0,//所有为0的代表最初发布的故事，
    typeId: 2//故事类型
}
ResData:
{
    code: 0,
    message:...
}

//点赞
url: GET: .../funnys/rest / story / playCall
Postdata:
{
    userName: 'xiaom',
    storyId: 45,
    playCall: true || false //点赞|取消点赞
}
Resdata:
{
    code
    message
}

//收藏故事
url: GET: .../funnys/rest / story / collection
Postdata:
{
    userName: 'xiaom',
    storyId: 45,
    collection: true || false //收藏|取消
}
Resdata:
{
    code
    message
}


//后续有需求再加


//音乐
//获取热门歌手
url: GET: .../funnys/rest / music / getHotSinger
Postdata:
{
    num:10
}
ResData:
{
    code:0,
    message:'success',
    data:{
        list:[
            {
                name: '胡歌',
                singerId: '10',
                hot:10230123,
                picUrl:'imgs'
            },
            {
                name: '赵雷',
                singerId:'100',
                hot:21312313,
                picUrl: 'imgs'
            }
        ]
    }
}
//获取歌手的所有歌曲
url: GET: .../funnys/rest / music / getSingerMusic
Postdata:
{
    singerId:10,
    page:1,
    pageSize:10
}
ResData:
{
    code:0,
    message:'success',
    data:{
        songs:[
            {
                songName:'成都',
                songId:1231,
                artists:[
                    {
                        singerName:"赵雷",
                        singerId:1231313,
                        picUrl:'imgs',
                        collection:true
                    }
                ]
            },
            {
                songName:'广东爱情故事',
                songId:90923,
                artists:[
                    {
                        singerName:'广东雨神',
                        singerId:478123,
                        picUrl:'imgs',
                        collection:false
                    }
                ]
            }
        ],
    }
}

//获取分类音乐
//说明
{
    0:todayMusic,//每日推荐，最多50首
    1:rankMusic,//排行榜 最多500首，以下类推
    2:atleastMusic,//最新音乐，
    3:hotMusic,//最热音乐
    4:soarMusic,//飙升音乐 
    5:loveMusic,//我最爱的音乐,
}
url: GET: .../funnys/rest / music / getMusic
Postdata:{
    searchType: 0,//每日推荐
    userName: 'lijiaxin'
}
ResData:
{
    code:0,
    message:'success',
    data:{
        songs:[
            {
                songName:'成都',
                songId:1231,
                artists:[
                    {
                        singerName:"赵雷",
                        singerId:1231313,
                        picUrl:'imgs',
                        collection:true,//代表是否收藏到我最爱的音乐中
                    }
                ]
            },
            {
                songName:'广东爱情故事',
                songId:90923,
                artists:[
                    {
                        singerName:'广东雨神',
                        singerId:478123,
                        picUrl:'imgs',
                        collection:false
                    }
                ]
            }
        ],
        // collectionNum: '98万',
        // commentNum: '99万',
        // collection: true || false暂时不要这3条，后续再说
    }
}

//收藏歌曲
url: GET: .../funnys/rest / music / collectionMusic
Postdata:
{
    songId:90923,
    userName:'lijiaxin',
    userId:90
}
ResData:
{
    code:0,
    message:'success'
}

//

//获取歌曲详情
url: GET: .../funnys/rest / music / getMusicDetail
Postdata:{
    songId:90923
}
Resdata:
{
    code:0,
    message:'success',
    data:{
        singerName:'广东雨神',
        songUrl: 'https://',
        songPicUrl: 'imgs',
        artists:[
            {
                singerName: '广东雨神',
                singerId: 478123,
                picUrl: 'imgs',
                collection: false
            }
        ]
    }
}

//获取歌词
url: GET: .../funnys/rest / music / getMusicLyric
Postdata:{
    songId:90923
}
Resdata:
{
    code:0,
    message:'success',
    data:{
        lyric:'...'
    }
}

//获取歌曲评论
url: GET: .../funnys/rest / music / getMusicComment
Postdata:
{
    songId: 90923,
    page: 1,
    pageSize:20
}
ResData:
{
    code:0,
    message:'success',
    data:{
        commentNum:9879,
        hotComment:[//10条
            {
                userName:'wuxh',
                content:'shide',
                userId:2,
                userPhoto: 'imgs',
                playCallNum: 9870,//点赞数
                play:false,//是否点赞
                commentTime:'2018.3.9',
                reply:{//回复,如果是回复别人就有，如果不是就没有
                    userName: 'lijiaxin',
                    content: 'wuxinghaoshiwoerzi',
                    userId: 2
                },
                commentId:90
            }
        ],
        atleastComment:[
            {
                userName: 'wuxh',
                content: 'wangbadan',
                userId: 2,
                userPhoto: 'imgs',
                playCallNum: 9870,//点赞数
                play: false,//是否点赞
                commentTime: '2018.3.9',
                reply:null,
                commentId: 90
            }
        ]
    }
}

//评论点赞
url: GET: .../funnys/rest / music / playCall
Postdata:
{
    songId: 90923,
    commentId: 90,
    content:'好的',
    userName:'lijaixin',
    userId:1,
    playCall:true||false //点赞||取消点赞
    time:'2017'
}
ResData:
{
    code:0,
    message:'success'
}

//评论歌曲
url: GET: .../funnys/rest / music / commentMusic
Postdata:
{
    songId: 90923,
    commentId: 90,
    content:'好的',
    userName:'lijaixin',
    userId:1,
    time:'2018.3.9'
}
ResData:
{
    code: 0,
    message: 'success'
}

//回复评论
url: GET: .../funnys/rest / music / commentReply
Postdata:
{
    songId:90923,
    commentId:90,
    content:'sda',
    userName:'lijiaxin'
    userId:1,
    time:'2018.3.9',
    replyId:20//代表回复commentId为20的评论
}
ResData:
{
    code: 0,
        message: 'success'
}


