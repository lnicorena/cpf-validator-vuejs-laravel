<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <router-link to="/" class="toolbar-title">
                    <span>CPF &amp; CNPJ</span>
                    <span class="font-weight-light"> validator</span>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text to="/about">
                <span class="mr-2"
                    >about<v-icon right>mdi-information-outline</v-icon></span
                >
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<style scoped>
.toolbar-title {
    color: black;
    text-decoration: none;
}
</style>

<script>
export default {
    name: 'App',
    components: {},
    data: () => ({
        //
    })
};
</script>
