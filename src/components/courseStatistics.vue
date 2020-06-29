<!--General statistics for entire course-->

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
            <h6 class="text-dark small font-weight-bold">{{this.evaluationQuestions.find(function(obj) { return obj._id === 0 }).question}}</h6>
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
            <h6 class="text-dark small font-weight-bold">{{this.evaluationQuestions.find(function(obj) { return obj._id === 1 }).question}}</h6>
            <div class="small text-dark">(medelvärde utifrån kursvärdering)</div>
          </div>
        </b-col>
      </b-row>
    </div>
</template>
<script>
import formatSemester from "@/modules/formatSemester";
import evaluationQuestions from "@/modules/evaluationQuestions";
export default {
  props: ["course"],
  data: function() {
    return {
      studentsReg: [],
      averageGrade: [],
      averageImpression: [],
      averageEffort: [],
      evaluationQuestions: []
    };
  },
  created: async function() {
    this.evaluationQuestions = Object.values(evaluationQuestions)
    this.getStatistics();
  },
  methods: { 
  ...formatSemester,

    getStatistics: function() {
      var impressionEval;
      var effortEval;
      for (var i = 0; i < this.course.instances.length; i++) {
        var instance = this.course.instances[i];
        var semester = this.toShortSemester(instance.date);

        impressionEval = instance.evaluation.find(function(obj) { return obj._id === 0 })
        if (impressionEval) {
          this.averageImpression.unshift([semester, impressionEval.average]);
        }

        effortEval = instance.evaluation.find(function(obj) { return obj._id === 1 })
        if (effortEval) {
          this.averageEffort.unshift([semester, effortEval.average]);
        }
        
        //Generates random values for number of students registered at each instance of the course.
        //FIXME when access to LADOK is granted.
        this.studentsReg.unshift([semester, Math.ceil(Math.random() * 100)]);

        //Generates static values for average grade at each instance of the course. 
        //FIXME when access to LADOK is granted.
        this.averageGrade.unshift([semester, 3]);
      }
    },
  }
};
</script>