
<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="key in columns"
          :key="key.name"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }"
        >
          {{ key | capitalize }}

          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="product in filteredProductsOrders" :key="product.name">
        <!-- <td>
          {{ product.to }}
        </td>
        <td>
          {{ product.category }}
        </td>
        <td>
          {{ product.name }}
        </td> -->

        <td v-for="key in columns" :key="key">
          {{ product[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script>
export default {
  props: {
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
  },
};
</script>