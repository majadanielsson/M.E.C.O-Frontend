<template>
<div>
  <div class="bg-primary text-white py-5">
    <b-container v-if="course">
      <h1 class="h2">{{course.name}}</h1>
      <h2 class="h5"><span class="d-inline-block align-middle mr-2">{{course._id}}</span>
        <b-badge class="d-inline-block align-middle" variant="light">{{course.extent}}{{course.extentUnit}}</b-badge>
      </h2>
    </b-container>
  </div>
  <b-container class="my-4" v-if="course">
    <h3 v-for="instance in course.instances.sort((a,b) => a.date < b.date)" :key="instance._id">
      {{toSemester(instance.date)}}
    </h3>
  </b-container>
</div>
</template>

<script>
import api from "@/modules/api"
export default {
  created: async function() {
    this.course = await api.courses.get(this.$route.params.id);
  },
  data: function() {
    return {
      course: null
    }
  },
  methods: {
    toSemester: function(date) {
      var year = date.substring(0, 4);
      var p = date.substring(5);
      if (p < 3) return "VT " + year;
      if (p > 3) return "HT " + year;
      else return "Sommar " + year;
    }
  }
}
</script>
