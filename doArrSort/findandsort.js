function sortId(list) {
    var newList = [];
    list.forEach(function (data) {
        for (var i = 0; i < newList.length; i++) {
            if (newList[i].brandId === data.brandId) {
                newList[i].num++;
                return;
            }
        }
        newList.push({
            brandId: data.brandId,
            num: 1,
        });
    });
    console.log(newList);
}
sortId(list)
