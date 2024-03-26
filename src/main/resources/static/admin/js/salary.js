var token = localStorage.getItem("token");
async function loadSalary() {
    $('#example').DataTable().destroy();
    var url = 'http://localhost:8080/api/salary/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td>${list[i].name}</td>
                    <td>${formatmoney(list[i].minMoney)}</td>
                    <td class="sticky-col">
                        <i onclick="deleteSalary(${list[i].id})" class="fa fa-trash iconaction"></i>
                        <a onclick="loadASalary(${list[i].id})" data-bs-toggle="modal" data-bs-target="#addnganhnghe"><i class="fa fa-edit iconaction"></i></a>
                    </td>
                </tr>`
    }
    document.getElementById("listsa").innerHTML = main;
    $('#example').DataTable();
}

function clearInput(){
    document.getElementById("idsa").value = ''
    document.getElementById("name").value = ''
}

async function loadASalary(id) {
    var url = 'http://localhost:8080/api/salary/public/findById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var obj = await response.json();
    document.getElementById("idsa").value = obj.id
    document.getElementById("name").value = obj.name
    document.getElementById("minsalary").value = obj.minMoney
}


async function saveSalary() {
    var idsa = document.getElementById("idsa").value
    var name = document.getElementById("name").value
    var minsalary = document.getElementById("minsalary").value

    var url = 'http://localhost:8080/api/salary/admin/create-or-update';
    var salary = {
        "id": idsa,
        "name": name,
        "minMoney": minsalary
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(salary)
    });
    if (response.status < 300) {
        toastr.success("Thành công!");
        loadSalary();
        $("#addnganhnghe").modal('hide');
        clearInput();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

async function deleteSalary(id) {
    var con = confirm("Bạn chắc chắn muốn xóa mức lương này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/salary/admin/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa thành công!");
        loadSalary();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

