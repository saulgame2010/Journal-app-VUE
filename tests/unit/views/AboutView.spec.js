import { shallowMount } from "@vue/test-utils";
import AboutView from '@/views/AboutView'

describe('Pruebas en el About View', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(AboutView)
    })

    test('Debe renderizar el componente, hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})