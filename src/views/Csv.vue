<template>
  <div>
  <navbar name="Kursvärderingsportalen" url="/csv"></navbar>
    <b-container class="py-4">
      <input type="file" id="file" @change="readFile" />
      <b-table v-if="data" striped hover :items="data"></b-table>
    </b-container>
</div>
  </template>

  <script>
  import navbar from "@/components/navbar"
  import Papa from "papaparse"
  export default {
    data: function() {
      return {
        file: null,
        data: null
      }
    },
    components: {
      navbar
    },
    methods: {
      readFile: async function() {
        Papa.parse(document.getElementById("file").files[0], {
          complete: result => this.data = result.data,
        });
      }
    }
  }
  </script>
