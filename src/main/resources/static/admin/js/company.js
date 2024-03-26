var token = localStorage.getItem("token");
async function loadAllCompany() {
    $('#example').DataTable().destroy();
    var url = 'http://localhost:8080/api/company/admin/all-company';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        }),
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += ` <tr>
                    <td>${list[i].id}</td>
                    <td><img src="${list[i].image}" style="width: 100px;"></td>
                    <td>${list[i].name}</td>
                    <td>${list[i].phone}</td>
                    <td>${list[i].address}</td>
                    <td>${list[i].typeOfActivity}</td>
                    <td><a target="_blank" href="${list[i].website}">${list[i].website}</a></td>
                    <td>${list[i].user.createdDate}</td>
                    <td class="sticky-col">
                    </td>
                </tr>`
    }
    document.getElementById("listCompany").innerHTML = main
    $('#example').DataTable();
}