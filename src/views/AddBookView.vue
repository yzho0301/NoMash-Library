<!-- src/views/AddBookView.vue -->
<template>
  <div>
    <!-- 1. 新增表单（原样保留） -->
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input
          type="text"
          v-model="isbn"
          id="isbn"
          required
          pattern="\d{0,4}"
          title="0~4 位数字"
        />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Adding…' : 'Add Book' }}
      </button>
    </form>

    <!-- 2. 动态查询控制 -->
    <h2>Books with ISBN > 1000</h2>
    <div class="query-bar">
      <label>排序字段
        <select v-model="orderField">
          <option value="isbn">isbn</option>
          <option value="name">name</option>
        </select>
      </label>
      <label>方向
        <select v-model="orderDir">
          <option value="asc">↑</option>
          <option value="desc">↓</option>
        </select>
      </label>
      <label>条数
        <input type="number" v-model.number="pageSize" min="1" />
      </label>
      <button @click="fetchBooks">查询</button>
    </div>

    <!-- 3. 列表 + 更新 / 删除 -->
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="edit(book)">change</button>
        <button @click="del(book.id)">delete</button>
      </li>
    </ul>

    <!-- 4. 简易编辑弹窗（内联） -->
    <div v-if="editId" class="edit-box">
      <h3>编辑</h3>
      <input v-model="editBook.isbn" type="number" />
      <input v-model="editBook.name" />
      <button @click="updateBook">保存</button>
      <button @click="cancelEdit">取消</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '@/firebase/init.js'
import {
  collection, query, where, orderBy, limit,
  addDoc, getDocs, updateDoc, deleteDoc, doc
} from 'firebase/firestore'

export default {
  setup() {
    /* 原状态 */
    const isbn   = ref('')
    const name   = ref('')
    const books  = ref([])
    const loading = ref(false)

    /* 新增：动态查询参数 */
    const orderField = ref('isbn')
    const orderDir   = ref('asc')
    const pageSize   = ref(20)

    /* 新增：编辑 */
    const editId   = ref(null)
    const editBook = ref({ isbn: 0, name: '' })

    /* 拉取：支持无限组合 where/orderBy/limit */
    const fetchBooks = async () => {
      const clauses = []
      clauses.push(where('isbn', '>', 1000))
      clauses.push(orderBy(orderField.value, orderDir.value))
      clauses.push(limit(pageSize.value))
      const q = query(collection(db, 'books'), ...clauses)
      const snap = await getDocs(q)
      books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    }

    /* 原新增函数 */
    const addBook = async () => {
      const val = (isbn.value || '').trim()
      const nm  = (name.value  || '').trim()
      if (!val || !nm) return alert('不能为空')
      if (!/^\d{0,4}$/.test(val)) return alert('ISBN 0-4 位')
      loading.value = true
      try {
        await addDoc(collection(db, 'books'), { isbn: Number(val), name: nm })
        isbn.value = ''
        name.value = ''
        await fetchBooks()
        alert('新增成功')
      } catch (e) {
        console.error(e)
        alert('添加失败')
      } finally {
        loading.value = false
      }
    }

    /* 新增：更新 / 删除 */
    const edit = b => {
      editId.value = b.id
      editBook.value = { isbn: b.isbn, name: b.name }
    }
    const updateBook = async () => {
      await updateDoc(doc(db, 'books', editId.value), editBook.value)
      editId.value = null
      await fetchBooks()
      alert('更新成功')
    }
    const del = async id => {
      if (!confirm('确认删除？')) return
      await deleteDoc(doc(db, 'books', id))
      await fetchBooks()
      alert('删除成功')
    }
    const cancelEdit = () => {
      editId.value = null
    }

    onMounted(fetchBooks)
    return {
      isbn, name, loading, addBook,
      books, orderField, orderDir, pageSize, fetchBooks,
      editId, editBook, edit, updateBook, del, cancelEdit
    }
  }
}
</script>

<style scoped>
.query-bar label { margin-right: 0.5rem; }
.edit-box { border: 1px solid #ccc; padding: 1rem; margin-top: 1rem; }
button { margin-left: 0.25rem; }
</style>