<template>
  <div>
    <!--Header-->
    <div class="bg-primary text-white py-5">
      <b-container v-if="course">
        <h1 class="h2">{{course.name}}</h1>
        <h2 class="h5">
          <span class="d-inline-block align-middle mr-2">{{course._id}}</span>
          <b-badge
            class="d-inline-block align-middle"
            variant="light"
          >{{course.extent}} {{course.extentUnit}}</b-badge>
        </h2>
      </b-container>
    </div>
    <!--Content-->
    <b-container class="my-4" v-if="course">
      <b-form-select v-model="selected" size="lg" class="text-dark">
        <b-form-select-option
          v-for="(instance, index) in course.instances"
          :key="instance._id"
          :value="index"
        >{{instance.dateString}}</b-form-select-option>
      </b-form-select>
      <course-instance :instance="course.instances[selected]" />
    </b-container>
  </div>
</template>

<script>
import courseInstance from "@/components/courseInstance";
export default {
  created: async function() {
    var course = await this.$api.request(
      "GET",
      "/courses/" + this.$route.params.id
    );
    course.instances.sort((a, b) => a.date < b.date);
    for (var i in course.instances)
      course.instances[i].dateString = this.toSemester(
        course.instances[i].date
      );
    this.course = course;
    var select = this.course.instances.findIndex(
      instance => instance.report.length
    );
    if (select >= 0) this.selected = select;
  },
  data: function() {
    return {
      course: null,
      selected: 0
    };
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
  },
  components: {
    courseInstance
  }
};
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
