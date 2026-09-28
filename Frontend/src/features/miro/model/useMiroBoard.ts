import { useMiro } from '@mirohq/websdk-react-hooks';

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

export function useMiroBoard() {
  const miro = useMiro();

  const addProject = async (projectName: string, pillars: string[]) => {
    const position = await miro.board.findEmptySpace({
      width: 900,
      height: 500,
      x: 0,
      y: 0,
      offset: 120,
    });
    const frame = await miro.board.createFrame({
      title: projectName,
      x: position.x,
      y: position.y,
      width: position.width,
      height: position.height,
      style: { fillColor: '#f6f8fa' },
    });

    const notes = await Promise.all(
      pillars.map((pillar, index) => miro.board.createStickyNote({
        content: `<p>${escapeHtml(pillar)}</p>`,
        x: position.x - 260 + (index % 3) * 260,
        y: position.y + 80 + Math.floor(index / 3) * 220,
        width: 200,
        parentId: frame.id,
        style: { fillColor: 'light_yellow' },
      })),
    );

    await miro.board.viewport.zoomTo(frame);
    return { frame, notes };
  };

  return { addProject };
}
