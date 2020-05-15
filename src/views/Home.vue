<template>
  <div>
    <b-container class="my-4">
      <!-- Dev login -->
      <b-row align-h="center">
        <b-col lg="6">
          <b-form @submit.prevent="$api.dev(form)" class="py-4">
            <h1>Dev login</h1>
            <b-form-group label="name">
              <b-form-input type="text" v-model="form.name" required />
            </b-form-group>
            <b-form-group label="username">
              <b-form-input type="text" v-model="form.username" required />
            </b-form-group>
            <b-form-group label="role">
              <b-form-input type="text" v-model="form.role" required defaultValue="employee" />
            </b-form-group>
            <b-button block variant="primary" type="submit">Logga in</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home",
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
