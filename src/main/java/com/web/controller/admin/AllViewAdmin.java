package com.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/admin")
public class AllViewAdmin {

    @RequestMapping(value = {"/addblog"}, method = RequestMethod.GET)
    public String addblog() {
        return "admin/addblog.html";
    }

    @RequestMapping(value = {"/addnganhnghe"}, method = RequestMethod.GET)
    public String addnganhnghe() {
        return "admin/addnganhnghe.html";
    }

    @RequestMapping(value = {"/baidang"}, method = RequestMethod.GET)
    public String baidang() {
        return "admin/baidang.html";
    }

    @RequestMapping(value = {"/blog"}, method = RequestMethod.GET)
    public String blog() {
        return "admin/blog.html";
    }

    @RequestMapping(value = {"/doanhnghiep"}, method = RequestMethod.GET)
    public String doanhnghiep() {
        return "admin/doanhnghiep.html";
    }

    @RequestMapping(value = {"/index"}, method = RequestMethod.GET)
    public String index() {
        return "admin/index.html";
    }

    @RequestMapping(value = {"/nganhnghe"}, method = RequestMethod.GET)
    public String nganhnghe() {
        return "admin/nganhnghe.html";
    }

    @RequestMapping(value = {"/phucloi"}, method = RequestMethod.GET)
    public String phucloi() {
        return "admin/phucloi.html";
    }

    @RequestMapping(value = {"/salary"}, method = RequestMethod.GET)
    public String salary() {
        return "admin/salary.html";
    }

    @RequestMapping(value = {"/taikhoan"}, method = RequestMethod.GET)
    public String taikhoan() {
        return "admin/taikhoan.html";
    }


}
