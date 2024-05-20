package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class InfluencerController {
	@RequestMapping(value = { "cadastroInfluencer" }, method = RequestMethod.GET)
	public String cadastroInfluencer(HttpSession session, Model model) throws Exception {

		return "influencer/cadastroInfluencer";
	}

	@RequestMapping(value = { "dadosBancarios" }, method = RequestMethod.GET)
	public String dadosBancarios(HttpSession session, Model model) throws Exception {

		return "influencer/dadosBancarios";
	}

	@RequestMapping(value = { "dadosDeCadastro" }, method = RequestMethod.GET)
	public String dadosDeCadastro(HttpSession session, Model model) throws Exception {

		return "influencer/dadosDeCadastro";
	}

	@RequestMapping(value = { "mercado" }, method = RequestMethod.GET)
	public String mercado(HttpSession session, Model model) throws Exception {

		return "influencer/mercado";
	}

	@RequestMapping(value = { "meusProdutos" }, method = RequestMethod.GET)
	public String meusProdutos(HttpSession session, Model model) throws Exception {

		return "influencer/meusProdutos";
	}

	@RequestMapping(value = { "perguntaInfluencer" }, method = RequestMethod.GET)
	public String perguntaInfluencer(HttpSession session, Model model) throws Exception {

		return "influencer/perguntaInfluencer";
	}

}
