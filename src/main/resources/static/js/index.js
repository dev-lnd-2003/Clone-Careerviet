async function topCompany() {
    var url = 'http://localhost:8080/api/company/public/top-company';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-sm-2">
        <img src="${list[i].image}" class="imgnhatuyendung">
    </div>`
    }
    document.getElementById("listnhatuyendung").innerHTML = main
}

async function loadTop2Blog() {
    var url = 'http://localhost:8080/api/blog/public/top-2-blog';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-sm-6">
        <a href="blogdetail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgblogabout"></a>
    </div>`
    }
    document.getElementById("baivietnoibat").innerHTML = main
}


async function loadTopJob() {
    var url = 'http://localhost:8080/api/job/public/top-job';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-sm-6">
        <div class="singlejob row">
            <div class="col-sm-3 col-3">
                <div class="divimgjob">
                <a href="detail?id=${list[i].id}" class="titlejoblq"><img src="${list[i].company.image}" class="imgjob"></a>
                </div>
            </div>
            <div class="col-sm-9 col-9">
                <a href="detail?id=${list[i].id}" class="titlejoblq">${list[i].title} </a>
                <span class="companyjob">${list[i].company.name}</span>
                <span class="inforjob salaryjob"><i class="fa fa-dollar"></i> Lương: ${list[i].salary.name}</span>
                <span class="inforjob"><i class="fa fa-location-arrow"></i> ${list[i].addressDetail}, ${list[i].districts.name}, ${list[i].districts.province.name}</span>
            </div>
        </div>
    </div>`
    }
    document.getElementById("listtopjob").innerHTML = main
}


async function loadAllCarrer() {
    var url = 'http://localhost:8080/api/career/public/find-all-quantity';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = `<div class="listdmindex owl-2-style"><div class="owl-carousel owl-2" id="listcategoryindex">`
    for (i = 0; i < list.length; i++) {
        main += ` <div class="media-29101">
        <h5><a href="#">${list[i].name}</a></h5>
        <p class="numjobmedia">(${list[i].quantity} việc làm)</p>
    </div>`
    }
    main += `</div></div>`
    document.getElementById("dsmh_index").innerHTML = main
    loadCou();
}