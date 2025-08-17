document.addEventListener('pjax:complete', function () {
    if (window.initLocalSearch) window.initLocalSearch();
});
