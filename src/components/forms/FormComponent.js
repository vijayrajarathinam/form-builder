import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import FormSection from "./FormSection";
import FormColumn from "./FormColumn";
import FormRow from "./FormRow";

function FormComponent({ form, setForm }) {
  const isEmpty = function (arr) {
    return Object.keys(arr || {}).length === 0;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onSectionDropEnd = ({ ...props }) => {
    if (!props.destination) return;

    const startIndex = props.source.index;
    const endIndex = props.destination.index;
    const arr = form.sections;
    setForm((data) => ({
      ...data,
      struct: {
        sections: reorder(arr, startIndex, endIndex),
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onSectionDropEnd}>
      {!isEmpty(form) && (
        <Droppable droppableId="droppable-section">
          {(provided, snapshot) => {
            return (
              <div className="bg-white" ref={provided.innerRef} {...provided.droppableProps}>
                {form.sections.map((section, sid) => (
                  <FormSection key={sid} name={section.name} sectionId={sid} addRow={setForm}>
                    {!isEmpty(section) &&
                      section.rows.map((row, rid) => (
                        <FormRow key={rid} sectionId={sid} rowId={rid} addColumn={setForm}>
                          {row.columns.map((column, cid) => (
                            <FormColumn
                              item={column}
                              sectionId={sid}
                              rowId={rid}
                              columnId={cid}
                              setData={setForm}
                              key={cid}
                            />
                          ))}
                        </FormRow>
                      ))}
                  </FormSection>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      )}
    </DragDropContext>
  );
}

export default FormComponent;
