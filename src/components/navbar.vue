<template>
<b-navbar type="dark" class="text-white" variant="primary" toggleable="lg">
  <b-navbar-toggle class="mr-2" target="sidebar" />
  <b-navbar-brand :to="url">{{name}}</b-navbar-brand>
  <b-collapse id="nav-collapse" class="justify-content-end" is-nav>
    <user />
    <slot></slot>
  </b-collapse>
  <b-sidebar class="d-lg-none" bg-variant="dark" text-variant="light" id="sidebar" shadow>
    <div class="px-4 py-3 large">
      <user />
      <slot></slot>
    </div>
  </b-sidebar>
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
