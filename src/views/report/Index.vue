<template>
<div>
  <b-container class="my-4">
    <b-row align-h="center">
      <b-col lg="8">
        <div v-for="course in courses" :key="course._id">
          <h4>{{course.name}}</h4>
          <h4 class="h5"><span class="d-inline-block align-middle mr-2">{{course._id}}</span>
            <b-badge class="d-inline-block align-middle" variant="primary">{{course.extent}} {{course.extentUnit}}</b-badge>
          </h4>
          <div>
            <b-card class="my-3" v-for="instance in course.instances" :key="instance._id">
              <b-container>
                <b-row align-v="center" align-h="center">
                  <b-col>
                   <b-link :to="'/portal/courses/'+ course._id + '?id=' + instance._id">{{toSemester(instance.date)}}</b-link>
                  </b-col>
                  <b-col v-if="Array.isArray(instance.report) && instance.report.length">
                    <b-badge variant="green">Kursrapport finns</b-badge>
                  </b-col>
                  <b-col v-else>
                    <b-badge variant="red">Kursrapport finns inte</b-badge>
                  </b-col>
                  <b-col v-if="Array.isArray(instance.report) && instance.report.length">
                    <b-badge :to="$route.path + '/report/'+ course._id+ '/' + instance._id" variant="primary">Redigera kursrapport</b-badge>
                  </b-col>
                  <b-col v-else>
                    <b-badge :to="$route.path + '/report/'+ course._id+ '/' + instance._id" variant="primary">Skriv kursrapport</b-badge>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import api from "@/modules/api"
export default {
  created: async function() {
    var courses = await api.courses.get("", {
      responsible: true
    });
    courses.sort((a, b) => a < b);
    this.courses = courses;
  },
  data: function() {
    return {
      courses: [],
    }
  },
  methods: {
    toSemester: function(date) {
      var year = date.substring(0, 4);
      var p = date.substring(5);
      //translates period to corresponding
      //period in "Teknisk-naturvetenskapliga fakulteten" for now.
      if (p < 3) return "VT " + year + ", period " + (parseInt(p) + 2);
      if (p > 3) return "HT " + year + ", period " + (p - 3);
      else return "Sommar " + year;
    }
  }
}
</script>
