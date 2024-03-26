var token = localStorage.getItem("token");
const exceptionCode = 417;

async function loadMenu() {
    var dn = `
    <a href="account#daluu" class="pointermenu ytmenu"><i class="fa fa-heart-o"><span class="slcartmenu" id="slcartmenu">0</span> Yêu thích</i></a>
    <span class="nav-item dropdown pointermenu gvs">
                <i class="fa fa-user" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Tài khoản</i>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="account">Tài khoản</a></li>
                    <li onclick="logout()"><a class="dropdown-item" href="#">Đăng xuất</a></li>
                </ul>
            </span>
    <a href="quanly/quanlytin" class="pointermenu ytmenu"><img src="image/dashboard.png" class="imglogotopmenu"> Dành cho nhà tuyển dụng</i></a>
            `
    if (token == null) {
        dn = `<a href="login" class="pointermenu gvs"><i class="fa fa-user"> Đăng ký/ Đăng nhập</i></a>`
    }
    var menu =
        `<nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand navbar-toggler" href="index"><img class="imglogo" src="image/logo.png"></a>
            <span>
                <i data-bs-toggle="modal" data-bs-target="#modalsearch" class="fa fa-search navbar-toggler"></i>
                <i class="fa fa-shopping-bag navbar-toggler"> <span class="slcartmenusm">0</span></i>
            </span>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
               <li class="nav-item"><a class="linktop"><a href="index"><img class="imglogo logomain" src="image/logo.png"></a></li>
                <li class="nav-item"><a class="nav-link menulink" href="index">Trang chủ</a></li>
                <li class="nav-item"><a class="nav-link menulink" href="listjob">Tìm việc làm</a></li>
                <li class="nav-item"><a class="nav-link menulink" href="blog">Bài viết</a></li>
            </ul>
            <div class="d-flex">
                ${dn}
            </div>
        </div>
    </nav>

`
    document.getElementById("menu").innerHTML = menu
    try { loadFooter(); } catch (error) {}

    loadSalarymenu();
    loadCareerMenu();
    loadProvinceMenu();
    loadNumFavoriteMenu();
}


function loadFooter() {
    var foo = `<footer class="text-center text-lg-start text-muted">
    <section class="">
      <div class=" text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Dành cho ứng viên</h6>
            <p><a href="listjob" class="text-reset">Việc làm mới nhất</a></p>
            
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">NHÀ TUYỂN DỤNG</h6>
            <p><a href="#!" class="text-reset">Đăng Tuyển Dụng</a></p>
            <p><a href="#!" class="text-reset">Tìm Hồ Sơ</a></p>
            <p><a href="#!" class="text-reset">Giải Pháp Talent</a></p>
            <p><a href="#!" class="text-reset">Solution</a></p>
            <p><a href="#!" class="text-reset">Sản Phẩm Dịch Vụ</a></p>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">TRUNG TÂM TRỢ GIÚP</h6>
            <p><a href="#!" class="text-reset">Về fejobs.vn</a></p>
            <p><a href="#!" class="text-reset">Chính Sách BV Thông Tin</a></p>
            <p><a href="#!" class="text-reset">Chính sách GDPR</a></p>
            <p><a href="#!" class="text-reset">Quy chế sàn giao dịch</a></p>
            <p><a href="#!" class="text-reset">Điều khoản sử dụng</a></p>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-4">WEBSITE ĐỐI TÁC</h6>
            <p><i class="fas fa-home me-3"></i>FEJOBS.vn</p>
            <p><i class="fas fa-envelope me-3"></i>FEJOBS.vn</p>
            <p><i class="fas fa-phone me-3"></i>FEJOBS.vn</p>
            <p><i class="fas fa-print me-3"></i>Liên Hệ</p>
          </div>
        </div>
      </div>
    </section>
  </footer>`
    document.getElementById("footer").innerHTML = foo;
}

async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('login')
}


function formatmoney(money) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VND.format(money);
}


async function loadSalarymenu() {
    var url = 'http://localhost:8080/api/salary/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '<option value="">Tất cả mức lương</option>';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("salarymenu").innerHTML = main;
}
async function loadCareerMenu() {
    var url = 'http://localhost:8080/api/career/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("careermenu").innerHTML = main;
    const ser = $("#careermenu");
    ser.select2({
        placeholder: "Tất cả ngành nghề",
    });
}

async function loadProvinceMenu() {
    var url = 'http://localhost:8080/api/address/public/province';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '<option value="">Tất cả khu vực</option>';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("provincemenu").innerHTML = main;
}

async function loadNumFavoriteMenu() {
    if(token == null){
        return;
    }
    var url = 'http://localhost:8080/api/jobfavorite/user/num-my-favorite';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        return;
    }
    var result = await response.text();
    document.getElementById("slcartmenu").innerHTML = result;
}


function formatdate(date){
    var datesp = date.split('-')
    return datesp[2]+"-"+datesp[1]+'-'+datesp[0];
}