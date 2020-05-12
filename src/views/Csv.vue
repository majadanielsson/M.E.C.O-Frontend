<template>
  <div>
    <navbar name="Kursvärderingsportalen" url="/csv"></navbar>
    <b-container class="my-4">
      <h1 class="text-dark">Ladda upp formulär</h1>
      <b-row>
        <b-col md="10" lg="8">
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
