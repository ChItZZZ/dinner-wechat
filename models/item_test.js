var iG = {
    items: {
        "面类": [{id: "1", name: "咸肉面", cls: "肉品", price: "15", sels: "45", imageUrl: "images/1.jpg"},
            {id: "2", name: "牛肉面", cls: "肉品", price: "23", sels: "75", imageUrl: "images/2.jpg"},
            {id: "3", name: "牛杂面", cls: "肉品", price: "45", sels: "36", imageUrl: "images/3.jpg"},
            {id: "4", name: "素面", cls: "肉品", price: "85", sels: "26", imageUrl: "images/4.jpg"}
        ],
        "蔬菜": [{id: "13", name: "飘菜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/13.jpg"},
            {id: "14", name: "苦瓜", cls: "蔬菜", price: "154", sels: "524", imageUrl: "images/14.jpg"},
            {id: "16", name: "黄瓜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/16.jpg"},
            {id: "17", name: "黄豆", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/17.jpg"},
            {id: "18", name: "白苦瓜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/18.jpg"},
        ],
        "糕点": [{id: "24", name: "糕点", cls: "糕点", price: "152", sels: "12", imageUrl: "images/24.jpg"},
            {id: "25", name: "糕点", cls: "糕点", price: "154", sels: "16", imageUrl: "images/25.jpg"},
            {id: "26", name: "糕点", cls: "糕点", price: "151", sels: "18", imageUrl: "images/26.jpg"},
            {id: "27", name: "糕点", cls: "糕点", price: "152", sels: "19", imageUrl: "images/27.jpg"},
        ],
    }
}

var list = [];

exports.showlist = function (req,res,next){
    var data = req.body;
    list.push(data.name);
    console.log(list);
    res.end();
}

//module.exports = iG;
