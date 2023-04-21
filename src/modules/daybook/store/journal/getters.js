export const getEntriesByTerm = (state) => (term = '') => {
    if(term.length === 0 ) return state.entries
    return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLowerCase()))
}

export const getEntryById = (state) => (id = '') => {
    const entry = state.entries.find(entry => entry.id === id)
    if(!entry) return
    // Se tiene que desestructurar porque sino queda como referencia la entry y si la modificamos, modificamos el state
    return {...entry}
}