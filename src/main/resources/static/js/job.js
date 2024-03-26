var size = 5;
async function loadJobIndex(page) {
    var url = 'http://localhost:8080/api/job/public/all-job-by-user?page=' + page + '&size=' + size + '&sort=id,desc';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    var list = result.content;
    var totalPage = result.totalPages;

    var main = '';
    for (i = 0; i < list.length; i++) {
        var pl = '';
        var jobWelfares = list[i].jobWelfares;
        for (j = 0; j < jobWelfares.length; j++) {
            pl += `<i class="${jobWelfares[j].welfare.icon} chedo"> ${jobWelfares[j].welfare.name}</i>`
        }
        main += `<div class="singlejob row">
        <div class="col-sm-2 col-2">
            <div class="divimgjob" style="width: 150px"><a href="detail?id=${list[i].id}"><img src="${list[i].company.image}" class="imgjob"></a></div>
        </div>
        <div class="col-sm-8 col-8">
            <a href="detail?id=${list[i].id}" class="titlejob">${list[i].title}</a>
            <span class="companyjob">${list[i].company.name}</span>
            <span class="inforjob salaryjob"><i class="fa fa-dollar"></i> Lương: ${list[i].salary.name}</span>
            <span class="inforjob"><i class="fa fa-location-arrow"></i>  ${list[i].addressDetail}, ${list[i].districts.name}, ${list[i].districts.province.name}</span>
            <span class="inforjob"><i class="fa fa-clock-o"></i> Hạn nộp: ${list[i].expirationDate}</span>
            <span class="inforjob listchedo">
                ${pl}
            </span>
        </div>
        <div class="col-sm-2 col-2 csl">
            <div class="ytjob">
                <span class="inforjob"><i class="fa fa-calendar"></i> Câp nhật: ${list[i].updatedDate == null?list[i].createdDate:list[i].updatedDate}</span>
            </div>
        </div>
    </div>`
    }
    document.getElementById("listjobindex").innerHTML = main

    var mainpage = ''
    for (i = 1; i <= totalPage; i++) {
        mainpage += `<li onclick="loadJobIndex(${(Number(i) - 1)})" class="page-item"><a class="page-link" href="#listsp">${i}</a></li>`
    }
    document.getElementById("pageable").innerHTML = mainpage
    document.getElementById("numjobheader").innerHTML = result.totalElements + " Việc làm"
}


function checkListn() {
    var listnn = $("#careermenu").val()
    if (listnn != null) {
        document.getElementsByClassName('select2-search--inline')[0].style.width = '0px';
    } else {
        document.getElementsByClassName('select2-search--inline')[0].style.width = '100%';
    }
}


async function searchFullJob(page) {
    var careers = $("#careermenu").val();
    var province = document.getElementById("provincemenu").value
    var salary = document.getElementById("salarymenu").value
    var searchmenu = document.getElementById("searchmenu").value
    if (salary == "") {
        salary = null
    }
    if (province == "") {
        province = null
    }

    var url = 'http://localhost:8080/api/job/public/search-full-job?page=' + page + '&size=' + size;
    var dto = {
            "search": searchmenu,
            "provinceId": province,
            "salaryId": salary,
            "page": page,
            "size": size,
            "careerId": careers
        }
        // console.log(dto);
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(dto)
    });
    var result = await response.json();
    var list = result.content;
    var totalPage = result.totalPages;

    var main = '';
    for (i = 0; i < list.length; i++) {
        var pl = '';
        var jobWelfares = list[i].jobWelfares;
        for (j = 0; j < jobWelfares.length; j++) {
            pl += `<i class="${jobWelfares[j].welfare.icon} chedo"> ${jobWelfares[j].welfare.name}</i>`
        }
        main += `<div class="singlejob row">
        <div class="col-sm-2 col-2">
            <div class="divimgjob" style="width: 150px"><a href="detail?id=${list[i].id}"><img src="${list[i].company.image}" class="imgjob"></a></div>
        </div>
        <div class="col-sm-8 col-8">
            <a href="detail?id=${list[i].id}" class="titlejob">${list[i].title}</a>
            <span class="companyjob">${list[i].company.name}</span>
            <span class="inforjob salaryjob"><i class="fa fa-dollar"></i> Lương: ${list[i].salary.name}</span>
            <span class="inforjob"><i class="fa fa-location-arrow"></i>  ${list[i].addressDetail}, ${list[i].districts.name}, ${list[i].districts.province.name}</span>
            <span class="inforjob"><i class="fa fa-clock-o"></i> Hạn nộp: ${list[i].expirationDate}</span>
            <span class="inforjob listchedo">
                ${pl}
            </span>
        </div>
        <div class="col-sm-2 col-2 csl">
            <div class="ytjob">
                <span class="inforjob"><i class="fa fa-calendar"></i> Câp nhật: ${list[i].updatedDate == null?list[i].createdDate:list[i].updatedDate}</span>
            </div>
        </div>
    </div>`
    }
    document.getElementById("listjobindex").innerHTML = main

    var mainpage = ''
    for (i = 1; i <= totalPage; i++) {
        mainpage += `<li onclick="searchFullJob(${(Number(i) - 1)})" class="page-item"><a class="page-link" href="#listsp">${i}</a></li>`
    }
    document.getElementById("pageable").innerHTML = mainpage
    document.getElementById("numjobheader").innerHTML = result.totalElements + " Việc làm"
}

