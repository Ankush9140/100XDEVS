import {atom,selector} from 'recoil';

export const todoList = atom({
    key : "todoList",
    default :[{
        id: 1,
        title: 'Finish coding assignment',
        desc: 'Write JavaScript code for the assignment',
        isCompleted: false,
    },
    {
        id: 2,
        title: 'Go to the gym',
        desc: 'Work out for an hour',
        isCompleted: true,
    },
    {
        id: 3,
        title: 'Buy groceries',
        desc: 'Buy fruits, vegetables, and milk',
        isCompleted: false,
    },
    {
        id: 4,
        title: 'Read a book',
        desc: 'Read the latest novel from your favorite author',
        isCompleted: false,
    },
    {
        id: 5,
        title: 'Prepare for presentation',
        desc: 'Gather information and create slides for the presentation',
        isCompleted: false,
    },
    {
        id: 6,
        title: 'Call Mom',
        desc: 'Catch up with your mom and ask how she is doing',
        isCompleted: false,
    }]
})

export const filteringState = atom({
    key : "filteringState",
    default : "Show All"
})

export const filteringSearchState = atom({
    key : "filteringSearchState",
    default : '',
})

export const filteredTodosList = selector({
    key : "filteredTodosList",
    get : ({get}) => {
        const filter = get(filteringState);
        const TodoList = get(todoList);
        const search = get(filteringSearchState);
        const list = TodoList.filter((item)=>(item.desc.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase())));
        switch(filter){
            case "Show Completed":
                return list.filter((item)=>(item.isCompleted==true))
            case "Show Incompleted":
                return list.filter((item) => (item.isCompleted==false))
            default :
                return list
        }
    }
})

export const todoListStat = selector({
    key: "todoListStat",
    get: ({ get }) => {
        const total = get(todoList).length;
        const completed = get(todoList).filter((item) => item.isCompleted).length;
        const incompleted = total - completed;
        const percentage = (total === 0) ? 0 : (completed / total) * 100;
        return {
            total,
            completed,
            incompleted,
            percentage,
        };
    },
});