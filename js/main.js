(function () {
	window.load = function (url, onSuccess, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.addEventListener('load', function () {
			if (xhr.status === 200) {
				onSuccess(xhr.response);
			} else {
				onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
			}
		});

		xhr.addEventListener('error', function () {
			onError('Произошла ошибка соединения');
		});

		xhr.addEventListener('timeout', function () {
			onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
		});

		xhr.timeout = 10000; 

		xhr.open('GET', url);
		xhr.send();
	};
	var topRecentTemplate = document.querySelector('#top-recent').content;
	var recentPosts = document.querySelector('.top__recent');
	var postsElement = document.querySelector('.top_headlines');
	var searchInput = document.querySelector('.search-input');
	var countrySelect = document.querySelector('.country-select');
	var loadDataButton = document.querySelector('.load-data-button');
	var newsContent = document.querySelector('.news');
	
	var loadAnyArticles = function (data) {
		data.articles.forEach(function (article) {
			var topHeadlinesTemplateFragment = document.createDocumentFragment();
			var topHeadlinesElement = document.importNode(topRecentTemplate, true);

			topHeadlinesElement.querySelector('.img-fluid').src = article.urlToImage;
			topHeadlinesElement.querySelector('.img-fluid').alt = article.title;
			topHeadlinesElement.querySelector('.card-title').textContent = article.title;
			topHeadlinesElement.querySelector('.news__link').href = article.url;

			topHeadlinesTemplateFragment.appendChild(topHeadlinesElement);
			postsElement.appendChild(topHeadlinesTemplateFragment);
		});
	};

	var onError = function (error) {
		alert(error);
	};


	var loadRecentArticles = function (response) {
		response.articles.forEach(function (article) {
			var topRecentTemplateFragment = document.createDocumentFragment();
			var topRecentElement = document.importNode(topRecentTemplate, true);

			topRecentElement.querySelector('.img-fluid').src = article.urlToImage;
			topRecentElement.querySelector('.img-fluid').alt = article.title;
			topRecentElement.querySelector('.card-title').textContent = article.title;
			topRecentElement.querySelector('.news__link').href = article.url;

			topRecentTemplateFragment.appendChild(topRecentElement);
			recentPosts.appendChild(topRecentTemplateFragment);
		});
	};

	loadDataButton.addEventListener('click', function () {
		if (true) {}
			newsContent.classList.add('news-show');

		var inputValue = searchInput.value;
		var selectValue = countrySelect.value;
		window.load('https://newsapi.org/v2/top-headlines?country=' + selectValue + '&pageSize=25&apiKey=beab9ebba3344a45bf6e5f3d1cc1d62f', loadAnyArticles, onError);
		window.load('https://newsapi.org/v2/everything?q=' + inputValue + '&pageSize=25&apiKey=beab9ebba3344a45bf6e5f3d1cc1d62f', loadRecentArticles, onError);
	});
})();