async function loadAJob() {
    var id = window.location.search.split('=')[1];
    if (id != null) {
        var url = 'http://localhost:8080/api/job/public/job-by-id?id=' + id;
        const response = await fetch(url, {
            method: 'GET'
        });
        var job = await response.json();
        document.getElementById("imgcompany").src = job.company.image
        document.getElementById("tencongviec").innerHTML = job.title
        document.getElementById("comname").innerHTML = job.company.name
        document.getElementById("dddetail").innerHTML = job.addressDetail + ", " + job.districts.name + ", " + job.districts.province.name
        document.getElementById("ttcongty").innerHTML = job.company.description
        document.getElementById("ngaycapnhat").innerHTML = job.updatedDate == null ? job.createdDate : job.updatedDate
        var career = '';
        var jobCareers = job.jobCareers;
        for (j = 0; j < jobCareers.length; j++) {
            career += jobCareers[j].career.name + " / ";
        }
        document.getElementById("nganhnghe").innerHTML = career
        document.getElementById("hinhthuc").innerHTML = job.workingForm
        document.getElementById("luongd").innerHTML = job.salary.name
        document.getElementById("kinhnghiem").innerHTML = job.experience
        document.getElementById("capbac").innerHTML = job.rank
        document.getElementById("ngayhethan").innerHTML = formatdate(job.expirationDate)
        var pl = '';
        var jobWelfares = job.jobWelfares;
        for (j = 0; j < jobWelfares.length; j++) {
            pl += `<span class="col-30p singlecd"><i class="${jobWelfares[j].welfare.icon} icdetail"></i> ${jobWelfares[j].welfare.name}</span>`
        }
        document.getElementById("listph").innerHTML = pl
        document.getElementById("motacv").innerHTML = job.description
        document.getElementById("yeucaucv").innerHTML = job.requireJon
        document.getElementById("ttkhac").innerHTML = job.anotherInfor

        var url = 'http://localhost:8080/api/job/public/relate-job?id=' + id;
        const res = await fetch(url, {
            method: 'POST'
        });
        var list = await res.json();
        var main = '';
        for (i = 0; i < list.length; i++) {
            main += `<div class="singlejob row">
            <div class="col-sm-3 col-3">
                <div class="divimgjob text-center mt-1" ><a href="detail?id=${list[i].id}"><img src="${list[i].company.image}" class="imgjob"></a></div>
            </div>
            <div class="col-sm-9 col-9">
                <a href="detail?id=${list[i].id}" class="titlejoblq">${list[i].title}</a>
                <span class="companyjob">${list[i].company.name}</span>
                <span class="inforjob salaryjob"><i class="fa fa-dollar"></i> Lương: ${list[i].salary.name}</span>
                <span class="inforjob"><i class="fa fa-location-arrow"></i> ${list[i].addressDetail}, ${list[i].districts.name}, ${list[i].districts.province.name}</span>
            </div>
        </div>`
        }
        document.getElementById("listjoblq").innerHTML = main;
    }
}