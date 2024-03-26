var token = localStorage.getItem("token");
async function loadNganhNghe() {
    var url = 'http://localhost:8080/api/career/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("nganhnghe").innerHTML = main;
    const ser = $("#nganhnghe");
    ser.select2({
        placeholder: "Chọn ngành nghề",
    });
}

async function loadPhucLoi() {
    var url = 'http://localhost:8080/api/welfare/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("phucloi").innerHTML = main;
    const ser = $("#phucloi");
    ser.select2({
        placeholder: "Chọn phúc lợi",
    });
}

async function loadLuong() {
    var url = 'http://localhost:8080/api/salary/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("luong").innerHTML = main;
}

async function loadTinh() {
    var url = 'http://localhost:8080/api/address/public/province';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("tinh").innerHTML = main;
    const ser = $("#tinh");
    ser.select2({
        placeholder: "Chọn tỉnh",
    });
    loadHuyen(list[0].id);
}

async function loadHuyen() {
    var id = document.getElementById("tinh").value
    var url = 'http://localhost:8080/api/address/public/districts?id='+id;
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("huyen").innerHTML = main;
}


async function loadStatus() {
    var url = 'http://localhost:8080/api/job/public/get-all-status-job';
    const response = await fetch(url, {
    });
    var list = await response.json();
    var main = '<option value="-1">Tất cả</option>';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i]}">${list[i]}</option>`
    }
    document.getElementById("statuslist").innerHTML = main;
}

async function saveJob() {
    var url = 'http://localhost:8080/api/job/partner/save-or-update';
    var id = document.getElementById("jobid").value
    var tieude = document.getElementById("tieude").value
    var luong = document.getElementById("luong").value
    var hinhthuc = document.getElementById("hinhthuc").value
    var kinhnghiem = document.getElementById("kinhnghiem").value
    var capbac = document.getElementById("capbac").value
    var ngayhethan = document.getElementById("ngayhethan").value
    var huyen = document.getElementById("huyen").value
    var yeucau = tinyMCE.get('yeucau').getContent()
    var dcchitiet = document.getElementById("dcchitiet").value
    var ttkhac = tinyMCE.get('ttkhac').getContent()
    var nganhnghe = $("#nganhnghe").val();
    var phucloi = $("#phucloi").val();
    var description = tinyMCE.get('editor').getContent()
    var jobCareers = [];
    var jobWelfares = [];
    for(i=0; i<nganhnghe.length; i++){
        var oj = {
            "id":nganhnghe[i]
        }
        jobCareers.push(oj);
    }
    for(i=0; i<phucloi.length; i++){
        var oj = {
            "id":phucloi[i]
        }
        jobWelfares.push(oj);
    }

    var dto = {
        "job":{
            "id": id,
            "title": tieude,
            "addressDetail": dcchitiet,
            "workingForm": hinhthuc,
            "experience": kinhnghiem,
            "rank": capbac,
            "expirationDate": ngayhethan,
            "requireJon": yeucau,
            "anotherInfor": ttkhac,
            "description": description,
            "salary": {"id":luong},
            "districts": {"id":huyen},
        },
        "careers":jobCareers,
        "welfare":jobWelfares
    }
    console.log(dto)
    // return;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(dto)
    });
    var result = await response.json();
    console.log(result)
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "Thêm/sửa Công việc thành công",
                type: "success"
            },
            function() {
                window.location.href = 'quanlytin';
            });
    } else {
        swal({
                title: "Thông báo",
                text: "thêm/sửa thất bại",
                type: "error"
            },
            function() {
            });
    }
}


async function myJob() {
    $('#example').DataTable().destroy();
    var stt = document.getElementById("statuslist").value
    var url = 'http://localhost:8080/api/job/partner/my-job';
    if(stt != -1){
        url = 'http://localhost:8080/api/job/partner/my-job?stt='+stt;
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
        <td><img src="${list[i].company.image}" class="anhphongqltin"></td>
        <td>${list[i].title}</td>
        <td>${list[i].salary.name}</td>
        <td>${list[i].rank}</td>
        <td>${list[i].createdDate}</td>
        <td>${list[i].jobStatus}</td>
        <td class="sticky-col">
            <i onclick="deleteJob(${list[i].id})" class="fa fa-trash-alt iconaction"></i>
            <a href="dangtin?id=${list[i].id}"><i class="fa fa-edit iconaction"></i></a>
            <br><br><br>
            <button class="btn btn-primary" onclick="loadJobApp(${list[i].id})" data-bs-toggle="modal" data-bs-target="#listcvmodal">Xem CV</button>
        </td>
    </tr>`
    }
    document.getElementById("listjob").innerHTML = main;
    $('#example').DataTable();
}


async function jobById() {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var url = 'http://localhost:8080/api/job/public/job-by-id?id='+id;
    const response = await fetch(url, {
    });
    var job = await response.json();
    var listNganhnghe = []
    for (i = 0; i < job.jobCareers.length; i++) {
        listNganhnghe.push(job.jobCareers[i].career.id);
    }
    var listPl = []
    for (i = 0; i < job.jobWelfares.length; i++) {
        listPl.push(job.jobWelfares[i].welfare.id);
    }
    $("#nganhnghe").val(listNganhnghe).change();;
    $("#phucloi").val(listPl).change();;
    $("#tinh").val(job.districts.province.id).change();;
    document.getElementById("jobid").value = job.id;
    document.getElementById("tieude").value = job.title;
    document.getElementById("luong").value = job.salary.id;
    document.getElementById("hinhthuc").value = job.workingForm;
    document.getElementById("kinhnghiem").value = job.experience;
    document.getElementById("capbac").value = job.rank;
    document.getElementById("ngayhethan").value = job.expirationDate;
    document.getElementById("dcchitiet").value = job.addressDetail;
    tinyMCE.get('editor').setContent(job.description)
    tinyMCE.get('yeucau').setContent(job.requireJon)
    tinyMCE.get('ttkhac').setContent(job.anotherInfor)
    await loadHuyen();
    document.getElementById("huyen").value = job.districts.id;
}


async function deleteJob(id) {
    var con = confirm("Bạn chắc chắn muốn xóa tin này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/job/partner/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("Xóa thành công!");
        await new Promise(r => setTimeout(r, 1000));
        window.location.reload();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}


async function loadJobApp(id) {
    var url = 'http://localhost:8080/api/jobapplication/partner/find-by-job-id?id='+id;
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
            <td class="floatr"><a href="../detail?id=${list[i].job.id}">${list[i].job.title}</a></td>
            <td class="floatr">${list[i].createdDate}</td>
            <td>${list[i].title}</td>
            <td class="floatr">${list[i].fullname}</td>
            <td>${list[i].phone}</td>
            <td class="floatr"><a href="mailto:${list[i].email}">${list[i].email}</a></td>
            <td><a href="${list[i].linkFileCv}" target="_blank">Xem file</a></td>
        </tr>`
    }
    document.getElementById("listjobApp").innerHTML = main
}