function loadNameInit(){
    var user = localStorage.getItem('user');
    if(user == null){
        window.location.href = 'login';
    }
    user = JSON.parse(user);
    document.getElementById("emailapp").value = user.email;
    document.getElementById("phoneapp").value = user.phone;
    document.getElementById("fullnameapp").value = user.fullname;
}

async function createJobApp() {
    document.getElementById("loading").style.display = 'block'
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");

    var url = 'http://localhost:8080/api/jobapplication/user/create';

    var titleapp = document.getElementById("titleapp").value
    var fullnameapp = document.getElementById("fullnameapp").value
    var phoneapp = document.getElementById("phoneapp").value
    var emailapp = document.getElementById("emailapp").value
    var linkFile = ''
    const filePath = document.getElementById('filecv')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/public/upload-file';
    const res = await fetch(urlUpload, {
        method: 'POST',
        body: formData
    });
    if (res.status < 300) {
        linkFile = await res.text();
    }
    if(linkFile ==''){
        toastr.error("Bạn chưa chọn file cv");
        return;
    }
    var application = {
        "title": titleapp,
        "fullname": fullnameapp,
        "phone": phoneapp,
        "email": emailapp,
        "linkFileCv": linkFile,
        "job": {
            "id":id
        }
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(application)
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "Thành công!",
                type: "success"
            },
            function() {
                window.location.reload();
            });
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
    document.getElementById("loading").style.display = 'none'
}

async function loadMyJobApplication() {
    var url = 'http://localhost:8080/api/jobapplication/user/find-by-user';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    console.log(list);
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += 
        `<tr>
            <td>${list[i].id}</td>
            <td class="floatr"><a href="detail?id=${list[i].job.id}">${list[i].job.title}</a></td>
            <td>${list[i].job.company.name}</td>
            <td class="floatr">${list[i].createdDate}</td>
            <td>${list[i].title}</td>
            <td class="floatr">${list[i].fullname}</td>
            <td>${list[i].phone}</td>
            <td class="floatr"${list[i].email}></td>
            <td><a href="${list[i].linkFileCv}" target="_blank">Xem file</a></td>
        </tr>`
    }
    document.getElementById("listjobApp").innerHTML = main
}

