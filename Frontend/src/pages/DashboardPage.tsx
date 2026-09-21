import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../api/client';
import { useAuth } from '../auth/useAuth';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [pillars, setPillars] = useState<string[]>(['']);
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');

  const addPillar = () => setPillars((prev) => [...prev, '']);

  const updatePillar = (index: number, value: string) => {
    setPillars((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmitPillars = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await client.post('/core_pillars', {
        project: {
          name: projectName,
          core_pillars: pillars,
        },
      });
      console.log('Создано:', data);
    } catch (err) {
      console.error('Ошибка при создании проекта:', err);
    }
  };

  const handleSubmitPDF = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectId) return;

    try {
      const { data } = await client.post('/pdf_generator', {
        sticker_id: projectId,
      });
      console.log('PDF job:', data);
    } catch (err) {
      console.error('Ошибка при получении PDF:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>Привет, {user?.name}</div>
        <button onClick={handleLogout}>Выйти</button>
      </div>

      <form onSubmit={handleSubmitPillars}>
        <h1>Введите название вашего проекта:</h1>
        <input
          type="text"
          placeholder="Название проекта"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <h2>Введите core pillars</h2>
        {pillars.map((pillar, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Фича ${index + 1}`}
              value={pillar}
              onChange={(e) => updatePillar(index, e.target.value)}
            />
            <button type="button" onClick={addPillar}>+</button>
          </div>
        ))}
        <button type="submit">Создать проект</button>
      </form>

      <form onSubmit={handleSubmitPDF} style={{ marginTop: 40 }}>
        <h2>Введите id проекта, PDF которого вы хотите получить</h2>
        <input
          type="text"
          placeholder="например — 32"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}