<template>
<b-navbar type="dark" class="text-white" variant="primary" toggleable="lg">
  <b-navbar-brand :to="url">{{name}}</b-navbar-brand>
  <b-navbar-toggle target="nav-collapse" />
  <b-collapse id="nav-collapse" class="justify-content-end" is-nav>
    <user />
    <slot></slot>
  </b-collapse>
</b-navbar>
</template>

<script>
import user from "@/components/user"
export default {
  name: 'navbar',
  props: ['name', 'url', 'user'],
  components: {
    user
  }
}
</script>
