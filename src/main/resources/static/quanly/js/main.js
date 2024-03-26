$(document).ready(function() {
    checkRole();
    loadmenu();
    loadtop();
    loadMk();
});
var exceptionCode = 417;
async function loadmenu(){
    var menu =
    `<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="nav menuadminleft">
                <div class="nav-link navcha">
                    <img id="avatarnav" src="../image/user.png" class="imgusernav">
                    <div class="remainhoten">
                        <p id="hotennav" class="hotennav">Công ty công nghệ aladin</p>
                        <p id="sdtnav" class="emailnav">093264723</p>
                    </div>
                </div>
                <p class="nav-link mathanhvien">Mã thành viên: <span id="mathanhviennav"> 132491</span></p>
                <div class="nav-link">
                    <button onclick="window.location.href='dangtin'" class="btndangtinnav">Đăng tin</button>
                </div>
                <a class="nav-link navcha" href="taikhoan">
                    <div class="sb-nav-link-icon"><i class="fa fa-edit"></i></div>
                    Thông tin doanh nghiệp
                </a>
                <a class="nav-link navcha" href="quanlytin">
                    <div class="sb-nav-link-icon"><i class="fa fa-newspaper"></i></div>
                    Quản lý tin đăng
                </a>
<!--                <a class="nav-link navcha" href="lienhe">-->
<!--                    <div class="sb-nav-link-icon"><i class="fas fa-phone"></i></div>-->
<!--                   Liên hệ-->
<!--                </a>-->
                <a data-bs-toggle="modal" data-bs-target="#doimk" class="nav-link navcha" href="#">
                    <div class="sb-nav-link-icon"><i class="fas fa-key"></i></div>
                   Đổi mật khẩu
                </a>
                <a onclick="logout()" class="nav-link navcha" href="#">
                    <div class="sb-nav-link-icon"><i class="fas sign-out"></i></div>
                    Đăng xuất
                </a>
            </div>
        </div>
    </nav>`
document.getElementById("layoutSidenav_nav").innerHTML = menu
loadThongTinTaiKhoanNavBar();
}

function loadtop(){
    var top =
    `<a style="color:#999" class="navbar-brand ps-3" href="../index"><i class="fa fa-home tagilogo"></i>Quản lý</a>
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
    <ul id="menuleft" class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="lidangtintop"><button onclick="window.location.href='dangtin'" class="btndangtinnav btndangtintop">Đăng tin</button></li>
    </ul>`
    document.getElementById("top").innerHTML = top
    var sidebarToggle = document.getElementById("sidebarToggle");
    sidebarToggle.onclick = function(){
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
}


async function logout(){
    localStorage.removeItem("token");
    window.location.replace('../login')
}

function formatmoney(money) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    return VND.format(money);
}

var token = localStorage.getItem("token");
async function loadThongTinTaiKhoanNavBar(){
    var urlAccount = 'http://localhost:8080/api/company/partner/my-company';
    const res = await fetch(urlAccount, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var obj = await res.json();
    document.getElementById("mathanhviennav").innerHTML= obj.user.id
    document.getElementById("hotennav").innerHTML = obj.company.name==null?obj.user.fullname:obj.company.name
    document.getElementById("sdtnav").innerHTML = obj.company.phone
    document.getElementById("avatarnav").src = obj.user.image==null?'../image/avatar.webp':obj.user.image
}

async function checkRole(){
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/partner/check-role-partner';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        window.location.replace('../login')
    }
}

async function loadMk(){
    var mk = 
    `<div class="modal fade" id="doimk" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Cập nhật mật khẩu</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
        <div class="modal-body">
            <div class="content-profile">
                <label>Mật khẩu cũ</label>
                <input id="oldpass" class="form-control" type="password" placeholder="*****">
                <label>Mật khẩu mới</label>
                <input id="newpass" class="form-control" type="password" placeholder="*****">
                <label>Nhập lại mật khẩu mới</label>
                <input id="renewpass" class="form-control" type="password" placeholder="*****"><br><br>
                <button onclick="changePassword()" class="btn btn-primary form-control">Cập nhật mật khẩu</button>
            </div>
        </div>
      </div>
    </div>
</div>`
document.getElementById("passform").innerHTML = mk;
}


async function changePassword() {
    var token = localStorage.getItem("token");
    var oldpass = document.getElementById("oldpass").value
    var newpass = document.getElementById("newpass").value
    var renewpass = document.getElementById("renewpass").value
    var url = 'http://localhost:8080/api/partner/change-password';
    if (newpass != renewpass) {
        alert("mật khẩu mới không trùng khớp");
        return;
    }
    var passw = {
        "oldPass": oldpass,
        "newPass": newpass
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(passw)
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "cập nhật mật khẩu thành công, hãy đăng nhập lại",
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
}