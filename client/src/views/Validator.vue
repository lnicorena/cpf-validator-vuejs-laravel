<template>
    <v-container fluid fill-height>
        <v-row>
            <v-layout align-center justify-center>
                <v-flex xs12 sm5 md4>
                    <document-input @documentInserted="updateList()" />
                </v-flex>
            </v-layout>
        </v-row>
        <v-row>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md10>
                    <document-list ref="docList" />
                </v-flex>
            </v-layout>
        </v-row>
    </v-container>
</template>

<script>
import DocumentList from '@/components/DocumentList.vue';
import DocumentInput from '@/components/DocumentInput.vue';

export default {
    name: 'validator',
    components: {
        DocumentList,
        DocumentInput
    },

    methods: {
        updateList() {
            this.$refs.docList.loadDocuments();
        }
    }
};
</script>
