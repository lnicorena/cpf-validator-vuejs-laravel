import { shallowMount } from '@vue/test-utils';
import DocumentEditDialog from '@/components/DocumentEditDialog.vue';

describe('DocumentEditDialog.vue', () => {
    it('get item properties to fill the form', () => {
        const wrapper = shallowMount(DocumentEditDialog, {
            propsData: {
                item: {
                    document: '123.456.789.09',
                    active: true,
                    blacklist: false
                }
            }
        });

        let { document, active, blacklist } = wrapper.vm.$data;

        expect(document).toBe('');
        expect(active).toBe(null);
        expect(blacklist).toBe(null);

        wrapper.vm.loadForm();

        expect(wrapper.vm.$data.document).toBe(wrapper.vm.$props.item.document);
        expect(wrapper.vm.$data.active).toBe(wrapper.vm.$props.item.active);
        expect(wrapper.vm.$data.blacklist).toBe(
            wrapper.vm.$props.item.blacklist
        );
    });
});
