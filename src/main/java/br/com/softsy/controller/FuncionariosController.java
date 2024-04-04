package br.com.softsy.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.softsy.model.UsuarioInternoVO;
import br.com.softsy.utils.LoginUtils;

@Controller
public class FuncionariosController {

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
	
	@RequestMapping(value = { "editarFuncionario" }, method = RequestMethod.GET)
	public String editarFuncionario(HttpSession session, Model model) throws Exception {
//		if (session.getAttribute("loginFunc") == null) {
			//return "login/loginFuncionario";
	//	}

		/*
		 * String perfil = session.getAttribute("perfil").toString();
		 * 
		 * if (!LoginUtils.acessoAdmin(perfil)) { return "login/acesssoNegado"; }
		 */

		return "funcionarios/editarFuncionario";
	}

	@RequestMapping(value = { "listarFuncionarios" }, method = RequestMethod.GET)
	public String listarFuncionarios(HttpSession session, Model model) throws Exception {
		/*if (session.getAttribute("loginFunc") == null) {
			return "login/loginFuncionario";
		}
*/
		return "funcionarios/listarFuncionario";
	}
	
	//Lojista ---------------------------------------------------------------------------------- //
	
	@RequestMapping(value = { "cadastroDeLojista" }, method = RequestMethod.GET)
	public String cadastroDeLojista(HttpSession session, Model model) throws Exception {
		
		
		return "lojista/cadastroDeLojista";
	}
	
	@RequestMapping(value = { "listarLojista" }, method = RequestMethod.GET)
	public String listarLojista(HttpSession session, Model model) throws Exception {
		
		
		return "lojista/listarLojista";
	}
	
	@RequestMapping(value = { "editarLojista" }, method = RequestMethod.GET)
	public String editarLojista(HttpSession session, Model model) throws Exception {
		
		
		return "lojista/editarLojista";
	}
	
	@RequestMapping(value = { "usuarioLojista" }, method = RequestMethod.GET)
	public String usuarioLojista(HttpSession session, Model model) throws Exception {
		
		
		return "lojista/usuarioLojista";
	}
	
	@RequestMapping(value = { "listarFuncionarioLojista" }, method = RequestMethod.GET)
	public String listarFuncionarioLojista(HttpSession session, Model model) throws Exception {
			
			
		return "lojista/listarFuncionarioLojista";
	}

	@RequestMapping(value = { "lojaLojista" }, method = RequestMethod.GET)
	public String lojaLojista(HttpSession session, Model model) throws Exception {
			
			
		return "lojista/lojaLojista";
	}
	
	@RequestMapping(value = { "listarProdutoLojista" }, method = RequestMethod.GET)
	public String listarProdutoLojista(HttpSession session, Model model) throws Exception {
			
			
		return "lojista/listarProdutoLojista";
	}
	
	@RequestMapping(value = { "cadastroFuncionarioLojista" }, method = RequestMethod.GET)
	public String cadastroFuncionarioLojista(HttpSession session, Model model) throws Exception {
			
			
		return "lojista/cadastroFuncionarioLojista";
	}
	
	@RequestMapping(value = { "cadastroProdutoLojista" }, method = RequestMethod.GET)
	public String cadastroProdutoLojista(HttpSession session, Model model) throws Exception {
			
			
		return "lojista/cadastroProdutoLojista";
	}
	
	//categorias ------------------------------------------------------------------------------- //
	
