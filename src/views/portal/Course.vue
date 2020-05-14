<template>
  <div>
    <!--Header-->
    <div class="bg-primary text-white py-3 py-md-5">
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
      <b-row>
        <b-col cols="6" lg="3">
          <div class="my-3">
            <h6 class="text-dark">Antal registrerade studenter</h6>
            <small class="text-dark">..</small>
            <line-chart width="100%" height="70%" :data="studentsReg"></line-chart>
          </div>
        </b-col>
        <b-col cols="6" lg="3">
          <div class="my-3">
            <h6 class="text-dark">Genomsnittligt betyg</h6>
            <small class="text-dark">..</small>
            <line-chart
              width="95%"
              height="70%"
              :discrete="true"
              :min="2"
              :max="5"
              :data="averageGrade"
            ></line-chart>
          </div>
        </b-col>
        <b-col cols="6" lg="3">
          <div class="my-3">
            <h6 class="text-dark">Studenternas nöjdhet med kursen</h6>
            <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
            <line-chart
              width="95%"
              height="70%"
              :discrete="true"
              :max="5"
              :data="averageImpression"
            ></line-chart>
          </div>
        </b-col>
        <b-col cols="6" lg="3">
          <div class="my-3">
            <h6 class="text-dark">Studenternas ansträngning</h6>
            <small class="text-dark">(medelvärde utifrån kursvärdering)</small>
            <line-chart width="95%" height="70%" :discrete="true" :max="5" :data="averageEffort"></line-chart>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!--Content-->
    <b-container class="my-4" v-if="course">
      <b-form-select v-model="selected" size="lg" class="text-dark border border-primary">
        <b-form-select-option
          v-for="(instance, index) in course.instances"
          :key="instance._id"
          :value="index"
        >
          {{instance.dateString}}
          {{instance.report.length == 0 ? "(Kursrapport saknas)" : ""}}
        </b-form-select-option>
      </b-form-select>
      <b-row>
        <b-col cols="12" lg="8">
          <course-instance :instance="course.instances[selected]" />
        </b-col>
        <b-col cols="12" lg="4">
          <div class="d-flex flex-column py-2 py-lg-5">
            <div class="p-2" v-if="course.instances[selected].evaluation[0]">
              <h6 class="text-dark">Hur nöjda var studenterna med kursen i stort?</h6>
              <column-chart height="200px" :data="course.instances[selected].evaluation[0].answers"></column-chart>
            </div>
            <div class="p-2" v-if="course.instances[selected].evaluation[1]">
              <h6
                class="text-dark"
              >I vilken grad ansträngde studenterna sig för att tillgodogöra sig kursinnehållet?</h6>
              <column-chart height="200px" :data="course.instances[selected].evaluation[1].answers"></column-chart>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import formatSemester from "@/modules/formatSemester";
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
      this.$router.replace({ query: null });
    } else {
      select = this.course.instances.findIndex(
        instance => instance.report.length
      );
    }
    if (select >= 0) this.selected = select;
    this.getInstanceDates();
    this.averageToArray();
  },
  data: function() {
    return {
      course: null,
      instanceDates: [],
      studentsReg: [],
      averageGrade: [],
      averageImpression: [],
      averageEffort: [],
      selected: 0
    };
  },
  methods: {
    ...formatSemester,
    averageToArray: function() {
      for (var i = 0; i < this.course.instances.length; i++) {
        var instance = this.course.instances[i];
        var semester = this.toShortSemester(instance.date);

        //Takes imput from form
        /*
        if(instance.report[0]) {
          var answerImpression = instance.report[0].questions[1].answer;
          var answerEffort = instance.report[0].questions[2].answer;
        */

        //Takes input from CSV
        if (instance.evaluation[0]) {
          this.averageImpression.push([
            semester,
            instance.evaluation[0].average
          ]);
        }
        if (instance.evaluation[1]) {
          this.averageEffort.push([semester, instance.evaluation[1].average]);
        }

        //this.averageImpression.push([semester, answerImpression]);
        //this.averageEffort.push([semester, answerEffort]);
        this.studentsReg.push([semester, Math.ceil(Math.random() * 100)]);
        this.averageGrade.push([semester, 3]);
      }
    },
    getInstanceDates: function() {
      for (var i = 0; i < this.course.instances.length; i++) {
        this.instanceDates.push(this.course.instances[i].date);
      }
    }
  },
  components: {
    courseInstance
  },
  metaInfo() {
    return {
      title:
        this.course && this.course.name ? this.course.name : "Laddar kurs..."
    };
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
