import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import FormSection from "./FormSection";
import FormColumn from "./FormColumn";
import FormRow from "./FormRow";

function FormComponent({ form, save, setForm, questions }) {
  const isEmpty = (arr) => Object.keys(arr || {}).length === 0;

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

    if (props.type === "SECTIONS") {
      const arr = form.sections;

      // prettier-ignore
      setForm((data) => ({ ...data, struct: { sections: reorder(arr, startIndex, endIndex)}}));
    } else {
      const arr = form.sections[props.type].rows;

      // prettier-ignore
      setForm((data) => ({ ...data, struct: {
        sections: data.struct.sections.map((section, id) => {
          if (id === props.type)
            return { name: section.name, rows: reorder(arr, startIndex, endIndex)};
          else return section;
          }),
        },
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onSectionDropEnd}>
      {!isEmpty(form) && (
        <Droppable droppableId="droppable-section" type="SECTIONS">
          {(provided, snapshot) => {
            return (
              <div className="bg-white dark:bg-[#1e1e1e]" ref={provided.innerRef} {...provided.droppableProps}>
                {form.sections.map((section, sid) => (
                  <FormSection key={sid} name={section.name} sectionId={sid} addRow={setForm}>
                    {!isEmpty(section) &&
                      section.rows.map((row, rid) => (
                        <FormRow key={rid} sectionId={sid} rowId={rid} addColumn={setForm}>
                          {row.columns.map((column, cid) =>
                            //prettier-ignore
                            <FormColumn questions={questions} item={column} sectionId={sid} rowId={rid} columnId={cid} save={save} setData={setForm} key={cid} />
                          )}
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
