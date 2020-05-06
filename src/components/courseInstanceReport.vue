<template>
  <div class="my-4" v-if="report">
    <h3 class="text-dark">Kursrapport</h3>
    <div v-for="question in report.questions" :key="question._id">
      <h4>{{question.question}}</h4>
      <p>{{question.answer}}</p>
    </div>
    <courseInstanceReportComments :commentGroup="commentGroup" :instanceId="instanceId" />
  </div>
</template>
<script>
import courseInstanceReportComments from "./courseInstanceReportComments";
export default {
  props: ["report", "commentGroup", "instanceId"],
  components: {
    courseInstanceReportComments
  }
};
</script>