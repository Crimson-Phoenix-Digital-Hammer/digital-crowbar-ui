export default function useLocalStorage() {

    const setItem = (key, value) => {

        let a = [];
        try {
            a = JSON.parse(localStorage.getItem(key)) || [];
            a.push(value);
            localStorage.setItem(key, JSON.stringify(a));
        } catch (error) {
            console.log(error)
        }
    }
    const getItem = (key) => {
        if (!window.localStorage.getItem(key)) return
        try {
            return JSON.parse(window.localStorage.getItem(key)) || []
        } catch (error) {
            console.log(error)
        }
    }
    const removeItem = (key) => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.log(error)
        }
    }
    return { setItem, getItem, removeItem }
}