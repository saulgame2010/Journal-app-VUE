
import NavBar from '../components/NavBar.vue';

<template>
    <NavBar/>
    <div class="d-flex">
        <div class="col-4">
            <EntryList/>
        </div>
        <div class="col">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
        NavBar: defineAsyncComponent(() => import('@/modules/daybook/components/NavBar.vue')),
        EntryList: defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue'))
    }
}
</script>