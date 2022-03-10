import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import FormSection from "./FormSection";
import FormColumn from "./FormColumn";
import FormRow from "./FormRow";

function FormComponent({ form, setForm }) {
  const isEmpty = function (arr) {
    return Object.keys(arr || {}).length === 0;
  };

  return (
    <DragDropContext onDragEnd={console.log}>
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
              </div>
            );
          }}
        </Droppable>
      )}
    </DragDropContext>
  );
}

export default FormComponent;
