package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LojistaController {
	
	@RequestMapping(value = { "cadastroDeLojista" }, method = RequestMethod.GET)
	public String cadastroDeLojista(HttpSession session, Model model) throws Exception {

		return "lojista/cadastroDeLojista";
	}

	@RequestMapping(value = { "cadastroEmpresa" }, method = RequestMethod.GET)
	public String cadastroEmpresa(HttpSession session, Model model) throws Exception {

		return "lojista/cadastroEmpresa";
	}

	@RequestMapping(value = { "cadastroFuncionarioLojista" }, method = RequestMethod.GET)
	public String cadastroFuncionarioLojista(HttpSession session, Model model) throws Exception {

		return "lojista/cadastroFuncionarioLojista";
	}

	@RequestMapping(value = { "cadastroProdutoLojista" }, method = RequestMethod.GET)
	public String cadastroProdutoLojista(HttpSession session, Model model) throws Exception {

		return "lojista/cadastroProdutoLojista";
	}

	@RequestMapping(value = { "cadastroSucesso" }, method = RequestMethod.GET)
	public String cadastroSucesso(HttpSession session, Model model) throws Exception {

		return "lojista/cadastroSucesso";
	}

	@RequestMapping(value = { "listarFuncionarioLojista" }, method = RequestMethod.GET)
	public String listarFuncionarioLojista(HttpSession session, Model model) throws Exception {

		return "lojista/listarFuncionarioLojista";
	}

	@RequestMapping(value = { "listarProdutoLojista" }, method = RequestMethod.GET)
	public String listarProdutoLojista(HttpSession session, Model model) throws Exception {

		return "lojista/listarProdutoLojista";
	}

	@RequestMapping(value = { "lojaLojista" }, method = RequestMethod.GET)
	public String lojaLojista(HttpSession session, Model model) throws Exception {

		return "lojista/lojaLojista";
	}

	@RequestMapping(value = { "usuarioLojista" }, method = RequestMethod.GET)
	public String usuarioLojista(HttpSession session, Model model) throws Exception {

		return "lojista/usuarioLojista";
	}
	
	@RequestMapping(value = { "cadastroTelefoneLojista" }, method = RequestMethod.GET)
	public String cadastroTelefoneLojista(HttpSession session, Model model) throws Exception {
		
		
		return "telefone/cadastroTelefoneLojista";
	}
	
	@RequestMapping(value = { "listarTelefoneLojista" }, method = RequestMethod.GET)
	public String listarTelefoneLojista(HttpSession session, Model model) throws Exception {

		return "lojista/listarTelefoneLojista";
	}
	
	@RequestMapping(value = { "listarProduto" }, method = RequestMethod.GET)
	public String listarProduto(HttpSession session, Model model) throws Exception {
		
		
		return "produto/listarProduto";
	}
	
	@RequestMapping(value = { "cadastroFuncionario" }, method = RequestMethod.GET)
	public String cadastroFuncionario(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 * 
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */
		return "funcionarios/cadastroDeFuncionario";
	}
	
	@RequestMapping(value = { "listarFuncionarios" }, method = RequestMethod.GET)
	public String listarFuncionarios(HttpSession session, Model model) throws Exception {
//		if (session.getAttribute("loginFunc") == null) {
			//return "login/loginFuncionario";
	//	}

		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 * 
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */

		return "funcionarios/listarFuncionario";
	}
}
