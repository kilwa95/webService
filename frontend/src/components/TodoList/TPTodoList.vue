<template>
  <div>
    <input
      @keydown.enter.prevent="(event) => CreateCategory(event.target.value)"
    />
    <ul>
      <li v-for="item in items" :key="item.id">
        <span>
          {{ item.name }}
        </span>
        <button @click.stop="deleteItem(item)">Delete</button>
        <button @click="editItem(items)">Edit</button>
        <button @click="openModall(item, true)">Add Products</button>
      </li>
    </ul>

    <modal :open="openModal" @close="openModall(null, false)">
      <ChosenProducts :category="category" :remove="true" />
      <Product :add="true" :category="category" />
    </modal>
  </div>
</template>

<script>
import Modal from "../lib/Modal.vue";
import Product from "../Product.vue";
import ChosenProducts from "../ChosenProducts.vue";

export default {
  name: "TodoList",
  data() {
    return {
      category: Object,
      openModal: false,
      items: [],
    };
  },
  methods: {
    openModall(category, bool) {
      this.openModal = bool;
      this.category = category;
    },
    CreateCategory(name) {
      this.items.push({
        id: Date.now(),
        name,
      });
    },
    editItem(i) {
      this.items.splice(
        this.items.findIndex((item) => i.id === item.id),
        1,
        i
      );
    },
    deleteItem(item) {
      this.items.splice(this.items.indexOf(item), 1);
    },
  },
  mounted() {
    this.items = [
      {
        id: 1,
        name: "Vegtebals",
      },
    ];
  },
  components: {
    Modal,
    Product,
    ChosenProducts,
  },
};
</script>