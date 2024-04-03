  $(document).ready(function () {
   $(".sub-btn").click(function () {
        $(this).next(".sub-menu").slideToggle();
        $(this).find(".dropdown").toggleClass("rotate");
      });
    });
    
      const filterInput = document.getElementById('filterInput');
    const cards = document.querySelectorAll('.card');

    filterInput.addEventListener('input', () => {
        const searchText = filterInput.value.toLowerCase().trim();

        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchText)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    $.ajax({
		url: url_base + '/categorias',
		type: "GET",
		async: false,
	}).done(function(data) {
	
	 $('#categoria').append($('<option>', {
				value: "Filtre por Categoria",
				text : "Filtre por Categoria", }));
		
		
		$.each(data, function(index, item) {
				
               		 $('#categoria').append($('<option>', { 
                     value: item.categoria,
                     id: item.idCategoria,
                     text : item.categoria ,
                     name : item.categoria
                 }));
           })
	})
    
     $("#categoria").change(function () { 
			escondeCategoria($("#categoria").val())
	 });
    
    function escondeCategoria(categoria){
		if(categoria == 'Filtre por Categoria'){
			$(".loja").fadeIn();
		}
		else{
			$(".loja").fadeOut();
			$("." + categoria).fadeIn();	
		}	
		
	};
	
	 $.ajax({
		url: url_base + '/subcategorias',
		type: "GET",
		async: false,
	}).done(function(data) {
	
	 $('#subCategoria').append($('<option>', {
				value: "Filtre por Sub-Categoria",
				text : "Filtre por Sub-Categoria", }));
		
		
		$.each(data, function(index, item) {
				
               		 $('#subCategoria').append($('<option>', { 
                     value: item.nome,
                     id: item.idCategoria,
                     text : item.nome ,
                     name : item.nome
                 }));
           })
	})
    
     $("#subCategoria").change(function () { 
			escondeSubCategoria($("#subCategoria").val()) 
	 });
    
    function escondeSubCategoria(sub){
		if(sub == 'Filtre por Sub-Categoria'){
			$(".loja").fadeIn();
		}
		else{
			$(".loja").fadeOut();
			$("." + sub).fadeIn();	
		}	
	};
	
	
	
	
    
    
    