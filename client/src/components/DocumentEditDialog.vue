<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Update document details</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="document"
                                label="Document"
                                disabled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-switch
                                v-model="active"
                                label="Active"
                                color="success"
                                :value="true"
                                hide-details
                            ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-switch
                                v-model="blacklist"
                                label="Blacklist"
                                color="warning"
                                :value="true"
                                hide-details
                            ></v-switch>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['dialog', 'item'],
    data() {
        return {
            document: '',
            active: null,
            blacklist: null
        };
    },
    watch: {
        dialog: function(newVal) {
            // If the dialog is open for edit
            if (newVal) {
                console.log('edit', this.item);
                this.loadForm();
            } else {
                this.close();
            }
        }
    },
    methods: {
        loadForm() {
            this.document = this.item.document;
            this.active = this.item.active;
            this.blacklist = this.item.blacklist;
        },
        close() {
            this.document = '';
            this.active = null;
            this.blacklist = null;
            this.$emit('close');
        },
        save() {
            this.$api
                .put(`/documents/${this.item._id}`, {
                    active: !!this.active,
                    blacklist: !!this.blacklist
                })
                .then(result => {
                    console.log('document updated', result);
                    this.$emit('updated');
                })
                .catch(error => console.error('Error updating document', error))

                .finally(() => this.close());
        }
    }
};
</script>
