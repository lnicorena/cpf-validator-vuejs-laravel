<template>
    <v-card>
        <v-card-title>
            Documents
            <v-spacer></v-spacer>
            <document-edit-dialog
                :dialog="dialog"
                :item="itemEdit"
                @close="closeDialog()"
                @updated="loadDocuments()"
            />
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Filter"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="documents"
            :search="search"
            :loading="loading"
        >
            <template v-slot:item.active="{ item }">
                {{ item.active ? 'Yes' : 'No' }}
            </template>
            <template v-slot:item.blacklist="{ item }">
                {{ item.blacklist ? 'Yes' : 'No' }}
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editDocument(item)"
                    >edit</v-icon
                >
                <v-icon small @click="deleteDocument(item)">delete</v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import DocumentEditDialog from './DocumentEditDialog';

export default {
    name: 'documentlist',
    components: { DocumentEditDialog },
    data() {
        return {
            documents: [],
            loading: true,
            search: '',
            headers: [
                { text: 'Document number', value: 'document' },
                { text: 'Active', value: 'active', filterable: false },
                { text: 'Blacklist', value: 'blacklist', filterable: false },
                { text: 'Inserted', value: 'created_at' },
                { text: 'Actions', value: 'action' }
            ],
            dialog: false,
            itemEdit: null
        };
    },
    mounted() {
        this.loadDocuments();
    },

    methods: {
        loadDocuments() {
            this.loading = true;
            this.$api.get('documents').then(result => {
                this.loading = false;
                this.documents = result.data.items;
            });
        },
        editDocument(item) {
            console.log('item edited', item);
            this.dialog = true;
            this.itemEdit = item;
        },
        deleteDocument(item) {
            confirm('Are you sure you want to delete this item?') &&
                this.delete(item._id);
        },

        delete(id) {
            this.$api
                .delete(`/documents/${id}`)
                .then(result => console.log('document deleted', result))
                .catch(error => console.log('error deleting document', error));
        },

        closeDialog() {
            this.dialog = false;
        }
    }
};
</script>
