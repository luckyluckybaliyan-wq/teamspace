import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createProject, getProjects } from '../api/project.api';
import { Project } from '../types';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error);
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const project = await createProject({ name, description });
    setProjects((prev) => [project, ...prev]);
    setName('');
    setDescription('');
  };

  return (
    <div className="page">
      <h2>Your Projects</h2>
      <form className="inline-form" onSubmit={handleCreate}>
        <input placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Create</button>
      </form>
      <div className="grid">
        {projects.map((p) => (
          <Link to={`/projects/${p._id}`} className="project-card" key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.description || 'No description'}</p>
            <small>{p.members.length} member(s)</small>
          </Link>
        ))}
        {projects.length === 0 && <p>No projects yet. Create your first one above.</p>}
      </div>
    </div>
  );
}
