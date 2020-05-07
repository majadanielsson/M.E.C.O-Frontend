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

  <b-container class="my-4" v-if="course">
    <div>
      <div class="graph">
        <h5 class="text-dark">Antal registrerade studenter</h5>
        <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
        <line-chart width="90%" height="70%" :data="studentsReg"></line-chart>
      </div>
      <div class="graph">
        <h5 class="text-dark">Genomsnittligt betyg</h5>
        <small class="text-dark">..</small>
        <line-chart width="90%" height="70%" :discrete="true" :min="2" :max="5" :data="avarageGrade"></line-chart>
      </div>
      <div class="graph">
        <h5 class="text-dark">Studenternas nöjdhet med kursen</h5>
        <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
        <line-chart width="90%" height="70%" :discrete="true" :min="0" :max="5" :data="avarageImpression"></line-chart>
      </div>
      <div class="graph">
        <h5 class="text-dark">Studenternas ansträngning</h5>
        <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
        <line-chart width="90%" height="70%" :discrete="true" :min="0" :max="5" :data="avarageEffort"></line-chart>
      </div>
    </div>
    <div class="py-2 course-instance" v-for="instance in course.instances" :key="instance._id">
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
import api from "@/modules/api";
import courseInstance from "@/components/courseInstance";
export default {
  created: async function() {
    var course = await api.courses.get(this.$route.params.id);
    course.instances.sort((a, b) => a.date < b.date);
    for (var i in course.instances)
      course.instances[i].dateString = this.toSemester(
        course.instances[i].date
      );
    this.course = course;
    this.avarageToArray();
    var select = this.course.instances.findIndex(
      instance => instance.report.length
    );
    if (select >= 0) this.selected = select;
  },
  data: function() {
    return {
      course: null,

      studentsReg: [['2015', 44], ['2016', 27], ['2017', 60], ['2018', 55], ['2019', 37]],
      avarageGrade: [['2015', 5], ['2016', 3], ['2017', 3], ['2018', 4], ['2019', 5]],
      avarageImpression: [],
      avarageEffort: [],
      selected: 0
    };
  },
  methods: {
    avarageToArray: function() {
      for (var i = 0; i < this.course.instances.length; i++) {
        var instance = this.course.instances[i]

        console.log(instance.report[instance.report.length - 1]);
        if(instance.report[instance.report.length - 1]) {
          var year = instance.date.substring(0, 4);

          var answerImpression = instance.report[instance.report.length - 1].questions[0].answer;
          var answerEffort = instance.report[instance.report.length - 1].questions[1].answer;

          this.avarageImpression.push([year.toString(), answerImpression]);
          this.avarageEffort.push([year.toString(), answerEffort]);

          console.log(this.avarageImpression);
          console.log(this.avarageEffort);
        }
      }
    },
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
.graph {
  margin: 25px;
  float: left;
}
</style>
