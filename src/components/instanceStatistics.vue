<!--Elaborate statistics for specific questions from course evaluation-->

<template>
  <div>
    <!--Students' general satisfaction-->
    <b-row class="mt-4 flex-nowrap flex-md-wrap overflow-scroll">
        <b-col
            class="my-2 text-center"
            cols="9"
            sm="7"
            md="6"
            lg="12"
            v-if="instance.evaluation.find(function(obj) { return obj._id === 0 })"
        >
            <column-chart 
            height="200px" 
            :data="instance.evaluation.find(function(obj) { return obj._id === 0 }).answers"
            ></column-chart>
            <h6
            class="small font-weight-bold text-dark"
            >{{this.evaluationQuestions.find(function(obj) { return obj._id === 0 }).question}}</h6>
        </b-col>
        <!--Students' general effort-->
        <b-col
            class="my-2 text-center"
            cols="9"
            md="6"
            lg="12"
            v-if="instance.evaluation.find(function(obj) { return obj._id === 1 })"
        >
            <column-chart 
            height="200px" 
            :data="instance.evaluation.find(function(obj) { return obj._id === 1 }).answers"
            ></column-chart>
            <h6
            class="text-dark small font-weight-bold"
            >{{this.evaluationQuestions.find(function(obj) { return obj._id === 1 }).question}}</h6>
        </b-col>
    </b-row>
  </div>
</template>
<script>
import evaluationQuestions from "@/modules/evaluationQuestions";
export default {
  props: ["instance"],
  data: function() {
    return {
      evaluationQuestions: []
    }
  },
  created: async function() {
    this.evaluationQuestions = Object.values(evaluationQuestions)
  },
};
</script>