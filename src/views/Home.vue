<template>
  <div>
    <navbar name="Kursvärderingsportalen" url="/"></navbar>
    
    <b-container class="py-4">
      <h1>Kursvärderingsportalen</h1>
      <p
        v-if="$api.state.user"
        class="large"
      >Välkommen {{($api.state.user.name) ? $api.state.user.name.split(" ")[0] : $api.state.user.username}}!</p>
      <div class="py-2">
        <b-button to="/portal" variant="primary" class="mr-1">Portalen</b-button>
        <b-button to="/admin" variant="success" class="mr-1">Rapport</b-button>
        <b-button to="/csv" variant="warning">CSV</b-button>
      </div>

      <!-- Dev login -->
      <b-row class="py-3">
        <b-col lg="6">
          <b-link v-b-toggle.collapse-1 class="text-danger">Dev login</b-link>
          <b-collapse id="collapse-1">
            <b-form @submit.prevent="$api.dev(form)" class="py-4">
              <h3>Logga in</h3>
              <b-form-group label="name">
                <b-form-input type="text" v-model="form.name" required />
              </b-form-group>
              <b-form-group label="username">
                <b-form-input type="text" v-model="form.username" required />
              </b-form-group>
              <b-form-group label="role">
                <b-form-input type="text" v-model="form.role" required defaultValue="employee" />
              </b-form-group>
              <b-button variant="primary" type="submit">Logga in</b-button>
            </b-form>
          </b-collapse>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
export default {
  name: "Home",
  components: {
    navbar
  },
  data: function() {
    return {
      form: {
        name: "Maria Andersson",
        username: "maan1234",
        role: "employee"
      }
    };
  }
};
</script>
