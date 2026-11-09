// Endereço da API, lido do arquivo .env (VITE_API_URL)
const API = import.meta.env.VITE_API_URL

// Função base: toda chamada à API passa por aqui
async function pedir(caminho, opcoes = {}) {
  const resposta = await fetch(`${API}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  })

  if (!resposta.ok) {
    throw new Error(`A API respondeu com erro ${resposta.status}`)
  }

  // 204 = sucesso sem conteúdo (PUT e DELETE)
  return resposta.status === 204 ? null : resposta.json()
}

export const listarProdutos = () => pedir('/api/produtos')

export const criarProduto = (produto) =>
  pedir('/api/produtos', { method: 'POST', body: JSON.stringify(produto) })

export const atualizarProduto = (id, produto) =>
  pedir(`/api/produtos/${id}`, { method: 'PUT', body: JSON.stringify(produto) })

export const excluirProduto = (id) =>
  pedir(`/api/produtos/${id}`, { method: 'DELETE' })
