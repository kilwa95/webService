<template>
<table id="firstTable">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Profession</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in rows">
      <td>{{row.id}}</td>
      <td>{{row.name}}</td>
      <td>{{row.phone}}</td>
      <td>{{row.profession}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>

export default {
  props: ['rows'],
};
</script>
<style scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>