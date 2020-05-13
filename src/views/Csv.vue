<template>
  <div>
    <navbar name="Kursvärderingsportalen" url="/portal"></navbar>
    <b-container class="my-4">
      <b-row align-h="center">
        <b-col md="10" lg="8">
          <h1 class="text-dark">Uppladdning av kursvärderingar</h1>
          <p>
            <b-link href="/download/Kursvärdering.csv" download>Ladda ner mallen</b-link>, fyll i, och ladda upp
          </p>

          <b-form @submit.prevent="$api.csv(file)">
            <b-form-file
              placeholder="Välj eller släpp en fil..."
              browse-text="Bläddra"
              class="my-3"
              type="file"
              accept=".csv"
              v-model="file"
              id="file"
            />
            <b-button variant="primary" type="submit">Ladda upp</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

  <script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      file: null
    };
  },
  components: {
    navbar
  }
};
</script>