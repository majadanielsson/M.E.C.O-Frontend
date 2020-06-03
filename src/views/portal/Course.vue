<template>
  <div>
    <!--Header-->
    <div class="bg-primary text-white py-3 py-md-5">
      <b-container class="px-md-4 px-xl-2" fluid="xl">
        <template v-if="course">
          <h1 class="h2">{{course.name}}</h1>
          <h2 class="h5">
            <span class="d-inline-block align-middle mr-2">{{course._id}}</span>
            <b-badge
              class="d-inline-block align-middle"
              variant="light"
            >{{course.extent}} {{course.extentUnit}}</b-badge>
          </h2>
        </template>
        <ContentLoader
          primaryOpacity="0.7"
          secondaryOpacity="0.7"
          class="my-1"
          v-else
          height="55"
          width="300"
          style="maxWidth:400px"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x="0" y="0" rx="3" ry="3" width="250" height="25" />
          <rect x="0" y="35" rx="3" ry="3" width="50" height="17" />
          <rect x="60" y="35" rx="3" ry="3" width="35" height="17" />
        </ContentLoader>
      </b-container>
    </div>
    <!--Statistic graphs-->
    <b-container class="my-4 px-md-4 px-xl-2" v-if="course" fluid="xl">
      <course-statistics :course="course"/>
      <!--Drop down list of course instances-->
      <b-form-select v-model="selected" size="lg" class="text-dark border border-primary">
        <b-form-select-option
          v-for="(instance, index) in course.instances"
          :key="instance._id"
          :value="index"
        >
          {{instance.dateString}}
          {{instance.report.length == 0 ? "(Kursrapport saknas)" : "✓"}}
        </b-form-select-option>
      </b-form-select>
      <!--Instance specific statistics-->
      <b-row>
        <!--Students' general satisfaction-->
        <b-col cols="12" lg="4" order-lg="2">
          <b-row class="mt-4 flex-nowrap flex-md-wrap overflow-scroll">
            <b-col
              class="my-2 text-center"
              cols="9"
              sm="7"
              md="6"
              lg="12"
              v-if="course.instances[selected].evaluation[0]"
            >
              <column-chart 
                height="200px" 
                :data="course.instances[selected].evaluation[0].answers"
              ></column-chart>
              <h6
                class="small font-weight-bold text-dark"
              >Hur nöjda var studenterna med kursen i stort?</h6>
            </b-col>
            <!--Students' general effort-->
            <b-col
              class="my-2 text-center"
              cols="9"
              md="6"
              lg="12"
              v-if="course.instances[selected].evaluation[1]"
            >
              <column-chart 
                height="200px" 
                :data="course.instances[selected].evaluation[1].answers"
              ></column-chart>
              <h6
                class="text-dark small font-weight-bold"
              >I vilken grad ansträngde studenterna sig för att tillgodogöra sig kursinnehållet?</h6>
            </b-col>
          </b-row>
        </b-col>
        <!--Course report-->
        <b-col cols="12" lg="8" order-lg="1">
          <course-instance :instance="course.instances[selected]" :courseId="course._id" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import formatSemester from "@/modules/formatSemester";
import courseInstance from "@/components/courseInstance";
import courseStatistics from "@/components/courseStatistics";
import { ContentLoader } from "vue-content-loader";
export default {
  created: async function() {
    var course = await this.$api.request(
      "GET",
      "/courses/" + this.$route.params.id
    );
    course.instances.sort((a, b) => (a.date < b.date ? 1 : -1));
    for (var i in course.instances)
      course.instances[i].dateString = formatSemester.toSemester(
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
  },
  data: function() {
    return {
      course: null,
      instanceDates: [],
      selected: 0
    };
  },
  methods: {
    getInstanceDates: function() {
      for (var i = 0; i < this.course.instances.length; i++) {
        this.instanceDates.push(this.course.instances[i].date);
      }
    }
  },
  components: {
    courseInstance,
    courseStatistics,
    ContentLoader
  },
  metaInfo() {
    return {
      title:
        this.course && this.course.name ? this.course.name : "Laddar kurs..."
    };
  }
};
</script>