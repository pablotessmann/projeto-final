<script setup>
import { ref, onMounted } from 'vue'
import {
  listarProdutos, criarProduto, excluirProduto,
} from '@/services/api'

// Estado da tela
const produtos = ref([])
const novo = ref({ nome: '', preco: 0 })
const erro = ref('')

// Busca a lista na API
async function carregar() {
  try {
    erro.value = ''
    produtos.value = await listarProdutos()
  } catch {
    erro.value = 'Erro ao carregar. A API está rodando?'
  }
}

// Envia o formulário
async function salvar() {
  await criarProduto(novo.value)
  novo.value = { nome: '', preco: 0 }
  await carregar()
}

async function excluir(id) {
  await excluirProduto(id)
  await carregar()
}

// Formata 19.9 como "R$ 19,90"
const moeda = (valor) =>
  valor.toLocaleString('pt-BR',
    { style: 'currency', currency: 'BRL' })

// Quando a tela abre, carrega a lista
onMounted(carregar)
</script>

<template>
  <h1>Produtos</h1>

  <form @submit.prevent="salvar">
    <input v-model="novo.nome" placeholder="Nome" required />
    <input v-model.number="novo.preco" type="number"
           step="0.01" min="0" required />
    <button type="submit">Adicionar</button>
  </form>

  <p v-if="erro" class="erro">{{ erro }}</p>

  <ul>
    <li v-for="p in produtos" :key="p.id">
      {{ p.nome }}: {{ moeda(p.preco) }}
      <button @click="excluir(p.id)">Excluir</button>
    </li>
  </ul>
</template>

<style scoped>
.erro {
  color: #b00020;
}
</style>
