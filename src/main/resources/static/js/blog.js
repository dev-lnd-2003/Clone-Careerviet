var size = 9;
async function loadBlog(page) {
    var url = 'http://localhost:8080/api/blog/public/findAll-page?page=' + page + '&size=' + size + '&sort=id,desc';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;
    var totalPage = result.totalPages;

    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-4 col-md-6 col-sm-12 col-12 singleblog">
                    <div class="row">
                        <div class="col-5">
                            <a href="blogdetail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgblog"></a>
                        </div>
                        <div class="col-7 cntblog">
                            <a href="blogdetail?id=${list[i].id}" class="titleblog">${list[i].title}</a>
                            <a href="blogdetail?id=${list[i].id}"><span class="desblog">${list[i].description}</span></a>
                            <div class="userblog">
                                <img src="image/avtyo.webp" class="avtblog">
                                <span class="userdbg">${list[i].user.fullname==null?list[i].user.username:list[i].user.fullname}</span>
                                <span class="timeblog"><i class="fa fa-clock"></i> ${list[i].createdDate}</span>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("listblog").innerHTML = main
    var mainpage = ''
    for (i = 1; i <= totalPage; i++) {
        mainpage += `<li onclick="loadBlog(${(Number(i) - 1)})" class="page-item"><a class="page-link" href="#listsp">${i}</a></li>`
    }
    document.getElementById("pageable").innerHTML = mainpage
}


async function loadPrimaryBlog() {
    var url = 'http://localhost:8080/api/blog/public/findPrimaryBlog';
    const response = await fetch(url, {
        method: 'GET'
    });
    var blog = await response.json();
    document.getElementById("bannerimgblog").src = blog.imageBanner
    document.getElementById("titlebloghea").innerHTML = blog.title
    document.getElementById("desblogpri").innerHTML = blog.description
    document.getElementById("ngaydangb").innerHTML = blog.createdDate
    document.getElementById("hfef").href = `blogdetail?id=` + blog.id
    document.getElementById("btndocngay").onclick = function() {
        window.location.href = `blogdetail?id=` + blog.id
    }
}


async function loadABlog() {
    var id = window.location.search.split('=')[1];
    if (id != null) {
        var url = 'http://localhost:8080/api/blog/public/findById?id=' + id;
        const response = await fetch(url, {
            method: 'GET'
        });
        var blog = await response.json();
        document.getElementById("title").innerHTML = blog.title
        document.getElementById("userbldt").innerHTML = blog.user.fullname==null?blog.user.username:blog.user.fullname
        document.getElementById("ngaydang").innerHTML = blog.createdDate
        document.getElementById("contentdetailblog").innerHTML = blog.content
        document.getElementById("imgbanner").src = blog.imageBanner
    }
}


async function loadTopBlog() {
    var url = 'http://localhost:8080/api/blog/public/top-blog';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="row singleblogin">
        <div class="col-3">
            <a href="blogdetail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgblog"></a>
        </div>
        <div class="col-9 cntblog">
            <a href="blogdetail?id=${list[i].id}" class="titleblog">${list[i].title}</a>
            <a href="blogdetail?id=${list[i].id}"><span class="desblog">${list[i].description}</span></a>
            <div class="userblog">
                <span class="timeblog"><i class="fa fa-clock"></i> ${list[i].createdDate}</span>
            </div>
        </div>
    </div>`
    }
    document.getElementById("topbloglist").innerHTML = main
}