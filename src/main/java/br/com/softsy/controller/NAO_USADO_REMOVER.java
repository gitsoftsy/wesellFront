package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.model.UsuarioParceiroVO;

@Controller
public class NAO_USADO_REMOVER {

	
	@RequestMapping(value = { "cadastroDeParceiro" }, method = RequestMethod.GET)
	public String cadastroDeParceiro(HttpSession session, Model model) throws Exception {
		/*
		 * if (session.getAttribute("loginFunc") == null) { return
		 * "login/loginFuncionario"; }
		 */
		return "lojista/cadastroDeParceiro";
	}
	
	@RequestMapping(value = { "editarParceiro" }, method = RequestMethod.GET)
	public String editarParceiro(HttpSession session, Model model) throws Exception {
		/*
		 * if (session.getAttribute("loginFunc") == null) { return
		 * "login/loginFuncionario"; }
		 */

		return "lojista/editarParceiro";
	}
	
	@RequestMapping(value = { "listarParceiros" }, method = RequestMethod.GET)
	public String listarParceiros(HttpSession session, Model model) throws Exception {
		/*
		 * if (session.getAttribute("loginFunc") == null) { return
		 * "login/loginFuncionario"; }
		 */

		return "lojista/listarParceiro";
	}
	

	@RequestMapping(value = { "vinculaParceiro" }, method = RequestMethod.GET)
	public String vinculaParceiro(HttpSession session, Model model) throws Exception {
		/*
		 * if (session.getAttribute("loginFunc") == null) { return
		 * "login/loginFuncionario"; }
		 */

		return "lojista/vincularUtmParceiro";
	}

	
}
