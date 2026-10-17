import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '../../types';

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

interface Props {
  tasks: Task[];
  onMove: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export default function Board({ tasks, onMove, onDelete }: Props) {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    onMove(draggableId, destination.droppableId as TaskStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided, snapshot) => (
                <div
                  className={`column ${snapshot.isDraggingOver ? 'over' : ''}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>
                    {col.label} <span className="count">{colTasks.length}</span>
                  </h3>
                  {colTasks.map((task, index) => (
                    <Draggable draggableId={task._id} index={index} key={task._id}>
                      {(p) => (
                        <div
                          className="card"
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                        >
                          <div className="card-title">{task.title}</div>
                          <div className="card-footer">
                            <span className={`badge ${task.priority}`}>{task.priority}</span>
                            <button className="link" onClick={() => onDelete(task._id)}>
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
