import { createRouter, createWebHistory } from 'vue-router'
import ProdutosView from '@/views/ProdutosView.vue'
import CategoriasView from '@/views/CategoriasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'produtos', component: ProdutosView },
    { path: '/categorias', name: 'categorias', component: CategoriasView },
  ],
})

export default router
