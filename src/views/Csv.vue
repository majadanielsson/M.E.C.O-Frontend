<template>
<div>
  <navbar name="Kursvärderingsportalen" url="/csv"></navbar>
  <b-container class="my-4">
    <template v-if="!data">
      <h1 class="text-dark">Ladda upp formulär</h1>
      <b-row>
        <b-col md="10" lg="8">
          <b-form-file placeholder="Välj eller släpp en fil..." browse-text="Bläddra" class="my-3" type="file" id="file" @change="readFile" />
        </b-col>
      </b-row>
</template>
<template v-else>
<h1 class="text-dark">Frågor</h1>
<div v-for="(question, qIndex) in data[0]" :key="qIndex">
  <div v-if="question">
    <h2>{{question}}</h2>
    <p v-for="(answer, aIndex) in Object.keys(answers[qIndex])" :key="aIndex">{{answer}}: {{answers[qIndex][answer]}}</p>
  </div>
</div>
</template>
</b-container>
</div>
  </template>

  <script>
  import navbar from "@/components/navbar"
  import Papa from "papaparse"
  export default {
    data: function() {
      return {
        data: null,
      }
    },
    computed: {
      answers: function() {
        var result = [];
        for (var k=0; k<this.data[0].length; k++) result[k] = {};
        for (var i=1; i<this.data.length; i++) {
          for (var j=0; j<this.data[0].length; j++) {
            if (result[j][this.data[i][j]]) result[j][this.data[i][j]]++;
            else result[j][this.data[i][j]] = 1;
          }
        }
        console.log(result);
        return result;
      }
    },
    components: {
      navbar
    },
    methods: {
      readFile: async function() {
        Papa.parse(document.getElementById("file").files[0], {
          worker: true,
          skipEmptyLines: true,
          complete: result => this.data = result.data,
        });
      }
    }
  }
  </script>
