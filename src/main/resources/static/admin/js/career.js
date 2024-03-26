var token = localStorage.getItem("token");
async function loadCareer() {
    $('#example').DataTable().destroy();
    var url = 'http://localhost:8080/api/career/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td>${list[i].name}</td>
                    <td class="sticky-col">
                        <i onclick="deleteCareer(${list[i].id})" class="fa fa-trash iconaction"></i>
                        <a onclick="loadACareer(${list[i].id})" data-bs-toggle="modal" data-bs-target="#addnganhnghe"><i class="fa fa-edit iconaction"></i></a>
                    </td>
                </tr>`
    }
    document.getElementById("listcareer").innerHTML = main;
    $('#example').DataTable();
}

function clearInput(){
    document.getElementById("idcareer").value = ''
    document.getElementById("name").value = ''
}

async function loadACareer(id) {
    var url = 'http://localhost:8080/api/career/public/findById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var obj = await response.json();
    document.getElementById("idcareer").value = obj.id
    document.getElementById("name").value = obj.name
}


async function saveCareer() {
    var idcareer = document.getElementById("idcareer").value
    var name = document.getElementById("name").value

    var url = 'http://localhost:8080/api/career/admin/create-or-update';
    var career = {
        "id": idcareer,
        "name": name
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(career)
    });
    if (response.status < 300) {
        toastr.success("Thành công!");
        loadCareer();
        $("#addnganhnghe").modal('hide');
        clearInput();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

async function deleteCareer(id) {
    var con = confirm("Bạn chắc chắn muốn xóa ngành nghề này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/career/admin/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa ngành nghề thành công!");
        loadCareer();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

