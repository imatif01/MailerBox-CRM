import React from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableFileItem = ({ id, item, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    border: '1px solid #ddd',
    marginBottom: '8px',
    cursor: 'grab',
    background: '#fff',
  };

  return (
    <div className="files-holder" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

SortableFileItem.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default SortableFileItem;
