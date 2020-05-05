<template>
<div>
  <b-container class="my-4">
    <b-row align-h="center">
      <b-col lg="8">
        <div v-for="course in courses" :key="course._id">
          <h3>{{course.name}}</h3>
          <h3 class="h5"><span class="d-inline-block align-middle mr-2">{{course._id}}</span>
            <b-badge class="d-inline-block align-middle" variant="primary">{{course.extent}} {{course.extentUnit}}</b-badge>
          </h3>
          <div>
            <b-link :to="$route.path + '/report/'+ course._id+ '/' + instance._id" v-for="instance in course.instances" :key="instance._id">
              <b-card class="my-3">
                {{toSemester(instance.date)}}
                <b-button>I am a Link</b-button>
              </b-card>
            </b-link>
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
