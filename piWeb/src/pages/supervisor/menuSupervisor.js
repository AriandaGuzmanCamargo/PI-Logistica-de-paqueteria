(function(){
  var btnMenu = document.getElementById('btnMenu');
  var container = document.getElementById('menuContainer');
  var backdrop = document.getElementById('menuBackdrop');

  fetch('/piWeb/src/pages/supervisor/menuSupervisor.html')
    .then(function(r){ return r.text(); })
    .then(function(html){
      container.innerHTML = html;
      var current = location.pathname;
      container.querySelectorAll('.menu-hamburguesa__item').forEach(function(item){
        if(item.getAttribute('href') === current){
          item.classList.add('menu-hamburguesa__item--activo');
        }
      });
      var btnCerrar = container.querySelector('.menu-hamburguesa__cerrar');
      if(btnCerrar) btnCerrar.addEventListener('click', cerrarMenu);
    });

  function abrirMenu(){
    container.classList.add('menu-overlay--abierto');
    backdrop.classList.add('menu-overlay__backdrop--visible');
  }
  function cerrarMenu(){
    container.classList.remove('menu-overlay--abierto');
    backdrop.classList.remove('menu-overlay__backdrop--visible');
  }

  btnMenu.addEventListener('click', function(){
    if(container.classList.contains('menu-overlay--abierto')){
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  backdrop.addEventListener('click', cerrarMenu);
})();