	@RequestMapping(value = { "cadastroDeCategoria" }, method = RequestMethod.GET)
	public String cadastroDeCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "categoria/cadastroDeCategoria";
	}
	
	@RequestMapping(value = { "listarCategoria" }, method = RequestMethod.GET)
	public String listarCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "categoria/listarCategoria";
	}
	
	// Sub-categoria ----------------------------------------------------------------------------//
	
	@RequestMapping(value = { "cadastroDeSubCategoria" }, method = RequestMethod.GET)
	public String cadastroDeSubCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "sub-categoria/cadastroDeSubCategoria";
	}
	
	@RequestMapping(value = { "listarSubCategoria" }, method = RequestMethod.GET)
	public String listarSubCategoria(HttpSession session, Model model) throws Exception {
		
		
		return "sub-categoria/listarSubCategoria";
	}
	
	
	//cargo ------------------------------------------------------------------------------------- //
	
	@RequestMapping(value = { "cadastroDeCargo" }, method = RequestMethod.GET)
	public String cadastroDeCargo(HttpSession session, Model model) throws Exception {
		
		
		return "cargo/cadastroDeCargo";
	}
	
	@RequestMapping(value = { " listarCargos" }, method = RequestMethod.GET)
	public String listarCargos(HttpSession session, Model model) throws Exception {
		
		
		return "cargo/listarCargos";
	}
	
	@RequestMapping(value = { " editarCargo" }, method = RequestMethod.GET)
	public String editarCargo(HttpSession session, Model model) throws Exception {
		
		
		return "cargo/editarCargo";
	}
	
	//produto ------------------------------------------------------------------------------------//
	
	@RequestMapping(value = { "cadastroDeProduto" }, method = RequestMethod.GET)
	public String cadastroDeProduto(HttpSession session, Model model) throws Exception {
		
		
		return "produto/cadastroDeProduto";
	}
	
	@RequestMapping(value = { "listarProduto" }, method = RequestMethod.GET)
	public String listarProduto(HttpSession session, Model model) throws Exception {
		
		
		return "produto/listarProduto";
	}
	
	//colaboradores ------------------------------------------------------------------------------------//
	
		@RequestMapping(value = { "cadastroDeColaboradores" }, method = RequestMethod.GET)
		public String cadastroDeColaboradores(HttpSession session, Model model) throws Exception {
			
			
			return "colaboradores/cadastroDeColaboradores";
		}
		
		@RequestMapping(value = { "listarColaboradores" }, method = RequestMethod.GET)
		public String listarColaboradores(HttpSession session, Model model) throws Exception {
			
			
			return "colaboradores/listarColaboradores";
		}
		
		// fase 2 
		
		// cadastro Empresa
		
		@RequestMapping(value = { "cadastroEmpresa" }, method = RequestMethod.GET)
		public String cadastroEmpresa(HttpSession session, Model model) throws Exception {
			
			return "fase2/cadastroEmpresa";
		}
		
		// cadastrado com sucesso
		
		@RequestMapping(value = { "cadastroSucesso" }, method = RequestMethod.GET)
		public String cadastroSucesso(HttpSession session, Model model) throws Exception {
			
			
			return "fase2/cadastroSucesso";
		}
		
		// influencer Cadastro
		
		@RequestMapping(value = { "cadastroInfluencer" }, method = RequestMethod.GET)
		public String cadastroInfluencer(HttpSession session, Model model) throws Exception {
			
			
			return "influencer/cadastroInfluencer";
		}
		
		// login Influencer
		
				@RequestMapping(value = { "loginInfluencer" }, method = RequestMethod.GET)
				public String loginInfluencer(HttpSession session, Model model) throws Exception {
					
					
					return "influencer/loginInfluencer";
				}
		
		
		// pergunta Influencer
		
		@RequestMapping(value = { "perguntaInfluencer" }, method = RequestMethod.GET)
		public String perguntaInfluencer(HttpSession session, Model model) throws Exception {
			
			
			return "influencer/perguntaInfluencer";
		}
		
		// meus produtos
		
				@RequestMapping(value = { "meusProdutos" }, method = RequestMethod.GET)
				public String meusProdutos(HttpSession session, Model model) throws Exception {
					
					
					return "influencer/meusProdutos";
				}
				
		// mercado
				
				@RequestMapping(value = { "mercado" }, method = RequestMethod.GET)
				public String mercado(HttpSession session, Model model) throws Exception {
					
					
					return "influencer/mercado";
				}	
		
		// dadosDeCadastro
				
				@RequestMapping(value = { "dadosDeCadastro" }, method = RequestMethod.GET)
				public String dadosDeCadastro(HttpSession session, Model model) throws Exception {
					
					
					return "influencer/dadosDeCadastro";
				}
				
		// dadosDeCadastro
				
				@RequestMapping(value = { "dadosBancarios" }, method = RequestMethod.GET)
				public String dadosBancarios(HttpSession session, Model model) throws Exception {
					
					
					return "influencer/dadosBancarios";
				}
		
		
	
}
