<template>
  <div class="py-2 course-instance">
    <course-instance-report
      v-if="instance.report"
      :report="instance.report[0]"
      :instanceId="instance._id"
      :commentGroup="instance.report.map(report => ({comments: report.comments, date: report.date}))"
    />
  </div>
</template>
<script>
import courseInstanceReport from "./courseInstanceReport";
export default {
  props: ["instance"],
  components: {
    courseInstanceReport
  }
};
</script>