async function checkFavorite() {
    if(token == null){
        return;
    }
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var url = 'http://localhost:8080/api/jobfavorite/user/check-my-favorite?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var result = await response.text();
    if(result == 'false'){
        document.getElementById("luutin").innerHTML = `<i onclick="createFa()" class="fa fa-heart-o pointer addytdetail"></i>`
    }
    if(result == 'true'){
        document.getElementById("luutin").innerHTML = `<i onclick="createFa()" class="fa fa-heart heartgreen pointer addytdetail"></i>`
    }
}

async function createFa() {
    if(token == null){
        toastr.warning("Bạn chưa đăng nhập!");
        return;
    }
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var obj = {
        "job":{
            "id":id
        }
    }
    var url = 'http://localhost:8080/api/jobfavorite/user/create';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(obj)
    });
    if (response.status < 300) {
        toastr.success("Thêm yêu thích thành công");
        checkFavorite();
        loadNumFavoriteMenu();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

async function loadMyFavorite() {
    var url = 'http://localhost:8080/api/jobfavorite/user/my-favorite';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();

    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
        <td>${list[i].id}</td>
        <td class="floatr">${list[i].job.createdDate}</td>
        <td class="floatr"><a href="detail?id=${list[i].job.id}">${list[i].job.title}</a></td>
        <td>${list[i].job.addressDetail}, ${list[i].job.districts.name}, ${list[i].job.districts.province.name}</td>
        <td><span class="span_pending">${list[i].job.salary.name}</span></td>
        <td><i onclick="deleteFav(${list[i].id})" class="fa fa-trash-o huydon"></i></td>
    </tr>`
    }
    document.getElementById("listFav").innerHTML = main
}


async function deleteFav(id) {
    var con = confirm("Xác nhận xóa yêu thích?")
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/jobfavorite/user/delete-my-favorite?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "xóa thành công!",
                type: "success"
            },
            function() {
                loadMyFavorite();
                loadNumFavoriteMenu();
            });
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}