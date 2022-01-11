
<template>
  <div class="p-3">
    {{ chosenProducts }}
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
          <tr v-for="product in filteredProductsOrders" :key="product.name">
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
              <div class="text-left font-medium text-green-500">
                <button @click="AddToCategory(product)">Add</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    add: Boolean,
    products: Array,
    columns: Array,
    filterKey: String,
  },
  data: function () {
    var sortOrders = {};

    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: "",
      sortOrders: sortOrders,
      chosenProducts: [],
    };
  },
  computed: {
    filteredProductsOrders: function () {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var products = this.products;
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
    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    AddToCategory(item) {
      this.chosenProducts.push({
        id: item.id,
        name: item.name,
      });
    },
  },
};
</script>