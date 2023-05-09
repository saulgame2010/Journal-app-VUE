import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: structuredClone(initialState)
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {
    // * Básicas
    test('Este es el estado inicial, debe tener este state', () => {
        const store = createVuexStore(journalState)
        const { isLoading, entries } = store.state.journal
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    // * Mutations
    test('Mutation: setEntries', () => {
        const store = createVuexStore({
            isLoading: true,
            entries: []
        })
        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    test('Mutation: updateEntry', () => {
        // * Crear el store
        const store = createVuexStore(journalState)

        // * Update entry
        const updatedEntry = {
            id: "-NTtg-KnTPnkV_6DAdo1",
            date: 1682447527605,
            picture: "https://res.cloudinary.com/dlpglxhst/image/upload/v1682451785/wydbop0e0stci2uqckva.png",
            text: "Hola mundo desde pruebas"
        }

        // * Commit de la mutación
        store.commit('journal/updateEntry', updatedEntry)

        // * Expect
        // TODO: entries.length = 2
        expect(store.state.journal.entries.length).toBe(2)
        // TODO: tiene que existir el updatedEntry toEqual
        expect(
            store.state.journal.entries.find(e => e.id === updatedEntry.id)
        ).toEqual(updatedEntry)
    })

    test('Mutation: addEntry deleteEntry', () => {
        // TODO: Crear store
        const store = createVuexStore(journalState)

        // TODO: commit addEntry {id: 'ABC-123', text: 'Hola mundo'}
        const newEntry = { id: 'ABC-123', text: 'Hola mundo' }
        store.commit('journal/addEntry', newEntry)

        // TODO: expect
        // * las entradas deben ser 3
        expect(store.state.journal.entries.length).toBe(3)
        // * la entrada con el id 'ABC-123' existe
        let existEntry = store.state.journal.entries.some(e => e.id === 'ABC-123')
        expect(existEntry).toBeTruthy()


        // TODO: commit de deleteEntry de 'ABC-123'
        store.commit('journal/deleteEntry', 'ABC-123')

        // TODO: expect
        // * Las entradas deben ser 2
        expect(store.state.journal.entries.length).toBe(2)
        // * La entrada con el id 'ABC-123' no debe existir
        existEntry = store.state.journal.entries.some(e => e.id === 'ABC-123')
        expect(existEntry).toBeFalsy()
    })

    test('getters: getEntriesByTerm getEntryById', () => {
        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        // console.log(store.getters['journal/getEntriesByTerm']('VUE'))
        expect(store.getters['journal/getEntriesByTerm']('VUE').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('VUE')).toEqual([entry1])

        expect(store.getters['journal/getEntryById']('-NTtg-KnTPnkV_6DAdo1')).toEqual(entry1)
    })

    test('Actions: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        await store.dispatch('journal/loadEntries')
        expect(store.state.journal.entries.length).toBe(2)
    })

    test('Actions: updateEntry', async () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id: "-NTtg-KnTPnkV_6DAdo1",
            date: 1682447527605,
            text: "Hola que tal",
            otroCampo: true
        }
        await store.dispatch('journal/updateEntry', updatedEntry)
        expect(store.state.journal.entries.length).toBe(2)
        expect(
            store.state.journal.entries.find(e => e.id === updatedEntry.id)
        ).toEqual({
            id: "-NTtg-KnTPnkV_6DAdo1",
            date: 1682447527605,
            text: "Hola que tal"
        })
    })
})