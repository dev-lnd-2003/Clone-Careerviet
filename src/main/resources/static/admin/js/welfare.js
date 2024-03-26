var token = localStorage.getItem("token");
async function loadWelfare() {
    $('#example').DataTable().destroy();
    var url = 'http://localhost:8080/api/welfare/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td>${list[i].name}</td>
                    <td><i class="${list[i].icon}"></i></td>
                    <td class="sticky-col">
                        <i onclick="deleteWelfare(${list[i].id})" class="fa fa-trash iconaction"></i>
                        <a onclick="loadAWelfare(${list[i].id})" data-bs-toggle="modal" data-bs-target="#addnganhnghe"><i class="fa fa-edit iconaction"></i></a>
                    </td>
                </tr>`
    }
    document.getElementById("listsa").innerHTML = main;
    $('#example').DataTable();
}

function clearInput(){
    document.getElementById("idsa").value = ''
    document.getElementById("name").value = ''
    document.getElementById("icon").value = ''
}

async function loadAWelfare(id) {
    var url = 'http://localhost:8080/api/welfare/public/findById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var obj = await response.json();
    document.getElementById("idsa").value = obj.id
    document.getElementById("name").value = obj.name
    document.getElementById("icon").value = obj.icon
}


async function saveWelfare() {
    var idsa = document.getElementById("idsa").value
    var name = document.getElementById("name").value
    var icon = document.getElementById("icon").value

    var url = 'http://localhost:8080/api/welfare/admin/create-or-update';
    var welfare = {
        "id": idsa,
        "name": name,
        "icon": icon
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(welfare)
    });
    if (response.status < 300) {
        toastr.success("Thành công!");
        loadWelfare();
        $("#addnganhnghe").modal('hide');
        clearInput();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

async function deleteWelfare(id) {
    var con = confirm("Bạn chắc chắn muốn xóa phúc lợi này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/welfare/admin/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa thành công!");
        loadWelfare();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

