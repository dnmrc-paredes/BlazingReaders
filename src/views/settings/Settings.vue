<template>
    <main>
        <div class="header">
            <the-header/>
        </div>

        <div class="settingsrootbox">
            <div class="sidebar">
                <the-settings-sidebar/>
            </div>

            <div class="pagecontent">
                <keep-alive>
                    <component :is="query"/>
                </keep-alive>  
            </div>
        </div>
    </main>
</template>

<script lang="ts">
// Components
import TheSettingsSidebar from '@/components/settingsSidebar/TheSettingsSidebar.vue'

// Tabs
import Personal from '@/views/settings/Personal.vue'
import Avatar from '@/views/settings/Avatar.vue'
import Password from '@/views/settings/Password.vue'
import Publisher from '@/views/settings/Publisher.vue'

import {defineComponent} from 'vue'
export default defineComponent({
    components: {
        TheSettingsSidebar
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        query() {
            if (this.$route.query.tab === 'avatar') {
                return Avatar
            }

            if (this.$route.query.tab === 'password') {
                return Password
            }

            if (this.$route.query.tab === 'publisher') {
                return Publisher
            }

            return Personal
        }
    }
})
</script>

<style scoped>

main {
    min-height: 80vh;
    position: relative;
}

/* .header {
    margin-bottom: 5rem;
} */

.settingsrootbox {
    margin: 4rem 1rem 3rem 1rem;
    display: flex;
}

.sidebar {
    flex: 1;
}

.pagecontent {
    flex: 5;
}

</style>