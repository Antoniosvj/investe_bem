document.querySelectorAll('.destaque').forEach(item => {
	item.addEventListener('click', function(e) {
		const article = this.getAttribute('data-article');
		localStorage.setItem('selectedArticle', article);
	})
})
