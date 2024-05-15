import React, { useEffect } from 'react';

const ProjectCard = ({ title, todos, onChange }) => {

    const _filterTodos = (status) => {
        return todos.filter((x) => x.status === status);
    };

    useEffect(() => {
        _filterTodos("COMPLETED");
    }, [todos]);

    return (
        <div>
            <h2 className='text-2xl font-bold mb-5'>{title}</h2>
            <hr />
            <div className='flex gap-2 my-2'>
                <div>Summary:</div>
                {
                    todos &&
                    <div>{_filterTodos("COMPLETED").length}/{todos.length} todos completed</div>
                }
            </div>
            <TodoList
                title="Pending"
                status="PENDING"
                todos={todos}
                onChange={onChange}
            />
            <TodoList
                title="Completed"
                status="COMPLETED"
                todos={todos}
                onChange={onChange}
            />
        </div>
    );
};

const TodoList = ({ title, todos, status, onChange }) => {
    return (
        <div className='my-5'>
            <div className='font-bold my-3'>{title}</div>
            <ul className='flex flex-col gap-2'>
                {
                    todos.filter((x) => x.status === status).map((x) => (
                        <li key={x.id}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={status === "COMPLETED" ? true : false}
                                    onChange={(e) => onChange(x.id, e.target.value)}
                                />
                                <span>{x.description}</span>
                            </label>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProjectCard