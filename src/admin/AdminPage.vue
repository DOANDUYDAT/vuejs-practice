<template>
  <v-app>
    <core-filter />

    <core-toolbar />

    <core-drawer />

    <core-view />
  </v-app>
</template>

<script>
import CoreFilter from '@/components/core/Filter'
import CoreToolbar from '@/components/core/Toolbar'
import CoreDrawer from '@/components/core/Drawer'
import CoreView from '@/components/core/View'
export default {
    components: {
        CoreFilter,
        CoreToolbar,
        CoreDrawer,
        CoreView
    }
}
</script>

<style lang="scss">
// @import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
