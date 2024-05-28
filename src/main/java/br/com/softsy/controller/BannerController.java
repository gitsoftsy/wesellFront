package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BannerController {
	
	@RequestMapping(value = { "listarBanners" }, method = RequestMethod.GET)
	public String listarBannersPrincipais(HttpSession session, Model model) throws Exception {
		
		
		return "banners/banners";
	}
	
	
	
	@RequestMapping(value = { "cadastroDeBanner" }, method = RequestMethod.GET)
	public String cadastroDeBannerPrincipal(HttpSession session, Model model) throws Exception {
		
		
		return "banners/newBanner";
	}
	
	
	
	@RequestMapping(value = { "editBanner" }, method = RequestMethod.GET)
	public String editBannerPrincipal(HttpSession session, Model model) throws Exception {
		
		
		return "banners/editBanner";
	}
	
	
}
