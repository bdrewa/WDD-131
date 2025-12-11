var menuButton = document.querySelector('.menu-button');
var navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', function() {
  if (navLinks.classList.contains('hide')) {
    navLinks.classList.remove('hide');
    menuButton.setAttribute('aria-expanded', 'true');
  } else {
    navLinks.classList.add('hide');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

function handleResize() {
  if (window.innerWidth > 1000) {
    navLinks.classList.remove('hide');
  } else {
    navLinks.classList.add('hide');
    menuButton.setAttribute('aria-expanded', 'false');
  }
}

window.addEventListener('resize', handleResize);
handleResize();

var gallery = document.querySelector('.gallery');

function viewerTemplate(pic, words) {
  return '<div class="viewer-content"><img src="' + pic + '" alt="' + words + '"><button class="close-viewer">X</button></div>';
}

function openViewer(img) {
  var src = img.getAttribute('src');
  var alt = img.alt;
  
  var fullSrc = src.replace('-sm', '-full');

  var dialog = document.createElement('dialog');
  dialog.innerHTML = viewerTemplate(fullSrc, alt);
  document.body.appendChild(dialog);
  dialog.showModal();

  var closeButton = dialog.querySelector('.close-viewer');
  closeButton.addEventListener('click', function() {
    dialog.close();
    document.body.removeChild(dialog);
  });

  dialog.addEventListener('click', function(event) {
    if (event.target === dialog) {
      dialog.close();
      document.body.removeChild(dialog);
    }
  });
}

gallery.addEventListener('click', function(event) {
  var clickedImg = event.target.closest('img');
  if (clickedImg) {
    openViewer(clickedImg);
  }
});