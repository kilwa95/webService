
<template>
  <div class="p-3">
    <div class="overflow-x-auto">
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
          <tr v-for="product in filteredProductsOrders" :key="product">
            <td class="p-2 whitespace-nowrap" v-for="key in columns" :key="key">
              <div class="flex items-center">
                <!-- <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                  <img
                    class="rounded-full"
                    src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                    width="40"
                    height="40"
                    alt="Alex Shatov"
                  />
                </div> -->
                <div class="font-medium text-gray-800">{{ product[key] }}</div>
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-left">{{ product[key] }}</div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-left font-medium text-green-500">
                {{ product[key] }}
              </div>
            </td>
            <!-- <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-center">🇺 {{ product[key] }}</div>
            </td> -->

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
    </div>
  </div>
</template>


<script>
import bus from "../../bus.js";
export default {
  props: {
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

    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    });
    // this.products.forEach(function (key) {
    //   showHide[key] = key;
    //   console.log(showHide[key]);
    // });
    return {
      sortKey: "",
      sortOrders: sortOrders,
      showHide: showHide,
    };
  },
  mounted() {
    this.sortBy(0);
  },
  computed: {
    filteredProductsOrders: function () {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var products = this.fulldata;

      // products.map((d) => this.showHide.push((d.isChosen = false)));
      if (filterKey) {
        products = products.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }
      if (sortKey) {
        products = products.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
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
  },
};
</script>