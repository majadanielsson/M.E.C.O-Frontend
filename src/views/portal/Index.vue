<template>
<b-container class="my-4">
  <b-row align-h="center">
    <b-col lg="8">
      <h1 class="mb-3 text-dark">Sök kurser</h1>

      <!-- Search Field -->
      <b-form @submit.prevent="searchButton">
        <b-input-group>
          <b-form-input v-model="q" placeholder="Sök namn eller kurskod" />
          <b-input-group-append>
            <b-button variant="primary">
              <b-icon icon="search" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>

      <!-- Search Results -->
      <router-link v-for="result in results" :key="result._id" :to="$route.path+'/courses/'+result._id">
        <b-card :title="result.name" class="my-4">
          <b-card-text>
            <b-badge variant="dark" class="float-right">{{result.extent}}{{result.extentUnit}}</b-badge>
            <span class="text-muted">{{result._id}}</span>
          </b-card-text>
        </b-card>
      </router-link>

      <!-- Load more -->
      <div class="my-4 text-center">
        <b-button variant="primary" :disabled="loadingPage" block @click="load" v-if="results.length > 0 && !complete"><span v-if="loadingPage">Laddar...</span><span v-else>Ladda fler</span></b-button>
        <span v-if="results.length == 0 && complete">Inga resultat hittades.</span>
      </div>

      <!-- Loading Placeholder -->
      <ContentLoader v-if="loading" class="my-2" height="210" width="300" style="maxWidth:400px" preserveAspectRatio="xMidYMid slice">
        <rect x="10" y="0" rx="3" ry="3" width="270" height="25" />
        <rect x="10" y="35" rx="3" ry="3" width="60" height="15" />
        <rect x="10" y="80" rx="3" ry="3" width="200" height="25" />
        <rect x="10" y="115" rx="3" ry="3" width="60" height="15" />
        <rect x="10" y="160" rx="3" ry="3" width="250" height="25" />
        <rect x="10" y="195" rx="3" ry="3" width="60" height="15" />
      </ContentLoader>

    </b-col>
  </b-row>
</b-container>
</template>

<script>
import api from "@/modules/api"

import {
  ContentLoader
} from 'vue-content-loader'

export default {
  // Perform search from query params on load
  created: function() {
    if (this.$route.query.q) {
      this.q = this.$route.query.q;
      this.search();
    }
  },

  // Perform search on history change
  watch: {
    "$route.query.q": function() {
      if (this.$route.query.q) {
        this.q = this.$route.query.q;
        this.search();
      }
      if (!this.$route.query.q) {
        this.q = "";
        this.results = [];
        this.page = 0;
        this.complete = false;
        this.loading = false;
        this.loadingPage = false;
      }
    }
  },
  data: function() {
    return {
      q: "", // Searchbar content
      page: 0, // Search request page
      complete: false, // All results are loaded
      results: [], // Search results
      loading: false, // Loading initial search
      loadingPage: false, // Loading new page
    }
  },
  methods: {
    searchButton: async function() {
      if (this.$route.query.q != this.q) {
        this.$router.push({
          query: {
            q: this.q
          }
        })
      }
    },
    // Search from searchbar
    search: async function() {
      this.loading = true;
      this.page = 0;
      this.results = [];
      this.complete = false;
      this.loadingPage = false;
      const results = await api.search(this.q);
      this.loading = false;
      this.results = results;
      this.complete = (results.length < 20) ? true : false;
      if (results.length == 1) this.$router.replace(this.$route.path + '/courses/' + results[0]._id);
    },
    // Load next page
    load: async function() {
      this.loadingPage = true;
      this.page++;
      const results = await api.search(this.q, this.page);
      this.loadingPage = false;
      if (results.length > 0) this.results.push(...results);
      if (results.length < 20) this.complete = true;
    }
  },
  components: {
    ContentLoader
  }
}
</script>

<style scoped>
.card-title {
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
}
</style>
