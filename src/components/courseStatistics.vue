<template>
  <div>
    <b-row class="mt-4 flex-nowrap flex-md-wrap overflow-scroll">
        <!--Number of students registered-->
        <b-col cols="9" sm="7" md="6" lg="3">
          <div class="my-3 text-center">
            <line-chart 
              width="100%" 
              height="70%" 
              :data="studentsReg"
            ></line-chart>
            <h6 class="text-dark small font-weight-bold">Antal registrerade studenter</h6>
          </div>
        </b-col>
        <!--Avarage grade-->
        <b-col cols="9" sm="7" md="6" lg="3">
          <div class="my-3 text-center">
            <line-chart
              width="100%"
              height="70%"
              :discrete="true"
              :min="2"
              :max="5"
              :data="averageGrade"
            ></line-chart>
            <h6 class="text-dark small font-weight-bold">Genomsnittligt betyg</h6>
          </div>
        </b-col>
        <!--Students' general satisfaction-->
        <b-col cols="9" sm="7" md="6" lg="3">
          <div class="my-3 text-center">
            <line-chart
              width="100%"
              height="70%"
              :discrete="true"
              :max="5"
              :data="averageImpression"
            ></line-chart>
            <h6 class="text-dark small font-weight-bold">Studenternas nöjdhet med kursen</h6>
            <div class="small text-dark">(medelvärde utifrån kursvärdering)</div>
          </div>
        </b-col>
        <!--Students' general effort-->
        <b-col cols="9" sm="7" md="6" lg="3">
          <div class="my-3 text-center">
            <line-chart 
              width="100%" 
              height="70%" 
              :discrete="true" 
              :max="5" 
              :data="averageEffort"
            ></line-chart>
            <h6 class="text-dark small font-weight-bold">Studenternas ansträngning att tillgodogöra sig kursinnehållet</h6>
            <div class="small text-dark">(medelvärde utifrån kursvärdering)</div>
          </div>
        </b-col>
      </b-row>
    </div>
</template>
<script>
import formatSemester from "@/modules/formatSemester";
export default {
  props: ["course"],
  data: function() {
    return {
      studentsReg: [],
      averageGrade: [],
      averageImpression: [],
      averageEffort: [],
    };
  },
  created: async function() {
      this.getStatistics();
  },
  methods: { 
  ...formatSemester,
    getStatistics: function() {
      for (var i = 0; i < this.course.instances.length; i++) {
        var instance = this.course.instances[i];
        var semester = this.toShortSemester(instance.date);

        if (instance.evaluation[0]) {
          this.averageImpression.unshift([
            semester,
            instance.evaluation[0].average
          ]);
        }
        if (instance.evaluation[1]) {
          this.averageEffort.unshift([semester, instance.evaluation[1].average]);
        }
        
        this.studentsReg.unshift([semester, Math.ceil(Math.random() * 100)]);
        this.averageGrade.unshift([semester, 3]);
      }
    },
  }
};
</script>