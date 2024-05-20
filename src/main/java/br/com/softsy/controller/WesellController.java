package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WesellController {
	@RequestMapping(value = { "cadastroDeColaboradores" }, method = RequestMethod.GET)
	public String cadastroDeColaboradores(HttpSession session, Model model) throws Exception {

		return "wesell/cadastroDeColaboradores";
	}

	@RequestMapping(value = { "listarColaboradores" }, method = RequestMethod.GET)
	public String listarColaboradores(HttpSession session, Model model) throws Exception {

		return "wesell/listarColaboradores";
	}
	
	@RequestMapping(value = { "listarLojista" }, method = RequestMethod.GET)
	public String listarLojista(HttpSession session, Model model) throws Exception {

		return "wesell/listarLojista";
	}
	
	
	@RequestMapping(value = { "cadastroDeCategoria" }, method = RequestMethod.GET)
	public String cadastroDeCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "categoria/cadastroDeCategoria";
	}
	
	@RequestMapping(value = { "listarCategoria" }, method = RequestMethod.GET)
	public String listarCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "categoria/listarCategoria";
	}
	
	@RequestMapping(value = { "cadastroDeSubCategoria" }, method = RequestMethod.GET)
	public String cadastroDeSubCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "sub-categoria/cadastroDeSubCategoria";
	}
	
	@RequestMapping(value = { "listarSubCategoria" }, method = RequestMethod.GET)
	public String listarSubCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "sub-categoria/listarSubCategoria";
	}
	
	
	@RequestMapping(value = { "cadastroDeCargo" }, method = RequestMethod.GET)
	public String cadastroDeCargo(HttpSession session, Model model) throws Exception {
		
		
		return "cargo/cadastroDeCargo";
	}
	
	@RequestMapping(value = { " listarCargos" }, method = RequestMethod.GET)
	public String listarCargos(HttpSession session, Model model) throws Exception {
		
		
		return "cargo/listarCargos";
	}

}
