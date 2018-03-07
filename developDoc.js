//接口相关：(初步文档，后续修订)
//code规定： 0 成功 - 1 失败   message: ”成功” || “失败”||” other message” 所有接口必须带上  后面接口省略

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
// 获取所有
url: GET .../funnys/rest / story / getStory
Postdata:
{
    condition: "atleast" || "hot" || "all",
        storyId: 0 || num //0的时候返回所有第一层的故事，当num不为0的时候，返回storyId 为num的故事以及他的子故事
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
                                    parentId: 0
        },
        list: [
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 88,
                parentId: 45
            },
            {
                storyName: '安河桥的故事',
                hot: 4396,
                introduction: '从南到北...',
                author: 'lijiaxin',
                publicTime: '2018.3.7',
                storyId: 89,
                parentId: 45,
            }
        ]
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
                        parentId: 0,//所有为0的代表最初发布的故事
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
        storyId: 45
}
Resdata:
{
    code
    message
}

//后续有需求再加


//音乐
//获取用户个人音乐信息
url: GET: .../funnys/rest / music / subcount
