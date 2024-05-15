import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import { PROJECTS_DATA } from '../../data/projects';
import { TODO_DATA } from '../../data/todo';

import ProjectCard from '../../components/ProjectCard';
import Modal from '../../components/Modal';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const ProjectDetail = () => {
    const params = useParams();

    const [open, setOpen] = useState(false); // handle dialog modal
    const [action, setAction] = useState(""); // handle modal action
    const [project, setProject] = useState({ // handle project
        id: "",
        title: "",
        createdDate: "10/05/2024"
    });
    const [todos, setTodos] = useState([]); // handle todos
    const [todo, setTodo] = useState({ // handle todo
        id: "",
        description: "",
        createdDate: "10/05/2024",
        updatedDate: "10/05/2024",
        status: "PENDING"
    });

    // initial api call to get project and todos
    useEffect(() => {
        getProject(params.id.toString());
    }, []);

    // handle todo input changes
    const handleChange = (key, value) => {
        setTodo({
            ...todo,
            id: todos.length + 1,
            [key]: value
        });
    };

    // get project detail
    const getProject = (projectId) => {
        const _project = PROJECTS_DATA.find((x) => x.id = projectId)
        setProject(_project);
        getTodos(_project.id);

        // get project api call comes here
        // api success: set the project 
        // api fail: set the project as initial object 
    };

    // get todos
    const getTodos = (projectId) => {
        const _todos = TODO_DATA.filter((x) => x.projectId === projectId);
        setTodos(_todos);

        // get todo's api call comes here
        // api success: set the todo's
        // api fail: set the todos = [] 
    };

    // handle create new todo
    const onCreate = () => {
        setOpen(false);
        setTodos([...todos, todo]);
        onReset();

        // create new todo api call comes here
        // api success: show alert to indicate success
        // api fail: show alert to indicate failed
    };

    // handle edit todo
    const onEdit = () => {
        // edit todo api call comes here
        // api success: show alert to indicate success
        // api fail: show alert to indicate failed
    };

    // handle delete todod
    const onDelete = (id) => {
        const _todos = todos.filter((x) => x.id !== id);
        setTodos(_todos);

        // delete todo api call comes here
        // api success: show alert to indicate success
        // api fail: show alert to indicate failed
    };

    // handle todo form reset
    const onReset = () => {
        setTodo({
            id: "",
            description: "",
            createdDate: "10/05/2024",
            updatedDate: "10/05/2024",
            status: "PENDING"
        });
    };

    // handle todo status change
    const handleStatusChange = (id) => {
        const _todos = todos.map((x) => {
            let status = x.status;

            if (x.id === id) {
                status = x.status === "COMPLETED" ? "PENDING" : "COMPLETED"
            }

            return {
                ...x,
                status: status
            };
        });

        setTodos(_todos);
    };

    return (
        <div className='p-10'>
            <ProjectCard
                title={project.title}
                todos={todos}
                onChange={handleStatusChange}
            />
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold mb-5'>Todos</h2>
                <Button
                    className='h-10 px-6 text-sm'
                    label='Create New'
                    onClick={() => {
                        setAction("create");
                        setOpen(true);
                    }}
                />
            </div>
            {
                todos.length > 0
                    ? <table className="table-auto w-full">
                        <thead className='border'>
                            <tr>
                                <th>#</th>
                                <th className='text-left'>Description</th>
                                <th className='text-center'>Created Date</th>
                                <th className='text-center'>Updated Date</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos &&
                                todos.map((x, index) => (
                                    <tr key={x.id} className='border'>
                                        <th>{index + 1}</th>
                                        <td className='text-left'>{x.description}</td>
                                        <td className='text-center'>{x.createdDate}</td>
                                        <td className='text-center'>{x.updatedDate}</td>
                                        <td className={`text-center text-sm font-bold ${x.status === "COMPLETED" ? "text-green-500" : "text-red-500"}`}>{x.status}</td>
                                        <td className='flex items-center justify-center gap-5 pt-3'>
                                            <MdEdit
                                                className='text-lg text-blue-600 cursor-pointer'
                                                onClick={() => {
                                                    setTodo(x);
                                                    setAction("edit");
                                                    setOpen(true);
                                                }}
                                            />
                                            <MdDeleteOutline className='text-lg text-red-500 cursor-pointer' onClick={() => onDelete(x.id)} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    : <div>No todos available</div>
            }
            {
                open &&
                <Modal
                    title={action === "create" ? "Create new todo" : "Edit todo"}
                    onSave={() => action === "create" ? onCreate() : onEdit()}
                    onClose={() => {
                        setOpen(false);
                        onReset();
                    }}
                >
                    <TextInput
                        name="description"
                        label="Description"
                        value={todo.description}
                        onChange={(name, value) => handleChange("description", value)}
                    />
                </Modal>
            }
        </div>
    );
};

export default ProjectDetail;