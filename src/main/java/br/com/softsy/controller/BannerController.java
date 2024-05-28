package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BannerController {
	
	@RequestMapping(value = { "listarBannersPrincipais" }, method = RequestMethod.GET)
	public String listarBannersPrincipais(HttpSession session, Model model) throws Exception {
		
		
		return "banners/bannersPrincipais";
	}
	
	@RequestMapping(value = { "listarBannersSecundarios" }, method = RequestMethod.GET)
	public String listarBannersSecundarios(HttpSession session, Model model) throws Exception {
		
		
		return "banners/bannersSecundarios";
	}
	
	@RequestMapping(value = { "cadastroDeBannerPrincipal" }, method = RequestMethod.GET)
	public String cadastroDeBannerPrincipal(HttpSession session, Model model) throws Exception {
		
		
		return "banners/newBannerPrincipal";
	}
	
	@RequestMapping(value = { "cadastroDeBannerSecundario" }, method = RequestMethod.GET)
	public String cadastroDeBannerSecundario(HttpSession session, Model model) throws Exception {
		
		
		return "banners/newBannerSecundario";
	}
	
	@RequestMapping(value = { "editBannerPrincipal" }, method = RequestMethod.GET)
	public String editBannerPrincipal(HttpSession session, Model model) throws Exception {
		
		
		return "banners/editBannerPrincipal";
	}
	
	@RequestMapping(value = { "editBannerSecundario" }, method = RequestMethod.GET)
	public String editBannerSecundario(HttpSession session, Model model) throws Exception {
		
		
		return "banners/editBannerSecundario";
	}
}
