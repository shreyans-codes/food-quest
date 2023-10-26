import React from "react";

const RecipeCard = ({
  saveButton,
  onSaveClick,
  deleteButton,
  onDeleteClick,
  item,
}) => {
  return (
    <div
      className="card bg-base-100 shadow-xl"
      style={{ width: 345, height: 350, overflow: "hidden" }}
    >
      <figure style={{ height: "140px" }}>
        <img src={item.image} alt={item.title} title={"Photo: " + item.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p
          className="truncate"
          dangerouslySetInnerHTML={{ __html: item.summary }}
        ></p>
        <div className="card-actions justify-end">
          {!!saveButton && (
            <button
              className="btn btn-outline btn-accent"
              onClick={onSaveClick}
            >
              Save
            </button>
          )}
          {!!deleteButton && (
            <button
              className="btn btn-outline btn-error"
              onClick={onDeleteClick}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
