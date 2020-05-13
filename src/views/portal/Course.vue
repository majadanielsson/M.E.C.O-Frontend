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
        <small class="text-dark">..</small>
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
        <line-chart width="95%" height="70%" :discrete="true" :max="5" :data="avarageImpression"></line-chart>
      </div>
      <div class="p-2">
        <h6 class="text-dark">Studenternas ansträngning</h6>
        <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
        <line-chart width="95%" height="70%" :discrete="true" :max="5" :data="avarageEffort"></line-chart>
      </div>
    </div>
  </b-container>
    <!--Content-->
    <b-container class="my-4" v-if="course">
      <b-form-select v-model="selected" size="lg" class="text-dark border border-primary">
        <b-form-select-option
          v-for="(instance, index) in course.instances"
          :key="instance._id"
          :value="index"
        >
          {{instance.dateString}}<p v-if="instance.report.length == 0" color="red">. Kursrapport saknas</p>
        </b-form-select-option>
      </b-form-select>
      <div class="d-flex justify-content-center" style="margin-top: 50px">
        <div class="p-2" v-if="course.instances[selected].evaluation[0]">
          <h6 class="text-dark">Hur nöjda var studenterna med kursen i stort?</h6>
          <column-chart height="200px" :data="course.instances[selected].evaluation[0].answers"></column-chart>
        </div>
        <div class="p-2" v-if="course.instances[selected].evaluation[1]">
          <h6 class="text-dark">I vilken grad ansträngde studenterna sig för att tillgodogöra sig kursinnehållet?</h6>
          <column-chart height="200px" :data="course.instances[selected].evaluation[0].answers"></column-chart>
        </div>
      </div>
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
      studentsReg: [],
      avarageGrade: [],
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
    toShortSemester: function(date) {
        var semester  = this.toSemester(date)
        var shortSemester = semester.substring(0, 2) + semester.substring(5, 7);
        return shortSemester;
    },
    avarageToArray: function() {
      for (var i = 0; i < this.course.instances.length; i++) {
        var instance = this.course.instances[i];
        var semester = this.toShortSemester(instance.date);

        //Takes imput from form
        
        if(instance.report[0]) {
          var answerImpression = instance.report[0].questions[1].answer;
          var answerEffort = instance.report[0].questions[2].answer;
        

        //Takes input from CSV
        /*
        if(instance.evaluation) {
          for (var j = 0; j < instance.evaluation.length; j++) {
            for (var k = 0: k < instance.evaluation.)
          }
        }
        */

          this.avarageImpression.push([semester, answerImpression]);
          this.avarageEffort.push([semester, answerEffort]); 
        }
        this.studentsReg.push([semester, Math.ceil(Math.random() * 100)]);
        this.avarageGrade.push([semester, 3]);
      }
    },
    getInstanceDates: function() {
      for(var i = 0; i < this.course.instances.length; i++) {
        this.instanceDates.push(this.course.instances[i].date);
      }
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
