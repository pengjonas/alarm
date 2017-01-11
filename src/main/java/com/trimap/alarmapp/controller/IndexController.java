/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.trimap.alarmapp.controller;

import com.trimap.alarmapp.service.SampleService;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.webjars.RequireJS;

/**
 *
 * @author Peng
 */
@Controller
@RequestMapping(value = "/")
public class IndexController {

    @Autowired
    private SampleService service;
    
    @Autowired
    ServletContext context; 

    @RequestMapping("/")
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @RequestMapping(value="api/process", method = RequestMethod.POST)    
    @ResponseBody
    public HashMap processAll(@RequestParam(value = "data", required = true) String data) {
        JSONArray jArray = new JSONArray(data);        
        HashMap map = new HashMap();
        map.put("email", service.processAll(jArray));
        return map;        
    }
    
    @ResponseBody
    @RequestMapping(value = "/webjarsjs", produces = "application/javascript")
    public String webjarjs() {
        return RequireJS.getSetupJavaScript(context.getContextPath() + "/webjars/"); 
    }    
}
