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
    <div class="py-2 course-instance" v-for="instance in course.instances.sort((a,b) => a.date < b.date)" :key="instance._id">
      <h2 v-b-toggle="`collapse-${instance._id}`" class="cursor-pointer text-dark">
        <b-icon class="collapse-rotate" icon="caret-down" /> {{toSemester(instance.date)}}
      </h2>
      <b-collapse :id="`collapse-${instance._id}`">
        <b-card class="mb-4" v-if="instance.report">
          <h3 class="text-dark">Kursrapport</h3>
          <div v-for="question in instance.report.questions" :key="question._id">
            <h4>{{question.question}}</h4>
            <p>{{question.answer}}</p>
          </div>
        </b-card>
      </b-collapse>
    </div>
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

<style scoped>
.course-instance .collapse-rotate {
  transition: 0.2s transform;
  transform: rotate(0deg);
}

.course-instance .collapsed .b-icon {
  transition: 0.2s transform;
  transform: rotate(-90deg);
}
</style>
