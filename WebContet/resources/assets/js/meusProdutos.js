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