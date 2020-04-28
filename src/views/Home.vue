<template>
<div>
  <navbar name="Kursvärderingsportalen" url="/">
  </navbar>

  <b-container class="py-4">
    <h1>Kursvärderingsportalen</h1>
    <p v-if="$root.user" class="large">Välkommen {{($root.user.name) ? $root.user.name.split(" ")[0] : $root.user.username}}!</p>
    <div class="py-2">
      <b-button to="/portal" variant="primary" class="mr-1">Portalen</b-button>
      <b-button to="/report" variant="success" class="mr-1">Rapport</b-button>
      <b-button to="/csv" variant="warning">CSV</b-button>
    </div>

    <!-- Dev login -->
    <b-row class="py-3">
      <b-col lg="6">
        <b-link v-b-toggle.collapse-1 class="text-danger">Dev login</b-link>
        <b-collapse id="collapse-1">
          <b-form @submit.prevent="devLogin" class="py-4">
            <h3>Logga in</h3>
            <b-form-group label="name">
              <b-form-input type="text" v-model="form.name" required />
            </b-form-group>
            <b-form-group label="username">
              <b-form-input type="text" v-model="form.username" required />
            </b-form-group>
            <b-form-group label="role">
              <b-form-input type="text" v-model="form.role" required defaultValue="student" />
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
import navbar from "@/components/navbar"
import api from "@/modules/api"
export default {
  name: 'Home',
  components: {
    navbar
  },
  methods: {
    devLogin: async function() {
      const data = await api.cas.dev(this.form);
      this.$root.user = data;
      window.sessionStorage.setItem("user", JSON.stringify(data));
    }
  },
  data: function() {
    return {
      form: {
        name: "Maria Andersson",
        username: "maan1234",
        role: "student"
      }
    }
  }
}
</script>
