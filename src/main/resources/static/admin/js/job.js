    var token = localStorage.getItem("token");
async function loadStatus() {
    var url = 'http://localhost:8080/api/job/public/get-all-status-job';
    const response = await fetch(url, {
    });
    var list = await response.json();
    var main = '<option value="-1">Tất cả</option>';
    var mains = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i]}">${list[i]}</option>`
        mains += `<option value="${list[i]}">${list[i]}</option>`
    }
    document.getElementById("statuslist").innerHTML = main;
    document.getElementById("statusupdate").innerHTML = mains;
}

async function loadAllJob() {
    $('#example').DataTable().destroy();
    var stt = document.getElementById("statuslist").value
    var from = document.getElementById("from").value
    var to = document.getElementById("to").value

    var url = 'http://localhost:8080/api/job/admin/all-job-by-admin?oke=2';
    if(stt != -1){
        url += '&stt='+stt;
    }
    if (from != null && to != null && from != '' && to != '') {
        url += '&from=' + from + '&to=' + to;
    }
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
        <td><a class="linkjob" target="_blank" href="../detail?id=${list[i].id}"><img src="${list[i].company.image}" class="anhphongqltin"></a></td>
        <td><a class="linkjob" target="_blank" href="../detail?id=${list[i].id}">${list[i].title}</a></td>
        <td>${list[i].company.name}</td>
        <td>${list[i].addressDetail},${list[i].districts.name},${list[i].districts.province.name}</td>
        <td>${list[i].salary.name}</td>
        <td>${list[i].createdDate}</td>
        <td>${list[i].jobStatus}</td>
        <td onclick="setIdJob(${list[i].id},'${list[i].jobStatus}')" class="sticky-col" data-bs-toggle="modal" data-bs-target="#updatestt" style=" cursor: pointer;">
            <i class="fa fa-edit iconaction"></i>
        </td>
    </tr>`
    }
    document.getElementById("listjob").innerHTML = main;
    $('#example').DataTable();
}

function setIdJob(id,stt){
    document.getElementById("idjob").value = id
    document.getElementById("statusupdate").value = stt
}


async function updateStatus() {
    var id = document.getElementById("idjob").value
    var stt = document.getElementById("statusupdate").value
    var url = 'http://localhost:8080/api/job/admin/update-status?id=' + id+'&stt='+stt;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo",
            text: "Thành công",
            type: "success"
        },
        function() {
            loadAllJob();
            $("#updatestt").modal("hide");
        });
    } else {
        swal({
            title: "Thông báo",
            text: "hành động thất bại",
            type: "error"
        },
        function() {
        });
    }
}