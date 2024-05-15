import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import { PROJECTS_DATA } from '../../data/projects';
import Button from '../../components/Button'
import Modal from '../../components/Modal';
import TextInput from '../../components/TextInput';

const Home = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // handle dialog modal
  const [projects, setProjects] = useState([]); // handle projects
  const [project, setProject] = useState({ // handle project
    id: "",
    title: "",
    createdDate: "10/05/2024"
  });

  // initial api call to get projects
  useEffect(() => {
    getProjects();
  }, []);

  // handle project input changes
  const handleChange = (key, value) => {
    setProject({
      ...project,
      id: projects.length + 1,
      [key]: value
    })
  };

  // get the list of projects
  const getProjects = () => {
    setProjects(PROJECTS_DATA);

    // get projects api call comes here
    // api success: set the projects
    // api fail: set the projects [] 
  };

  // handle create new project
  const onCreate = () => {
    setOpen(false);
    setProjects([...projects, project]);
    setProject({
      id: "",
      title: "",
      createdDate: "10/05/2024"
    });

    // create new project api call comes here
    // api success: show alert to indicate success
    // api fail: show alert to indicate failed
  };

  // handle edit project
  const onEdit = (id) => {
    navigate(`/project/${id}`);

    // edit project api call comes here
    // api success: show alert to indicate success
    // api fail: show alert to indicate failed
  };

  // handle delete project
  const onDelete = (id) => {
    const _projects = projects.filter((x) => x.id !== id);
    setProjects(_projects);

    // delete project api call comes here
    // api success: show alert to indicate success
    // api fail: show alert to indicate failed
  };

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold mb-5'>Projects</h2>
        <Button
          className='h-10 px-6 text-sm'
          label='Create New'
          onClick={() => setOpen(true)}
        />
      </div>
      {
        projects.length > 0
          ? <table className="table-auto w-full">
            <thead className='border'>
              <tr>
                <th>#</th>
                <th className='text-left'>Title</th>
                <th className='text-center'>Created Date</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                projects &&
                projects.map((x, index) => (
                  <tr key={x.id} className='border'>
                    <th>{index + 1}</th>
                    <td className='text-left'>{x.title}</td>
                    <td className='text-center'>{x.createdDate}</td>
                    <td className='flex items-center justify-center gap-5 pt-3'>
                      <MdEdit className='text-lg text-blue-600 cursor-pointer' onClick={() => onEdit(x.id)} />
                      <MdDeleteOutline className='text-lg text-red-500 cursor-pointer' onClick={() => onDelete(x.id)} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          : <div>No projects available</div>
      }

      {
        open &&
        <Modal
          title="Create new project"
          onClose={() => setOpen(false)}
          onSave={() => onCreate()}
        >
          <TextInput
            name="title"
            label="Title"
            value={project.title}
            onChange={(name, value) => handleChange("title", value)}
          />
        </Modal>
      }
    </div>
  );
};

export default Home;