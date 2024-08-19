package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {
	@RequestMapping(value = { "loginFuncionario" }, method = RequestMethod.GET)
	public String loginFuncionario(HttpSession session, Model model) throws Exception {

		return "login/loginFuncionario";
	}
	
//	@RequestMapping(value = { "loginInfluencer" }, method = RequestMethod.GET)
//	public String loginInfluencer(HttpSession session, Model model) throws Exception {
//
//		return "login/loginInfluencer";
//	}
}
