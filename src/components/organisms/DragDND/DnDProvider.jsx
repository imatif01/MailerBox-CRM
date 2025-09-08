import React from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter, useSensor, TouchSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { MouseSensor, KeyboardSensor } from 'components/organisms/DragDND/sensors';

const DnDProvider = ({ items, onDragEnd, children }) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDragEnd = event => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(file => file.preview === active.id);
    const newIndex = items.findIndex(file => file.preview === over.id);
    const updatedFiles = arrayMove(items, oldIndex, newIndex);

    onDragEnd(updatedFiles);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={items.map(file => file.preview)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

DnDProvider.propTypes = {
  items: PropTypes.array.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DnDProvider;
