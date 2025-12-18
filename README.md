# Proyecto  con React / Typescript - CSS Modules y API's
Consulta de la api open weather para obtener coordenadas a partir de una ciudad y un pais y despues el despliegue de el clima local

---

## 🚀 Tecnologías utilizadas
- [React](https://react.dev/) → Librería principal para la UI
- [Vite](https://vitejs.dev/) → Bundler rápido para desarrollo y build
- [TypeScript](https://www.typescriptlang.org/) → Tipado estático y robustez en el código
- *Custom hooks** → Consulta a la api de Open Weather

---

## 📂 Estructura del proyecto
src/ components/        # Componentes reutilizables (formularios, listas, etc.) 
__test__/               # Realiza pruebas (por el momento sanity tests para probar el CI/CD)
data/                   # Elementos del drop menu 
hooks/                  # Carpeta con hooks para facilitar acceso a la información
App.tsx                 # Componente principal main.tsx          # Punto de entrada

---

## ⚙️ Instalación y uso
1. Clonar el repositorio:
  ```bash
  git clone https://github.com/tchock42/clima-react.git
  cd clima-react

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```
4. Generar el build de producción:
```bash
npm run build
```
5. Previsualizar build
```bash
npm run preview
```

## 🧪 Scripts disponibles
- npm run dev → entorno local con hot reload
- npm run build → build optimizado para producción
- npm run preview → servidor de preview del build
- npm run lint → verificación de estilo con ESLint
- npm run type-check → validación de tipos con TypeScript
- npm run test → pruebas unitarias (si se agregan con Vitest)

## 🎯 Funcionalidades principales
- Formulario con información de país y ciudad
- Consulta mediante la api de Open Weather

## 📦 CI/CD
Este proyecto puede desplegarse fácilmente en plataformas como:
- Vercel (integración directa con GitLab/GitHub)
- Netlify
- GitLab Pages
El pipeline recomendado incluye:
- Lint (npm run lint)
- Type-check (npm run type-check)
- Tests (npm run test)
- Build (npm run build)
- Deploy automático

[![CI/CD Pipeline](https://github.com/tchock42/clima-react/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/tchock42/clima-react/actions/workflows/ci-cd.yml)

## 📸 Demo
([Página en Vercel](https://tchock42.github.io/clima-react/))
