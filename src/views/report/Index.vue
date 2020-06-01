<template>
  <div>
    <b-container class="my-4">
      <b-row align-h="center">
        <b-col lg="8">
          <h1 class="text-dark">Mina kurser</h1>
          <p v-if="!loading && !courses.length">Du har inga kurser</p>
          <div class="my-4">
            <div v-for="course in courses" :key="course._id">
              <h2 class="h4">{{ course.name }}</h2>
              <h3 class="h5">
                <span class="d-inline-block align-middle mr-2">
                  {{
                  course._id
                  }}
                </span>
                <b-badge
                  class="d-inline-block align-middle"
                  variant="primary"
                >{{ course.extent }} {{ course.extentUnit }}</b-badge>
              </h3>
              <div>
                <b-card class="my-3" v-for="instance in course.instances" :key="instance._id">
                  <b-container>
                    <b-row align-v="center" align-h="center">
                      <b-col>
                        <b-link
                          :to="
                          '/portal/courses/' +
                            course._id +
                            '?id=' +
                            instance._id
                        "
                        >{{ toSemester(instance.date) }}</b-link>
                      </b-col>
                      <b-col
                        v-if="
                        Array.isArray(instance.report) && instance.report.length
                      "
                      >
                        <b-badge variant="success">Kursrapport finns</b-badge>
                      </b-col>
                      <b-col v-else>
                        <b-badge variant="danger">Kursrapport finns inte</b-badge>
                      </b-col>
                      <b-col
                        v-if="
                        Array.isArray(instance.report) && instance.report.length
                      "
                      >
                        <b-button
                          size="sm"
                          :to="
                          $route.path +
                            '/report/' +
                            course._id +
                            '/' +
                            instance._id
                        "
                          variant="outline-primary"
                        >Redigera kursrapport</b-button>
                      </b-col>
                      <b-col v-else>
                        <b-button
                          size="sm"
                          :to="
                          $route.path +
                            '/report/' +
                            course._id +
                            '/' +
                            instance._id
                        "
                          variant="primary"
                        >Skriv kursrapport</b-button>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-card>
              </div>
            </div>
          </div>
          <ContentLoader
            v-if="loading"
            class="my-3"
            height="300"
            width="550"
            style="maxWidth:1000px"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect x="0" y="0" rx="3" ry="3" width="270" height="25" />
            <rect x="0" y="35" rx="7" ry="7" width="550" height="60" />
            <rect x="0" y="120" rx="3" ry="3" width="200" height="25" />
            <rect x="0" y="155" rx="7" ry="7" width="550" height="60" />
          </ContentLoader>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import formatSemester from "@/modules/formatSemester";
import { ContentLoader } from "vue-content-loader";
export default {
  created: async function() {
    try {
      var courses = await this.$api.request("GET", "/courses", null, {
        responsible: true
      });
      courses.sort((a, b) => (a < b ? 1 : -1));
      for (var i in courses) {
        courses[i].instances.sort((a, b) => (a < b ? 1 : -1));
      }
      this.courses = courses;
      this.loading = false;
    } catch (err) {
      this.loading = false;
      switch (err.status) {
        default:
          this.$swal({
            title: "Något gick fel",
            icon: "error",
            showConfirmButton: false,
            timer: 1400
          });
          break;
      }
    }
  },
  data: function() {
    return {
      loading: true,
      courses: []
    };
  },
  methods: {
    ...formatSemester
  },
  metaInfo: {
    title: "Mina kurser"
  },
  components: {
    ContentLoader
  }
};
</script>
