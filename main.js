// FleetKAM site — shared behavior (nav, back-to-top, contact form)
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Back-to-top button
  var backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 640) backTop.classList.add('visible');
      else backTop.classList.remove('visible');
    }, { passive: true });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Product catalog filter (Productos page)
  var filterBar = document.querySelector('[data-filter-bar]');
  if (filterBar) {
    var buttons = filterBar.querySelectorAll('button');
    var items = document.querySelectorAll('[data-area]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        var filter = btn.getAttribute('data-filter');
        items.forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-area') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Contact form: client-side validation + simulated states.
  // No backend/CRM has been provided in the source material, so
  // submission is intentionally not wired to any endpoint.
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    function setError(field, message) {
      var wrap = field.closest('.field');
      var msg = wrap.querySelector('.error-msg');
      if (message) {
        wrap.classList.add('has-error');
        if (msg) msg.textContent = message;
        field.setAttribute('aria-invalid', 'true');
      } else {
        wrap.classList.remove('has-error');
        if (msg) msg.textContent = '';
        field.removeAttribute('aria-invalid');
      }
    }

    function validate() {
      var valid = true;
      var name = form.querySelector('#f-name');
      var email = form.querySelector('#f-email');
      var interest = form.querySelector('#f-interest');
      var message = form.querySelector('#f-message');

      if (!name.value.trim()) { setError(name, 'Ingresá tu nombre.'); valid = false; }
      else setError(name, '');

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) { setError(email, 'Ingresá un correo electrónico válido.'); valid = false; }
      else setError(email, '');

      if (!interest.value) { setError(interest, 'Seleccioná una opción.'); valid = false; }
      else setError(interest, '');

      if (!message.value.trim()) { setError(message, 'Contanos brevemente tu consulta.'); valid = false; }
      else setError(message, '');

      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        status.className = 'form-status visible';
        status.style.background = '#fdeceb';
        status.style.color = '#a02f2f';
        status.textContent = 'Revisá los campos marcados antes de continuar.';
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';
      status.className = 'form-status visible pending';
      status.textContent = 'El envío del formulario todavía no está conectado a un sistema de destino (dato pendiente de definición). Tu consulta no fue transmitida.';
      window.setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar consulta';
      }, 900);
    });

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('blur', validate);
    });
  }
});
