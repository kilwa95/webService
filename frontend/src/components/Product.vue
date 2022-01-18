<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <!-- <TableCollapse
          :products="gridData"
          :columns="gridColumns"
          :category="{ name: 'Products' } ? category : category"
          :add="add"
          :remove="remove"
        /> -->
        <section class="container py-3 py-lg-5">
          <h1 class="text-center pb-3 pb-lg-5">
            Bootstrap Responsive Sticky Table
          </h1>
          <div class="table-col-3">
            <div
              class="
                sticky-top
                table-sticky-header
                overflow-scroll
                d-flex
                align-items-center
                bg-primary
                py-3
              "
            >
              <div class="h3 m-0 px-3">Features</div>
              <div class="h4 m-0 text-center px-3">Pizza</div>
              <div class="h4 m-0 text-center px-3">Hamburgers</div>
              <div class="h4 m-0 text-center px-3">Icecream</div>
            </div>
            <div class="table-responsive table-sticky">
              <table class="table table-bordered table-striped">
                <thead class="visually-hidden">
                  <tr>
                    <th scope="col">Features</th>
                    <th scope="col">Pizza</th>
                    <th scope="col">Hamburgers</th>
                    <th scope="col">Icecream</th>
                  </tr>
                </thead>
                <tbody class="text-center align-middle">
                  <tr>
                    <th class="text-start p-3" scope="row">Cold</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Delicious</th>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Greesy</th>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Healthy</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Gross</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Spicy</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Hot</th>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Sweet</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Cold</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Delicious</th>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Greesy</th>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Healthy</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Gross</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Spicy</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Hot</th>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                  </tr>
                  <tr>
                    <th class="text-start p-3" scope="row">Sweet</th>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-ban text-danger"></span></td>
                    <td><span class="fas fa-check text-success"></span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
// import TableCollapse from "./lib/TableCollapse.vue";

export default {
  props: {
    category: Object,
    add: Boolean,
    remove: Boolean,
  },
  data() {
    return {
      searchQuery: "",
      gridColumns: ["name", "quantity", "category", "price"],
      gridData: [
        { id: 1, name: "Viande", quantity: 100, category: "Meet", price: 0.4 },
        {
          id: 2,
          name: "Tomate",
          quantity: 100,
          category: "Vegtebales",
          price: 0.4,
        },
      ],
    };
  },
  methods: {
    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },

    avoidEnter: () => console.log("Enter avoided"),
  },

  components: {
    // TableCollapse,
  },
};
</script>
<style lang="css">
.table-col-3 .table-sticky-header > div:first-child,
.table-col-3 tbody th,
.table-col-3 thead th {
  width: 40%;
  min-width: 200px;
}
.table-col-3 .table-sticky-header > div:not(:first-child),
.table-col-3 tbody td {
  width: 20%;
  min-width: 100px;
}
.table-col-3 .table-sticky table,
.table-col-3 .table-sticky-header {
  width: calc(100% - 1px);
  margin: auto;
}
.table-col-3 .table-sticky-header {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.table-col-3 .table-sticky-header::-webkit-scrollbar {
  display: none;
}
</style>