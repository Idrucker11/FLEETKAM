# FleetKAM — Sitio web corporativo

Sitio estático (HTML/CSS/JS puro, sin build ni dependencias) con la presentación de
las soluciones FleetKAM: Tecnología, Camiones, Transporte Público, Maquinaria,
Productos y Contacto.

Todo el contenido proviene exclusivamente del material fuente (4 PDF de FleetKAM).
No incluye datos de contacto reales, precios ni información no verificada — ver
las notas "pendiente de revisión" dentro del sitio.

## Estructura

```
.
├── index.html
├── tecnologia.html
├── camiones.html
├── transporte-publico.html
├── maquinaria.html
├── productos.html
├── contacto.html
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/*.jpg   (imágenes y diagramas extraídos de los PDF originales)
```

No hay backend, base de datos ni build step. Es 100% archivos estáticos.

## Cómo subirlo a GitHub

Desde la carpeta del proyecto (donde está este README):

```bash
git init
git add .
git commit -m "Sitio inicial FleetKAM"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```

Reemplazá `<tu-usuario>/<tu-repo>` por los datos de tu repositorio (creado
previamente y vacío en github.com/new).

## Cómo publicarlo con GitHub Pages (gratis, sin servidor)

1. En GitHub, andá a **Settings → Pages** del repositorio.
2. En "Source" elegí la rama `main` y la carpeta `/ (root)`.
3. Guardá. En 1–2 minutos el sitio queda disponible en:
   `https://<tu-usuario>.github.io/<tu-repo>/`

No hace falta configurar nada más: al ser HTML estático con rutas relativas,
funciona igual en local, en GitHub Pages o en cualquier hosting estático
(Netlify, Vercel, Cloudflare Pages, etc.).

## Ver el sitio en local antes de subirlo

Cualquiera de estas opciones sirve (abrir `index.html` directo con doble clic
también funciona, ya que no depende de un servidor):

```bash
# Opción con Python (ya viene instalado en la mayoría de los sistemas)
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

## Pendientes señalados dentro del sitio

- Datos de contacto reales (dirección, teléfono, email, redes sociales).
- Destino/proceso posterior al envío del formulario de contacto.
- Detalle funcional de "AI Human Machine Interface" y "AIoT" (solo nombrados
  en el material fuente, sin descripción adicional).
- Especificaciones del modelo `HDW871` (aparece sin bullets de detalle en el
  diagrama de origen).
