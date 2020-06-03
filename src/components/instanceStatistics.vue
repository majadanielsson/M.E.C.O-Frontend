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
            v-if="instance.evaluation[0]"
        >
            <column-chart 
            height="200px" 
            :data="instance.evaluation[0].answers"
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
            v-if="instance.evaluation[1]"
        >
            <column-chart 
            height="200px" 
            :data="instance.evaluation[1].answers"
            ></column-chart>
            <h6
            class="text-dark small font-weight-bold"
            >I vilken grad ansträngde studenterna sig för att tillgodogöra sig kursinnehållet?</h6>
        </b-col>
        </b-row>
  </div>
</template>
<script>
export default {
  props: ["instance"],
};
</script>