<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Produtos</RouterLink> |
    <RouterLink to="/categorias">Categorias</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
