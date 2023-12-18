/* eslint-disable no-undef */
function todoList() {
    all = [];
    const add = (todoItem) => {
        all.push(todoItem);
    };
    const markAsComplete = (index) => {
        all[index].completed = true;
    };

    const overdue = () => {
        const today = new Date().toISOString().split("T")[0];
        return all.filter((i) => !i.completed && (i.dueDate) < today
        );
    };

    const dueToday = () => {
        const today = new Date().toISOString().split('T')[0];
        return all.filter((i) => i.dueDate === today);
    };

    const dueLater = () => {
        const today = new Date().toISOString().split("T")[0];
        return all.filter((i) => !i.completed && i.dueDate > today);
    };

    const toDisplayableList = (list) => {
        let result = '';
        list.forEach((i) => {
            const formattedDueDate = i.dueDate === new Date().toISOString().split('T')[0] ? '' : `${i.dueDate}`;
            const checkbox = i.completed ? '[x]' : '[ ]';
            result += `${checkbox} ${i.title} ${formattedDueDate}\n`;
        });
        return result.trimEnd();
    };
    return {
        all,
        add,
        markAsComplete,
        overdue,
        dueToday,
        dueLater,
        toDisplayableList
    };
}
module.exports = todoList;