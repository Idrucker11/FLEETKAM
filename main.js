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

  // Product catalog filter (Productos page, if present)
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

  // Contact form: client-side validation + envío real a Formspree
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

    function showStatus(text, ok) {
      if (!status) return;
      status.className = 'form-status visible';
      status.style.background = ok ? '#e8f7ee' : '#fdeceb';
      status.style.color = ok ? '#1c6b3a' : '#a02f2f';
      status.textContent = text;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        showStatus('Revisá los campos marcados antes de continuar.', false);
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';
      showStatus('Enviando tu consulta…', true);

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          showStatus('Tu consulta fue enviada correctamente.', true);
        } else {
          showStatus('No pudimos enviar tu consulta. Intentá nuevamente.', false);
        }
      }).catch(function () {
        showStatus('No pudimos enviar tu consulta. Intentá nuevamente.', false);
      }).then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar consulta';
      });
    });

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('blur', validate);
    });
  }
});
