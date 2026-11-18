<script setup>
import { ref, onMounted } from 'vue'
import {
  listarCategorias, criarCategoria, excluirCategoria,
} from '@/services/api'

// Estado da tela
const categorias = ref([])
const nova = ref({ nome: '', descricao: '' })
const erro = ref('')

// Busca a lista na API
async function carregar() {
  try {
    erro.value = ''
    categorias.value = await listarCategorias()
  } catch {
    erro.value = 'Erro ao carregar. A API está rodando?'
  }
}

// Envia o formulário
async function salvar() {
  try {
    await criarCategoria(nova.value)
    nova.value = { nome: '', descricao: '' }
    await carregar()
  } catch {
    erro.value = 'Não foi possível salvar a categoria.'
  }
}

async function excluir(id) {
  try {
    await excluirCategoria(id)
    await carregar()
  } catch {
    erro.value = 'Não foi possível excluir a categoria.'
  }
}

// Quando a tela abre, carrega a lista
onMounted(carregar)
</script>

<template>
  <h1>Categorias</h1>

  <form @submit.prevent="salvar">
    <input v-model="nova.nome" placeholder="Nome" required />
    <input v-model="nova.descricao" placeholder="Descrição (opcional)" />
    <button type="submit">Adicionar</button>
  </form>

  <p v-if="erro" class="erro">{{ erro }}</p>

  <ul>
    <li v-for="c in categorias" :key="c.id">
      <strong>{{ c.nome }}</strong>
      <span v-if="c.descricao"> — {{ c.descricao }}</span>
      <button @click="excluir(c.id)">Excluir</button>
    </li>
  </ul>
</template>

<style scoped>
.erro {
  color: #b00020;
}
</style>
