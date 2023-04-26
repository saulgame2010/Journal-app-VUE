import { shallowMount } from "@vue/test-utils";
import FabNewEntry from '@/modules/daybook/components/FabNewEntry'

describe('Pruebas en el Fab Component', () => {
    test('Debe mostrar el ícono por defecto', () => {
        const wrapper = shallowMount(FabNewEntry)
        const iTag = wrapper.find('i')
        expect(iTag.classes('fa-plus')).toBeTruthy()
    })

    test('Debe mostrar el ícono por argumento: fa-circle', () => {
        const wrapper = shallowMount(FabNewEntry, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')
        expect(iTag.classes('fa-circle')).toBeTruthy()
    })

    test('Debe emitir el evento on:click cuando se hace click', () => {
        const wrapper = shallowMount(FabNewEntry)
        const button = wrapper.find('button')
        button.trigger('click')
        expect(wrapper.emitted('on:click')).toHaveLength(1)
    })
})