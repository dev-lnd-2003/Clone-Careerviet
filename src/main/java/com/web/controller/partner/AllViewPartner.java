package com.web.controller.partner;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/quanly")
public class AllViewPartner {

    @RequestMapping(value = {"/dangtin"}, method = RequestMethod.GET)
    public String dangtin() {
        return "quanly/dangtin.html";
    }

    @RequestMapping(value = {"/lienhe"}, method = RequestMethod.GET)
    public String lienhe() {
        return "quanly/lienhe.html";
    }

    @RequestMapping(value = {"/quanlytin"}, method = RequestMethod.GET)
    public String quanlytin() {
        return "quanly/quanlytin.html";
    }

    @RequestMapping(value = {"/taikhoan"}, method = RequestMethod.GET)
    public String taikhoan() {
        return "quanly/taikhoan.html";
    }
}
