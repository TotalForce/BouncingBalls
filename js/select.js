for (const dropdown of document.querySelectorAll(".select")) {
		dropdown.addEventListener('mouseover', function() {
			this.classList.add('open');//toggle
		  })
}

for (const option of document.querySelectorAll(".select_option")) {
    option.addEventListener('click', function() {
		
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.select_option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select_trigger span').textContent = this.textContent;
			
        }
    })
}

window.addEventListener('mouseover', function(e) {
    for (const select of document.querySelectorAll('.select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});

/*
for (const dropdown of document.querySelectorAll(".select")) {
		dropdown.addEventListener('mouseover', function() {
			this.classList.add('open');//toggle
		  })
}



*/