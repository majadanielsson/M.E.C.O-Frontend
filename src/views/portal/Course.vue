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
    <b-container class="my-4" v-if="course">
    <div class="d-flex justify-content-center">
      <div class="p-2">
        <h6 class="text-dark">Antal registrerade studenter</h6>
        <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
        <line-chart width="95%" height="70%" :data="studentsReg"></line-chart>
      </div>
      <div class="p-2">
        <h6 class="text-dark">Genomsnittligt betyg</h6>
        <small class="text-dark">..</small>
        <line-chart width="95%" height="70%" :discrete="true" :min="2" :max="5" :data="avarageGrade"></line-chart>
      </div>
      <div class="p-2">
        <h6 class="text-dark">Studenternas nöjdhet med kursen</h6>
        <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
        <line-chart width="95%" height="70%" :discrete="true" :min="0" :max="5" :data="avarageImpression"></line-chart>
      </div>
      <div class="p-2">
        <h6 class="text-dark">Studenternas ansträngning</h6>
        <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
        <line-chart width="95%" height="70%" :discrete="true" :min="0" :max="5" :data="avarageEffort"></line-chart>
      </div>
    </div>
  </b-container>
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
    var select = null;
    if (this.$route.query.id) {
      select = this.course.instances.findIndex(
        instance => instance._id == this.$route.query.id
      );
      this.$router.replace({'query': null});
    }
    else {
      select = this.course.instances.findIndex(
      instance => instance.report.length
      );
    }
    if (select >= 0) this.selected = select;
    this.getInstanceDates();
    this.avarageToArray();
  },
  data: function() {
    return {
      course: null,
      instanceDates: [],
      studentsReg: [['2015', 44], ['2016', 27], ['2017', 60], ['2018', 55], ['2019', 37]],
      avarageGrade: [['2015', 5], ['2016', 3], ['2017', 3], ['2018', 4], ['2019', 5]],
      avarageImpression: [],
      avarageEffort: [],
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
    },
    avarageToArray: function() {
      for (var i = 0; i < this.course.instances.length; i++) {
        var instance = this.course.instances[i]

        if(instance.report[instance.report.length - 1]) {
          var semester  = this.toSemester(instance.date)

          var newSemesterFormat = semester.substring(0, 2) + semester.substring(5, 7);
          var answerImpression = instance.report[0].questions[1].answer;
          var answerEffort = instance.report[0].questions[2].answer;

          this.avarageImpression.push([newSemesterFormat, answerImpression]);
          this.avarageEffort.push([newSemesterFormat, answerEffort]); 
        }
      }
    },
    getInstanceDates: function() {
      for(var i = 0; i < this.course.instances.length; i++) {
        console.log(this.course.instances[i].date)
        this.instanceDates.push(this.course.instances[i].date);
      }
      console.log(this.instanceDates);
    },
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
.graph {
  margin: 10px;
  float: left;
}
</style>
