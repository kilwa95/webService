
<template>
  <div class="p-3">
    <div
      class="overflow-x-auto"
      v-if="Object.entries(filteredProductsOrders['data']).length"
    >
      <table class="table-auto w-full">
        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th
              v-for="key in columns"
              :key="key.name"
              @click="sortBy(key)"
              :class="{ active: sortKey == key } + 'p-2 whitespace-nowrap'"
            >
              <div class="font-semibold text-left">
                {{ key | capitalize }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-100">
          <tr v-for="product in filteredProductsOrders" :key="product.id">
            <td class="p-2 whitespace-nowrap">
              <div class="text-left">
                {{ product["firstName"] }}
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-left font-medium text-green-500">
                {{ product["lastName"] }}
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-left font-medium text-green-500">
                {{ product["email"] }}
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-left font-medium text-green-500">
                {{ product["name"] }}
              </div>
            </td>
            <td
              class="p-2 whitespace-nowrap"
              v-if="product['status'] == 'created'"
            >
              <div class="text-left font-medium text-green-500">Pending</div>
            </td>
            <td class="p-2 whitespace-nowrap" v-else>
              <div class="text-left font-medium text-green-500">
                Accepted by:
              </div>
            </td>
            <td class="p-2 whitespace-nowrap" v-if="isSupplier">
              <div class="text-left font-medium text-green-500">
                <button @click="openRequest('filteredProductsOrders', true)">
                  View Request
                </button>
              </div>
            </td>

            <td class="p-2 whitespace-nowrap" v-if="add == true">
              <div
                class="text-left font-medium text-green-500"
                v-if="!product['isChosen']"
              >
                <button @click="AddToCategory(product)">Add</button>
              </div>
            </td>
            <td class="p-2 whitespace-nowrap" v-if="remove == true">
              <div class="text-left font-medium text-green-500">
                <button @click="RemoveFromCategory(product)">Remove</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <modal
        :open="openModal"
        @close="openRequest(null, false)"
        v-if="isSupplier"
      >
        <RequestDetails :fulldata="fulldata" />
      </modal>
    </div>
    <div class="overflow-x-auto" v-else>No requests yet</div>
  </div>
</template>


<script>
import RequestDetails from "../RequestDetails.vue";

import Modal from "../lib/Modal.vue";
import bus from "../../bus.js";
export default {
  props: {
    filteredData: Object,
    remove: Boolean,
    add: Boolean,
    products: Array,
    columns: Array,
    fulldata: Object,

    filterKey: String,
  },
  data: function () {
    var sortOrders = {};
    var showHide = {};

    // this.columns.forEach(function (key) {
    //   sortOrders[key] = 1;
    // });
    // this.products.forEach(function (key) {
    //   showHide[key] = key;
    //   console.log(showHide[key]);
    // });
    return {
      sortKey: "",
      sortOrders: sortOrders,
      showHide: showHide,
      openModal: false,
      category: Object,
    };
  },
  components: {
    Modal,
    RequestDetails,
  },
  mounted() {
    console.log(this.fulldata);
  },
  computed: {
    isSupplier() {
      try {
        if (this.$store.state.logged_user["user"]["roles"] == "ROLE_PROVIDER") {
          return true;
        }
      } catch (err) {
        err;
      }
      return false;
    },
    filteredProductsOrders: function () {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      console.log(this.filteredData);
      var products = {
        data: this.filteredData,
      };
      if (filterKey) {
        products = products.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
        console.log(products);
      }
      if (sortKey) {
        products = products.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
        console.log(products);
      }
      return products;
    },
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  methods: {
    editItem: function (item) {
      this._originalPerson = Object.assign({}, item);
      item.edit = true;
    },

    cancelItem: function (item) {
      Object.assign(item, this._originalPerson);
      item.edit = false;
    },

    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    AddToCategory(item) {
      // this.showHide[item.id].isChosen = true;

      // console.log(this.showHide[item.id]);
      bus.$emit("chosenProducts", {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        price: item.price,
      });
    },

    RemoveFromCategory(item) {
      bus.$emit("removeProducts", {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        price: item.price,
      });
    },
    openRequest(category, bool) {
      this.openModal = bool;
      this.category = category;
    },
  },
};
</script>